"use client";

import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {
    MAX_MESSAGE_LEN,
    MAX_NAME_LEN,
    NOTE_COLORS,
    NOTE_PALETTE,
    type Note,
    type NoteColor,
} from "@/content/notes";
import { cn } from "@/lib/utils";
import DoodleCanvas from "./doodle-canvas";
import NoteCard from "./note-card";
import Sheet from "./sheet";

type NoteRowResponse = {
    id: string;
    sender_name: string;
    message: string;
    color: NoteColor;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    approved_at: string | null;
    doodle: string[] | null;
};

export default function ComposeForm({
    open,
    onClose,
    onSubmitted,
}: {
    open: boolean;
    onClose: () => void;
    onSubmitted: (note: Note) => void;
}) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sender, setSender] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState<NoteColor>("cream");
    const [doodle, setDoodle] = useState<string[]>([]);
    const [showDoodle, setShowDoodle] = useState(false);

    function reset() {
        setSender("");
        setMessage("");
        setColor("cream");
        setDoodle([]);
        setShowDoodle(false);
        setError(null);
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const trimmedSender = sender.trim();
        const trimmedMessage = message.trim();
        if (!trimmedSender) return setError("Add your name.");
        if (!trimmedMessage) return setError("Add a message.");
        if (trimmedSender.length > MAX_NAME_LEN)
            return setError(`Name too long (max ${MAX_NAME_LEN}).`);
        if (trimmedMessage.length > MAX_MESSAGE_LEN)
            return setError(`Message too long (max ${MAX_MESSAGE_LEN}).`);

        setPending(true);

        let res: Response;
        try {
            res = await fetch("/api/notes", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    sender_name: trimmedSender,
                    message: trimmedMessage,
                    color,
                    doodle: doodle.length > 0 ? doodle : null,
                }),
            });
        } catch {
            setPending(false);
            setError("Network hiccup. Please try again.");
            return;
        }

        const payload = (await res.json().catch(() => null)) as {
            note?: NoteRowResponse;
            error?: string;
            retry_after_seconds?: number;
        } | null;

        setPending(false);

        if (res.status === 429) {
            setError(
                payload?.error ??
                    "You've already sent one recently. Thank you.",
            );
            return;
        }
        if (!res.ok || !payload?.note) {
            setError(payload?.error ?? "Couldn't send just yet. Try again.");
            return;
        }

        const row = payload.note;
        onSubmitted({
            id: row.id,
            sender: row.sender_name,
            message: row.message,
            color: row.color,
            status: row.status,
            createdAt: row.created_at,
            approvedAt: row.approved_at ?? undefined,
            doodle:
                row.doodle && row.doodle.length > 0 ? row.doodle : undefined,
        });
        reset();
        onClose();
    }

    const palette = NOTE_PALETTE[color];

    return (
        <Sheet
            open={open}
            onClose={onClose}
            dismissible={!pending}
            label="Write a letter"
            className="sm:max-w-3xl"
        >
            <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4 border-b border-border/50 px-5 pt-7 pb-4 sm:px-7 sm:pt-6">
                    <div>
                        <h2 className="font-bespoke text-2xl tracking-tight text-foreground">
                            Write a letter
                        </h2>
                        <p className="mt-1 text-sm text-foreground/55">
                            A hello, a question, whatever's on your mind.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => !pending && onClose()}
                        aria-label="Close"
                        className="-mr-2 -mt-1 shrink-0 rounded-full p-2 text-foreground/50 hover:bg-muted hover:text-foreground"
                    >
                        <IconX className="size-4" />
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    <div className="flex w-full flex-col gap-5 px-5 py-5 sm:px-7 md:w-[55%]">
                        <label className="flex flex-col gap-1.5">
                            <span className={labelClass}>Name</span>
                            <input
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                maxLength={MAX_NAME_LEN}
                                required
                                autoComplete="given-name"
                                placeholder="How should I know you?"
                                className={inputClass}
                            />
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="flex items-baseline justify-between">
                                <span className={labelClass}>Message</span>
                                <span className="font-mono text-[10px] tabular-nums text-foreground/40">
                                    {message.length}/{MAX_MESSAGE_LEN}
                                </span>
                            </span>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={MAX_MESSAGE_LEN}
                                required
                                rows={5}
                                placeholder="Hey Awsaf,"
                                className={cn(inputClass, "resize-none")}
                            />
                        </label>

                        <fieldset className="flex flex-col gap-2">
                            <legend className={cn(labelClass, "mb-2")}>
                                Paper
                            </legend>
                            <div className="flex items-center gap-2.5">
                                {NOTE_COLORS.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setColor(c)}
                                        aria-label={`${c} paper`}
                                        aria-pressed={color === c}
                                        className={cn(
                                            "size-9 rounded-full ring-1 ring-inset ring-black/10 transition",
                                            NOTE_PALETTE[c].paper,
                                            color === c
                                                ? "outline-2 outline-offset-2 outline-foreground/70"
                                                : "hover:scale-105",
                                        )}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {showDoodle ? (
                            <div className="flex flex-col gap-1.5">
                                <span className={labelClass}>Doodle</span>
                                <DoodleCanvas
                                    strokes={doodle}
                                    onChange={setDoodle}
                                    ink={palette.ink}
                                />
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowDoodle(true)}
                                className="inline-flex items-center gap-1.5 self-start rounded-full py-1 text-sm text-foreground/60 hover:text-foreground"
                            >
                                <IconPlus className="size-4" />
                                Add a doodle
                            </button>
                        )}
                    </div>

                    {/* live preview, desktop only */}
                    <div className="hidden w-[45%] flex-col gap-3 border-l border-border/50 bg-muted/40 p-7 md:flex">
                        <span className={labelClass}>Preview</span>
                        <NoteCard
                            note={{
                                sender: sender.trim() || "Your name",
                                message: message || "Your message",
                                color,
                                createdAt: new Date().toISOString(),
                                doodle,
                            }}
                            placeholder={{
                                message: !message,
                                sender: !sender.trim(),
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-border/50 px-5 py-3 sm:px-7">
                    {error ? (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    ) : (
                        <p className="text-xs leading-snug text-foreground/50">
                            Only you'll see it until I've read it.
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={pending}
                        className={cn(
                            "shrink-0 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium tracking-tight text-background",
                            "transition-opacity hover:opacity-90 disabled:opacity-40",
                        )}
                    >
                        {pending ? "Sending…" : "Send"}
                    </button>
                </div>
            </form>
        </Sheet>
    );
}

// 16px on phones so iOS Safari doesn't zoom into the field on focus
const inputClass = cn(
    "w-full rounded-xl border border-border bg-background px-3.5 py-2.5",
    "text-base text-foreground placeholder:text-foreground/35 sm:text-sm",
    "focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10",
);

const labelClass = "text-[13px] font-medium text-foreground/70";
