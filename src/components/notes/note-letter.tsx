"use client";

import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { NOTE_PALETTE, type Note } from "@/content/notes";
import { cn } from "@/lib/utils";
import DoodleRender from "./doodle-render";
import { Heart } from "./doodles";
import NoteAdminControls from "./note-admin-controls";

function formatLongDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function NoteLetter({
    note,
    open,
    onClose,
    isOwner,
    isPending,
    onLocalDrop,
}: {
    note: Note | null;
    open: boolean;
    onClose: () => void;
    isOwner?: boolean;
    isPending?: boolean;
    onLocalDrop?: (id: string) => void;
}) {
    useEffect(() => {
        if (!open) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && note && (
                <motion.div
                    key="letter-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-md px-4"
                    onClick={onClose}
                >
                    <motion.div
                        layoutId={`note-${note.id}`}
                        transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 30,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                            "relative w-full max-w-md",
                            "rounded-[10px] overflow-hidden",
                            "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]",
                            NOTE_PALETTE[note.color].paper,
                        )}
                        style={{ perspective: 900 }}
                    >
                        {/* opening flap */}
                        <motion.div
                            aria-hidden
                            className={cn(
                                "absolute inset-x-0 top-0 origin-top",
                                NOTE_PALETTE[note.color].flap,
                            )}
                            style={{
                                height: "50%",
                                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                                transformOrigin: "top center",
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                            }}
                            initial={{ rotateX: 0 }}
                            animate={{ rotateX: -168 }}
                            transition={{
                                delay: 0.15,
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />

                        {/* letter paper sliding out */}
                        <motion.div
                            initial={{ y: 24, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative"
                        >
                            <div
                                className={cn(
                                    "relative m-3 rounded-md bg-white/70 p-6 md:p-7",
                                    "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                                    "min-h-[300px]",
                                )}
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(0deg, transparent 0px, transparent 27px, rgba(0,0,0,0.06) 27px, rgba(0,0,0,0.06) 28px)",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close"
                                    className={cn(
                                        "absolute top-2 right-2 rounded-full p-1.5",
                                        "text-black/40 hover:text-black/70 hover:bg-black/5",
                                        "transition-colors",
                                    )}
                                >
                                    <IconX className="size-4" />
                                </button>

                                <div
                                    className={cn(
                                        "font-mono text-[10px] uppercase tracking-[0.18em]",
                                        NOTE_PALETTE[note.color].ink,
                                        "opacity-60",
                                    )}
                                >
                                    {formatLongDate(note.createdAt)}
                                </div>

                                <p
                                    className={cn(
                                        "mt-6 whitespace-pre-wrap font-serif text-[16px] leading-relaxed",
                                        NOTE_PALETTE[note.color].ink,
                                    )}
                                >
                                    {note.message}
                                </p>

                                {note.doodle && note.doodle.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 0.85, y: 0 }}
                                        transition={{
                                            delay: 0.55,
                                            duration: 0.4,
                                        }}
                                        className="mt-5 max-w-[260px]"
                                    >
                                        <DoodleRender
                                            paths={note.doodle}
                                            ink={NOTE_PALETTE[note.color].ink}
                                        />
                                    </motion.div>
                                )}

                                <div
                                    className={cn(
                                        "mt-6 inline-flex items-baseline gap-2 font-caveat text-2xl leading-none",
                                        NOTE_PALETTE[note.color].ink,
                                        "opacity-85",
                                    )}
                                    style={{ rotate: "-2deg" }}
                                >
                                    <span
                                        aria-hidden
                                        className="text-sm tracking-wide opacity-70"
                                    >
                                        yours,
                                    </span>
                                    {note.sender}
                                    <Heart className="size-3.5 text-rose-500/70" />
                                </div>

                                {isPending && (
                                    <div
                                        className={cn(
                                            "mt-6 inline-flex items-center gap-2 rounded-full px-2.5 py-1",
                                            "bg-black/5",
                                            "font-mono text-[9px] uppercase tracking-[0.18em]",
                                            NOTE_PALETTE[note.color].ink,
                                            "opacity-70",
                                        )}
                                    >
                                        <span
                                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-current"
                                            aria-hidden
                                        />
                                        {isOwner
                                            ? "Waiting for you to read"
                                            : "Just between us for now"}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {isOwner && (
                            <div className="relative border-t border-black/10 bg-black/5 px-4 py-3">
                                <NoteAdminControls
                                    note={note}
                                    onDone={onClose}
                                />
                            </div>
                        )}

                        {!isOwner && isPending && onLocalDrop && (
                            <div className="relative border-t border-black/10 bg-black/5 px-4 py-3 text-right">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onLocalDrop(note.id);
                                        onClose();
                                    }}
                                    className={cn(
                                        "text-xs",
                                        NOTE_PALETTE[note.color].ink,
                                        "opacity-60 hover:opacity-100",
                                    )}
                                >
                                    Hide from my view
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
