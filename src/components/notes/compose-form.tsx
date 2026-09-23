"use client";

import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
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
import DoodleRender from "./doodle-render";
import { CurlyArrow, Heart, Sparkle } from "./doodles";

const PLACEHOLDER_MESSAGE =
    "psst, anything goes.\n\nyour words show up here as you type.";

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

function todayLongDate(): string {
    return new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

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

    function reset() {
        setSender("");
        setMessage("");
        setColor("cream");
        setDoodle([]);
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
    const displayMessage = message || PLACEHOLDER_MESSAGE;
    const displaySender = sender.trim() || "Your name";
    const isPlaceholderMessage = !message;
    const isPlaceholderSender = !sender.trim();

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-md px-4 py-8"
                    onClick={() => !pending && onClose()}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={cn(
                            "relative w-full max-w-3xl overflow-hidden rounded-[24px] border border-border/50",
                            "bg-gradient-to-br from-[#f6ecd7]/50 via-background to-[#e6eef7]/45",
                            "dark:from-[#3a2f1c]/20 dark:via-background dark:to-[#1e2a3a]/20",
                            "shadow-[0_18px_50px_-24px_rgba(0,0,0,0.3)]",
                            "flex max-h-[90vh] flex-col md:flex-row",
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => !pending && onClose()}
                            aria-label="Close"
                            className={cn(
                                "absolute top-4 right-4 z-10 rounded-full p-1.5",
                                "text-foreground/50 hover:text-foreground hover:bg-muted/40",
                            )}
                        >
                            <IconX className="size-4" />
                        </button>

                        {/* form pane */}
                        <form
                            onSubmit={onSubmit}
                            className={cn(
                                "flex w-full flex-col gap-5 overflow-y-auto",
                                "p-6 md:p-7 md:w-[55%]",
                            )}
                        >
                            <div>
                                <span
                                    className="font-caveat text-base text-foreground/50"
                                    style={{
                                        display: "inline-block",
                                        rotate: "-2deg",
                                    }}
                                >
                                    hey,
                                </span>
                                <h2 className="mt-0.5 font-bespoke text-2xl tracking-tight text-foreground">
                                    write me a letter
                                </h2>
                                <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                                    A hi, a question, a random thought.
                                    Whatever's on your mind.
                                </p>
                            </div>

                            <label className="flex flex-col gap-1.5">
                                <span className={labelClass}>Your name</span>
                                <input
                                    value={sender}
                                    onChange={(e) => setSender(e.target.value)}
                                    maxLength={MAX_NAME_LEN}
                                    required
                                    placeholder="or however you'd like to be known"
                                    className={inputClass}
                                />
                            </label>

                            <label className="flex flex-col gap-1.5">
                                <div className="flex items-baseline justify-between">
                                    <span className={labelClass}>
                                        Your note
                                    </span>
                                    <span className="font-mono text-[9px] tabular-nums text-foreground/40">
                                        {message.length}/{MAX_MESSAGE_LEN}
                                    </span>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={MAX_MESSAGE_LEN}
                                    required
                                    rows={6}
                                    placeholder="Dear Awsaf,"
                                    className={cn(inputClass, "resize-none")}
                                />
                            </label>

                            <div className="flex flex-col gap-1.5">
                                <span className={labelClass}>
                                    Pick your paper
                                </span>
                                <div className="flex flex-wrap items-center gap-2">
                                    {NOTE_COLORS.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setColor(c)}
                                            aria-label={`paper color ${c}`}
                                            className={cn(
                                                "relative h-8 w-8 rounded-md border border-black/10",
                                                NOTE_PALETTE[c].paper,
                                                "transition-transform",
                                                color === c
                                                    ? "ring-2 ring-foreground scale-105"
                                                    : "hover:scale-105",
                                            )}
                                        />
                                    ))}
                                    <span
                                        className="ml-1 flex items-center gap-1 font-caveat text-base text-foreground/45"
                                        style={{ rotate: "-4deg" }}
                                    >
                                        <CurlyArrow className="size-5 -scale-x-100" />
                                        pick one!
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <span className={labelClass}>
                                    Add a doodle{" "}
                                    <span className="normal-case tracking-normal text-foreground/40">
                                        (optional)
                                    </span>
                                </span>
                                <DoodleCanvas
                                    strokes={doodle}
                                    onChange={setDoodle}
                                    ink={palette.ink}
                                />
                            </div>

                            <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-muted/20 px-3 py-2 text-[12px] leading-snug text-foreground/60">
                                <Heart className="size-3.5 shrink-0 text-rose-400/80" />
                                Just between us until I read it. Be kind ♡
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="text-sm text-red-500/80"
                                >
                                    {error}
                                </p>
                            )}

                            <div className="mt-auto flex items-center justify-end gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (pending) return;
                                        onClose();
                                        reset();
                                    }}
                                    className="rounded-full px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
                                >
                                    Nevermind
                                </button>
                                <button
                                    type="submit"
                                    disabled={pending}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full bg-foreground text-background",
                                        "px-4 py-2 text-sm font-medium tracking-tight",
                                        "disabled:opacity-40 hover:opacity-90 transition-opacity",
                                    )}
                                >
                                    {pending ? "Sending…" : "Send it"}
                                    {!pending && <Heart className="size-3.5" />}
                                </button>
                            </div>
                        </form>

                        {/* preview pane */}
                        <div
                            className={cn(
                                "relative flex items-center justify-center",
                                "border-t border-border/40 md:border-t-0 md:border-l",
                                "bg-gradient-to-br from-[#f4ecd8]/40 to-[#e6eef7]/30",
                                "dark:from-[#3a2f1c]/20 dark:to-[#1e2a3a]/20",
                                "p-6 md:p-8 md:w-[45%]",
                            )}
                        >
                            <div
                                className="pointer-events-none absolute left-5 top-4 flex items-center gap-1.5 font-caveat text-base text-foreground/50"
                                style={{ rotate: "-3deg" }}
                            >
                                <Sparkle className="size-3 text-foreground/40" />
                                looks like this
                            </div>

                            <motion.div
                                layout
                                transition={{
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 26,
                                }}
                                className={cn(
                                    "relative w-full max-w-sm rotate-[-1.5deg] overflow-hidden rounded-[10px]",
                                    "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]",
                                    palette.paper,
                                )}
                            >
                                {/* opened flap (small silhouette on top) */}
                                <div
                                    aria-hidden
                                    className={cn(
                                        "h-6 w-full origin-top",
                                        palette.flap,
                                    )}
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 100% 0, 50% 100%)",
                                    }}
                                />

                                <div
                                    className={cn(
                                        "relative m-3 min-h-[240px] rounded-md bg-white/70 p-5 md:p-6",
                                        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                                    )}
                                    style={{
                                        backgroundImage:
                                            "repeating-linear-gradient(0deg, transparent 0px, transparent 26px, rgba(0,0,0,0.06) 26px, rgba(0,0,0,0.06) 27px)",
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "font-mono text-[10px] uppercase tracking-[0.18em] opacity-60",
                                            palette.ink,
                                        )}
                                    >
                                        {todayLongDate()}
                                    </div>

                                    <motion.p
                                        key={`msg-${color}`}
                                        initial={false}
                                        animate={{ opacity: 1 }}
                                        className={cn(
                                            "mt-5 whitespace-pre-wrap font-serif text-[15px] leading-relaxed",
                                            palette.ink,
                                            isPlaceholderMessage &&
                                                "opacity-40 italic",
                                        )}
                                    >
                                        {displayMessage}
                                    </motion.p>

                                    {doodle.length > 0 && (
                                        <div className="mt-4 max-w-[220px] opacity-80">
                                            <DoodleRender
                                                paths={doodle}
                                                ink={palette.ink}
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={cn(
                                            "mt-5 inline-flex items-baseline gap-1.5 font-caveat text-xl leading-none",
                                            palette.ink,
                                            isPlaceholderSender
                                                ? "opacity-40"
                                                : "opacity-85",
                                        )}
                                        style={{ rotate: "-2deg" }}
                                    >
                                        <span
                                            aria-hidden
                                            className="text-[13px] tracking-wide opacity-70"
                                        >
                                            yours,
                                        </span>
                                        {displaySender}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const inputClass = cn(
    "w-full rounded-lg border border-border/60 bg-background/50",
    "px-3 py-2 text-sm text-foreground",
    "focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40",
);

const labelClass = cn(
    "font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55",
);
