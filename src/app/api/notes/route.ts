import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import {
    MAX_DOODLE_PATH_LEN,
    MAX_DOODLE_STROKES,
    MAX_MESSAGE_LEN,
    MAX_NAME_LEN,
    NOTE_COLORS,
    type NoteColor,
} from "@/content/notes";
import { getOwnerUser } from "@/lib/supabase/owner";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_HOURS = 6;

function extractIp(req: Request): string {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) {
        const first = xff.split(",")[0];
        if (first) return first.trim();
    }
    const real = req.headers.get("x-real-ip");
    if (real) return real.trim();
    return "unknown";
}

function hashIp(ip: string): string {
    const salt = process.env.NOTES_IP_SALT ?? "";
    return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function notifyDiscord(note: {
    sender_name: string;
    message: string;
    color: string;
    id: string;
    hasDoodle: boolean;
}) {
    const url = process.env.DISCORD_NOTES_WEBHOOK_URL;
    if (!url) return;

    const trimmed =
        note.message.length > 900
            ? `${note.message.slice(0, 900)}…`
            : note.message;

    const fields: { name: string; value: string; inline: boolean }[] = [
        { name: "From", value: note.sender_name, inline: true },
        { name: "Paper", value: note.color, inline: true },
    ];
    if (note.hasDoodle) {
        fields.push({ name: "Doodle", value: "attached ✎", inline: true });
    }
    fields.push({ name: "Id", value: `\`${note.id}\``, inline: false });

    const payload = {
        embeds: [
            {
                title: "New letter · pending review",
                description: trimmed,
                color: 0xd8b58c,
                fields,
                timestamp: new Date().toISOString(),
            },
        ],
    };

    try {
        await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
            // don't block the response on Discord latency
            signal: AbortSignal.timeout(4000),
        });
    } catch {
        // best-effort; swallow failures so the user still gets a success reply
    }
}

type Payload = {
    sender_name?: unknown;
    message?: unknown;
    color?: unknown;
    doodle?: unknown;
};

// Only SVG path grammar characters, digits, whitespace, dot, minus, comma.
// Blocks angle brackets / entities / anything scripty.
const SAFE_PATH = /^[MmLlHhVvCcSsQqTtAaZz0-9\s.,-]+$/;

function sanitizeDoodle(raw: unknown): string[] | null {
    if (raw === null || raw === undefined) return null;
    if (!Array.isArray(raw)) return null;
    const cleaned: string[] = [];
    for (const item of raw) {
        if (typeof item !== "string") continue;
        const s = item.trim();
        if (s.length === 0 || s.length > MAX_DOODLE_PATH_LEN) continue;
        if (!SAFE_PATH.test(s)) continue;
        cleaned.push(s);
        if (cleaned.length >= MAX_DOODLE_STROKES) break;
    }
    return cleaned.length > 0 ? cleaned : null;
}

export async function POST(req: Request) {
    let body: Payload;
    try {
        body = (await req.json()) as Payload;
    } catch {
        return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    const senderRaw =
        typeof body.sender_name === "string" ? body.sender_name : "";
    const messageRaw = typeof body.message === "string" ? body.message : "";
    const colorRaw = typeof body.color === "string" ? body.color : "cream";

    const sender_name = senderRaw.trim();
    const message = messageRaw.trim();
    const color = NOTE_COLORS.includes(colorRaw as NoteColor)
        ? (colorRaw as NoteColor)
        : "cream";
    const doodle = sanitizeDoodle(body.doodle);

    if (!sender_name) return bad("Add your name.");
    if (!message) return bad("Add a message.");
    if (sender_name.length > MAX_NAME_LEN)
        return bad(`Name too long (max ${MAX_NAME_LEN}).`);
    if (message.length > MAX_MESSAGE_LEN)
        return bad(`Message too long (max ${MAX_MESSAGE_LEN}).`);

    const ipHash = hashIp(extractIp(req));

    let supabase: ReturnType<typeof createServiceClient>;
    try {
        supabase = createServiceClient();
    } catch (err) {
        const detail =
            err instanceof Error ? err.message : "server misconfigured";
        return NextResponse.json({ error: detail }, { status: 500 });
    }

    // The service client below bypasses RLS, so verify the caller separately
    // with the cookie-backed server client before granting a rate-limit bypass.
    let isAdmin = false;
    try {
        const owner = await getOwnerUser(await createServerClient());
        isAdmin = owner !== null;
    } catch {
        // If the session can't be verified, retain the normal public limit.
    }

    // Rate limit: one letter per IP per 6 hours.
    if (!isAdmin) {
        const since = new Date(
            Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000,
        ).toISOString();

        const { data: recent, error: recentErr } = await supabase
            .from("notes")
            .select("id, created_at")
            .eq("ip_hash", ipHash)
            .gte("created_at", since)
            .order("created_at", { ascending: false })
            .limit(1);

        if (recentErr) {
            return NextResponse.json(
                { error: "Couldn't check rate limit." },
                { status: 500 },
            );
        }

        const last = recent?.[0];
        if (last) {
            const lastAt = new Date(last.created_at).getTime();
            const nextAt = lastAt + RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000;
            const retryAfterSec = Math.max(
                1,
                Math.ceil((nextAt - Date.now()) / 1000),
            );
            return NextResponse.json(
                {
                    error: "You've already sent one recently. Thank you. Try again in a bit.",
                    retry_after_seconds: retryAfterSec,
                },
                {
                    status: 429,
                    headers: { "retry-after": String(retryAfterSec) },
                },
            );
        }
    }

    const { data, error } = await supabase
        .from("notes")
        .insert({
            sender_name,
            message,
            color,
            status: "pending",
            ip_hash: ipHash,
            doodle,
        })
        .select(
            "id, sender_name, message, color, status, created_at, approved_at, doodle",
        )
        .single();

    if (error || !data) {
        return NextResponse.json(
            { error: error?.message ?? "Couldn't save your note." },
            { status: 500 },
        );
    }

    // Fire-and-forget Discord notification.
    notifyDiscord({
        sender_name: data.sender_name,
        message: data.message,
        color: data.color,
        id: data.id,
        hasDoodle: Array.isArray(data.doodle) && data.doodle.length > 0,
    });

    return NextResponse.json({ note: data }, { status: 201 });
}

function bad(msg: string) {
    return NextResponse.json({ error: msg }, { status: 400 });
}
