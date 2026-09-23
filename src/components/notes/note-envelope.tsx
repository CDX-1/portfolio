"use client";

import { motion } from "motion/react";
import { NOTE_PALETTE, type Note } from "@/content/notes";
import { cn } from "@/lib/utils";

function initialsOf(name: string): string {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

const WASHI_COLORS = [
    "bg-rose-300/60",
    "bg-sky-300/60",
    "bg-emerald-300/60",
    "bg-amber-300/60",
] as const;

// deterministic pick so each note keeps its own tape
function pickWashi(id: string): {
    show: boolean;
    color: string;
    rotate: number;
} {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 13 + id.charCodeAt(i)) | 0;
    }
    const bounded = ((hash % 100) + 100) % 100;
    return {
        show: bounded < 60,
        color: WASHI_COLORS[bounded % WASHI_COLORS.length] ?? WASHI_COLORS[0],
        rotate: (bounded % 21) - 10,
    };
}

export default function NoteEnvelope({
    note,
    rotate,
    onOpen,
    isPending,
    isOwner,
}: {
    note: Note;
    rotate: number;
    onOpen: () => void;
    isPending?: boolean;
    isOwner?: boolean;
}) {
    const palette = NOTE_PALETTE[note.color];
    const washi = pickWashi(note.id);

    return (
        <motion.button
            type="button"
            layoutId={`note-${note.id}`}
            onClick={onOpen}
            whileHover={{ y: -3, rotate: rotate * 0.3 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ rotate: `${rotate}deg` }}
            className={cn(
                "group relative aspect-[7/5] w-full",
                "cursor-pointer select-none",
                "shadow-[0_6px_16px_-10px_rgba(0,0,0,0.28)]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/40",
                "rounded-[6px] overflow-hidden",
                palette.paper,
            )}
            aria-label={`Open letter from ${note.sender}`}
        >
            {/* subtle diagonal flap lines */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "linear-gradient(135deg, transparent 49.6%, rgba(0,0,0,0.05) 49.8%, rgba(0,0,0,0.05) 50.2%, transparent 50.4%), linear-gradient(45deg, transparent 49.6%, rgba(0,0,0,0.05) 49.8%, rgba(0,0,0,0.05) 50.2%, transparent 50.4%)",
                }}
            />

            {/* top flap triangle */}
            <div
                aria-hidden
                className={cn("absolute inset-x-0 top-0 h-1/2", palette.flap)}
                style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
            />

            {/* washi tape strip (some envelopes only) */}
            {washi.show && (
                <div
                    aria-hidden
                    style={{
                        rotate: `${washi.rotate}deg`,
                    }}
                    className={cn(
                        "pointer-events-none absolute -top-1 left-1/3 h-3 w-10",
                        washi.color,
                        "shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
                    )}
                />
            )}

            {/* wax seal */}
            <div
                aria-hidden
                className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    "font-serif text-[10px] font-bold text-white/90",
                    "shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_2px_4px_rgba(0,0,0,0.25)]",
                    palette.seal,
                )}
            >
                {initialsOf(note.sender)}
            </div>

            {/* stamp corner */}
            <div
                aria-hidden
                className={cn(
                    "absolute right-2 top-2 h-6 w-5 rounded-sm",
                    "border border-current/30 bg-white/40",
                    "flex items-center justify-center",
                    "font-serif text-[9px] italic leading-none",
                    palette.stamp,
                )}
            >
                a
            </div>

            {/* handwritten "from" label */}
            <div className="absolute inset-x-2 bottom-1.5 flex items-end justify-between gap-2">
                <div
                    className={cn(
                        "truncate font-caveat text-[15px] leading-tight",
                        palette.ink,
                        "opacity-80",
                    )}
                >
                    from · {note.sender}
                </div>
                {isPending && (
                    <span
                        className={cn(
                            "shrink-0 rounded-full bg-black/10 px-1.5 py-0.5",
                            "font-mono text-[8px] uppercase tracking-[0.18em]",
                            palette.ink,
                        )}
                    >
                        {isOwner ? "Pending" : "Only you"}
                    </span>
                )}
            </div>
        </motion.button>
    );
}
