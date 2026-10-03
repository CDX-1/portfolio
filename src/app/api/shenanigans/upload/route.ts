import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ffmpegStatic from "ffmpeg-static";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { isOwner } from "@/lib/supabase/owner";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const BUCKET = "shenanigans";
const MAX_BYTES = 50 * 1024 * 1024;

const ALLOWED_IMAGE = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
]);
const ALLOWED_VIDEO = new Set(["video/mp4", "video/quicktime", "video/webm"]);
const ALLOWED_ASPECT = new Set(["video", "square", "portrait", "wide", "tall"]);
const ALLOWED_SPAN = new Set(["half", "full"]);

function slugify(input: string): string {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 60);
}

function extForMime(mime: string): string {
    switch (mime) {
        case "image/jpeg":
            return "jpg";
        case "image/png":
            return "png";
        case "image/webp":
            return "webp";
        case "image/avif":
            return "avif";
        case "image/gif":
            return "gif";
        case "video/mp4":
            return "mp4";
        case "video/quicktime":
            return "mov";
        case "video/webm":
            return "webm";
        default:
            return "bin";
    }
}

// Sharp does not copy metadata unless withMetadata() is called, so a plain
// rotate().toBuffer() produces a re-encoded file with no EXIF/XMP/ICC beyond
// what sharp needs.
async function sanitizeStillImage(
    input: Buffer,
    mime: string,
): Promise<Buffer> {
    let pipeline = sharp(input, { failOn: "error" }).rotate();
    switch (mime) {
        case "image/jpeg":
            pipeline = pipeline.jpeg({ quality: 92, mozjpeg: true });
            break;
        case "image/png":
            pipeline = pipeline.png({ compressionLevel: 9 });
            break;
        case "image/webp":
            pipeline = pipeline.webp({ quality: 92 });
            break;
        case "image/avif":
            pipeline = pipeline.avif({ quality: 60 });
            break;
    }
    return pipeline.toBuffer();
}

async function runFfmpeg(args: string[]): Promise<void> {
    if (!ffmpegStatic) {
        throw new Error("ffmpeg binary missing");
    }
    await new Promise<void>((resolve, reject) => {
        const proc = spawn(ffmpegStatic as string, args, { stdio: "ignore" });
        proc.on("error", reject);
        proc.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`ffmpeg exited with code ${code}`));
        });
    });
}

async function sanitizeWithFfmpeg(
    input: Buffer,
    mime: string,
): Promise<Buffer> {
    const dir = await mkdtemp(join(tmpdir(), "shen-"));
    const ext = extForMime(mime);
    const inPath = join(dir, `in.${ext}`);
    const outPath = join(dir, `out.${ext}`);

    try {
        await writeFile(inPath, input);

        if (mime === "image/gif") {
            // Re-mux gif; strip all metadata.
            await runFfmpeg([
                "-y",
                "-i",
                inPath,
                "-map_metadata",
                "-1",
                "-fflags",
                "+bitexact",
                outPath,
            ]);
        } else {
            // Container-level strip; no re-encode, so no quality loss.
            const args = [
                "-y",
                "-i",
                inPath,
                "-map_metadata",
                "-1",
                "-map_chapters",
                "-1",
                "-c",
                "copy",
            ];
            if (mime === "video/mp4" || mime === "video/quicktime") {
                args.push("-movflags", "+faststart");
            }
            args.push(outPath);
            await runFfmpeg(args);
        }

        return await readFile(outPath);
    } finally {
        await rm(dir, { recursive: true, force: true }).catch(() => {});
    }
}

async function sanitize(file: File): Promise<{
    buffer: Buffer;
    contentType: string;
    ext: string;
}> {
    const bytes = Buffer.from(await file.arrayBuffer());
    const mime = (file.type || "").toLowerCase();

    if (!ALLOWED_IMAGE.has(mime) && !ALLOWED_VIDEO.has(mime)) {
        throw new Error(`Unsupported file type: ${mime || "unknown"}`);
    }

    if (mime === "image/gif" || ALLOWED_VIDEO.has(mime)) {
        const cleaned = await sanitizeWithFfmpeg(bytes, mime);
        return { buffer: cleaned, contentType: mime, ext: extForMime(mime) };
    }

    const cleaned = await sanitizeStillImage(bytes, mime);
    return { buffer: cleaned, contentType: mime, ext: extForMime(mime) };
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!isOwner(user)) {
        return NextResponse.json({ error: "Not authorized" }, { status: 404 });
    }

    let form: FormData;
    try {
        form = await request.formData();
    } catch {
        return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 50MB)" },
            { status: 413 },
        );
    }

    const title = String(form.get("title") ?? "").trim();
    const caption = String(form.get("caption") ?? "").trim();
    const entryDate = String(form.get("entry_date") ?? "").trim();
    const aspect = String(form.get("aspect") ?? "").trim();
    const span = String(form.get("span") ?? "half").trim();

    if (!title) {
        return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) {
        return NextResponse.json({ error: "Bad date" }, { status: 400 });
    }
    if (aspect && !ALLOWED_ASPECT.has(aspect)) {
        return NextResponse.json({ error: "Bad aspect" }, { status: 400 });
    }
    if (!ALLOWED_SPAN.has(span)) {
        return NextResponse.json({ error: "Bad span" }, { status: 400 });
    }

    // Derive kind from the actual file, ignore any user-picked label.
    const fileMime = (file.type || "").toLowerCase();
    const kind: "image" | "gif" | "video" = ALLOWED_VIDEO.has(fileMime)
        ? "video"
        : fileMime === "image/gif"
          ? "gif"
          : "image";

    let cleaned: Awaited<ReturnType<typeof sanitize>>;
    try {
        cleaned = await sanitize(file);
    } catch (err) {
        const msg = err instanceof Error ? err.message : "Sanitize failed";
        return NextResponse.json({ error: msg }, { status: 400 });
    }

    const baseSlug = slugify(title) || "entry";
    const objectPath = `${entryDate}/${Date.now()}-${baseSlug}.${cleaned.ext}`;

    const uploadRes = await supabase.storage
        .from(BUCKET)
        .upload(objectPath, cleaned.buffer, {
            cacheControl: "31536000",
            upsert: false,
            contentType: cleaned.contentType,
        });

    if (uploadRes.error) {
        return NextResponse.json(
            { error: uploadRes.error.message },
            { status: 500 },
        );
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);

    const uniqueSlug = `${baseSlug}-${randomUUID().slice(0, 6)}`;

    const insertRes = await supabase
        .from("shenanigans")
        .insert({
            slug: uniqueSlug,
            entry_date: entryDate,
            title,
            caption: caption || null,
            media_kind: kind,
            media_src: publicUrl,
            media_alt: title,
            media_aspect: aspect || null,
            span,
        })
        .select()
        .single();

    if (insertRes.error) {
        // Best-effort cleanup of the storage object we just wrote.
        await supabase.storage
            .from(BUCKET)
            .remove([objectPath])
            .catch(() => {});
        return NextResponse.json(
            { error: insertRes.error.message },
            { status: 500 },
        );
    }

    return NextResponse.json({ ok: true, entry: insertRes.data });
}
