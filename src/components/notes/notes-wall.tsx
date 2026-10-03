"use client";

import { IconPencilPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    NOTES_SECTION_ID,
    OPEN_COMPOSE_EVENT,
} from "@/components/leave-note-button";
import type { Note } from "@/content/notes";
import { cn } from "@/lib/utils";
import BrandStar from "../brand-star";
import ComposeForm from "./compose-form";
import { Heart, Squiggle, StarDoodle } from "./doodles";
import FloatingNotes from "./floating-notes";
import NoteEnvelope from "./note-envelope";
import NoteLetter from "./note-letter";

const LOCAL_KEY = "awsaf.dev:pending-notes:v1";
const MAX_LOCAL = 8;

function readLocal(): Note[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(LOCAL_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed as Note[];
    } catch {
        return [];
    }
}

function writeLocal(notes: Note[]) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(
            LOCAL_KEY,
            JSON.stringify(notes.slice(0, MAX_LOCAL)),
        );
    } catch {
        // storage full or blocked, ignore
    }
}

// deterministic small rotation from id so it doesn't jump on rerender
function rotateFor(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) | 0;
    }
    const bounded = ((hash % 100) + 100) % 100;
    return (bounded / 100) * 8 - 4; // [-4, 4] degrees
}

// deterministic tiny vertical offset so the wall isn't a perfect grid
function nudgeFor(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 17 + id.charCodeAt(i) * 3) | 0;
    }
    const bounded = ((hash % 100) + 100) % 100;
    return (bounded / 100) * 8 - 4; // [-4, 4] px
}

export default function NotesWall({
    serverNotes,
    isOwner,
}: {
    serverNotes: Note[];
    isOwner: boolean;
}) {
    const [localPending, setLocalPending] = useState<Note[]>([]);
    const [composeOpen, setComposeOpen] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);
    const [buttonHovered, setButtonHovered] = useState(false);

    // hydrate local pending from storage on mount, and prune any that server
    // already surfaces (approved / owner-visible).
    useEffect(() => {
        const stored = readLocal();
        const serverIds = new Set(serverNotes.map((n) => n.id));
        const remaining = stored.filter((n) => !serverIds.has(n.id));
        if (remaining.length !== stored.length) writeLocal(remaining);
        setLocalPending(remaining);
    }, [serverNotes]);

    useEffect(() => {
        const handler = () => setComposeOpen(true);
        window.addEventListener(OPEN_COMPOSE_EVENT, handler);
        return () => window.removeEventListener(OPEN_COMPOSE_EVENT, handler);
    }, []);

    const notes = useMemo(() => {
        // owner already sees pending from server; skip local layer to avoid dupes
        if (isOwner) return serverNotes;
        const serverIds = new Set(serverNotes.map((n) => n.id));
        const merged = [
            ...localPending.filter((n) => !serverIds.has(n.id)),
            ...serverNotes,
        ];
        return merged;
    }, [serverNotes, localPending, isOwner]);

    const openNote = useMemo(
        () => notes.find((n) => n.id === openId) ?? null,
        [notes, openId],
    );

    const onLocalDrop = useCallback((id: string) => {
        setLocalPending((prev) => {
            const next = prev.filter((n) => n.id !== id);
            writeLocal(next);
            return next;
        });
    }, []);

    function onSubmitted(note: Note) {
        if (isOwner) return; // owner sees it from server on refresh
        setLocalPending((prev) => {
            const next = [note, ...prev.filter((n) => n.id !== note.id)];
            writeLocal(next);
            return next;
        });
        setOpenId(note.id);
    }

    return (
        <section id={NOTES_SECTION_ID} className="mt-16 sm:mt-24 scroll-mt-24">
            <div
                className={cn(
                    "relative overflow-hidden rounded-[28px] border border-border/40",
                    "bg-gradient-to-br from-[#f6ecd7]/35 via-[#f4e3e0]/25 to-[#e6eef7]/35",
                    "dark:from-[#3a2f1c]/20 dark:via-[#3a2528]/15 dark:to-[#1e2a3a]/20",
                    "px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16",
                )}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.5) 0.5px, transparent 0.5px)",
                        backgroundSize: "22px 22px",
                    }}
                />

                <div className="relative mb-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        <span className="tabular-nums text-foreground/55">
                            03
                        </span>
                        <span
                            className="h-px w-6 bg-foreground/15"
                            aria-hidden
                        />
                        Notes
                        <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        <span className="tabular-nums text-foreground/55">
                            {String(notes.length).padStart(2, "0")}
                        </span>
                        <span className="text-foreground/25 px-0.5">/</span>
                        <span>Letters</span>
                    </div>
                </div>

                <div className="relative mx-auto max-w-2xl text-center">
                    <span
                        className="font-caveat text-lg text-foreground/50"
                        style={{ display: "inline-block", rotate: "-3deg" }}
                    >
                        psst,
                    </span>

                    <h2 className="relative mt-1 font-bespoke text-3xl md:text-4xl tracking-tight text-foreground">
                        say hi
                        <BrandStar className="absolute -right-7 -top-3 size-5 rotate-12 text-[#ec7042]" />
                        <Squiggle
                            className="absolute left-1/2 -bottom-4 h-2 w-32 -translate-x-1/2 text-foreground/25"
                            aria-hidden
                        />
                    </h2>

                    <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-foreground/55">
                        leave a note. it shows up here right away, and joins the
                        wall once i've read it.
                    </p>

                    <div className="mt-7 flex justify-center">
                        <div className="relative z-30 inline-block">
                            <FloatingNotes hovered={buttonHovered} />
                            <button
                                type="button"
                                onClick={() => setComposeOpen(true)}
                                onMouseEnter={() => setButtonHovered(true)}
                                onMouseLeave={() => setButtonHovered(false)}
                                onFocus={() => setButtonHovered(true)}
                                onBlur={() => setButtonHovered(false)}
                                className={cn(
                                    "relative z-10 inline-flex items-center gap-2 rounded-full",
                                    "bg-foreground text-background",
                                    "pl-3 pr-4 py-2 text-sm font-medium tracking-tight",
                                    "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]",
                                    "hover:opacity-90 transition-opacity duration-200",
                                )}
                            >
                                <IconPencilPlus className="size-4" />
                                leave a letter
                            </button>
                        </div>
                    </div>

                    <p
                        className="mt-6 inline-flex items-center gap-1.5 font-caveat text-base text-foreground/50"
                        style={{ rotate: "-1.5deg" }}
                    >
                        p.s. i read them all
                        <Heart className="size-3 text-rose-400/80" />
                    </p>
                </div>

                <div className="relative mt-12 md:mt-16">
                    {notes.length === 0 ? (
                        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/40 bg-background/40 backdrop-blur-[2px] py-12 md:py-14 text-center">
                            <StarDoodle className="size-5 text-foreground/30" />
                            <p className="font-caveat text-xl md:text-2xl text-foreground/55">
                                no letters yet. yours could be the first ✿
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6"
                        >
                            <AnimatePresence initial={false}>
                                {notes.map((note) => {
                                    const isPending =
                                        note.status !== "approved";
                                    return (
                                        <motion.div
                                            key={note.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.96,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: nudgeFor(note.id),
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.96,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <NoteEnvelope
                                                note={note}
                                                rotate={rotateFor(note.id)}
                                                onOpen={() =>
                                                    setOpenId(note.id)
                                                }
                                                isPending={isPending}
                                                isOwner={isOwner}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            <NoteLetter
                note={openNote}
                open={!!openNote}
                onClose={() => setOpenId(null)}
                isOwner={isOwner}
                isPending={
                    openNote ? openNote.status !== "approved" : undefined
                }
                onLocalDrop={onLocalDrop}
            />

            <ComposeForm
                open={composeOpen}
                onClose={() => setComposeOpen(false)}
                onSubmitted={onSubmitted}
            />
        </section>
    );
}
