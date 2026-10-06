"use client";

import { IconPencil } from "@tabler/icons-react";
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
import NoteCard from "./note-card";
import NoteLetter from "./note-letter";

const LOCAL_KEY = "awsaf.dev:pending-notes:v1";
const MAX_LOCAL = 8;
const PAGE_SIZE = 9;

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
    const [visible, setVisible] = useState(PAGE_SIZE);

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

    const closeLetter = useCallback(() => setOpenId(null), []);
    const closeCompose = useCallback(() => setComposeOpen(false), []);

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
        <section
            id={NOTES_SECTION_ID}
            className="mt-20 scroll-mt-8 sm:mt-28 sm:scroll-mt-24"
        >
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="tabular-nums text-foreground/55">03</span>
                    <span className="h-px w-6 bg-foreground/15" aria-hidden />
                    Notes
                    <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="tabular-nums text-foreground/55">
                        {String(notes.length).padStart(2, "0")}
                    </span>
                    <span className="px-0.5 text-foreground/25">/</span>
                    <span>Letters</span>
                </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="font-bespoke text-3xl font-medium tracking-tight sm:text-4xl">
                        Letters
                    </h2>
                    <p className="mt-2 max-w-md text-base text-foreground/55">
                        Say hi, ask something, or just leave a thought. You'll
                        see it right away, and it joins the wall once I've read
                        it.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setComposeOpen(true)}
                    className={cn(
                        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
                        "bg-foreground px-5 py-3 text-sm font-medium tracking-tight text-background sm:py-2.5",
                        "transition-opacity hover:opacity-90",
                    )}
                >
                    <IconPencil className="size-4" />
                    Write a letter
                </button>
            </div>

            <div className="mt-8 sm:mt-10">
                {notes.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center text-sm text-foreground/50">
                        No letters yet. Yours could be the first.
                    </div>
                ) : (
                    <>
                        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                            <AnimatePresence initial={false}>
                                {notes.slice(0, visible).map((note) => {
                                    const isPending =
                                        note.status !== "approved";
                                    return (
                                        <motion.button
                                            key={note.id}
                                            type="button"
                                            onClick={() => setOpenId(note.id)}
                                            aria-label={`Read letter from ${note.sender}`}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className={cn(
                                                "mb-4 block w-full break-inside-avoid rounded-2xl",
                                                "transition-transform duration-200 ease-out active:scale-[0.99] [@media(hover:hover)]:hover:-translate-y-0.5",
                                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40",
                                            )}
                                        >
                                            <NoteCard
                                                note={note}
                                                clamp
                                                badge={
                                                    isPending
                                                        ? isOwner
                                                            ? "Pending"
                                                            : "Only you"
                                                        : undefined
                                                }
                                            />
                                        </motion.button>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                        {notes.length > visible && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setVisible((v) => v + PAGE_SIZE)
                                    }
                                    className="rounded-full border border-border px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    Show more ({notes.length - visible})
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <NoteLetter
                note={openNote}
                open={!!openNote}
                onClose={closeLetter}
                isOwner={isOwner}
                isPending={
                    openNote ? openNote.status !== "approved" : undefined
                }
                onLocalDrop={onLocalDrop}
            />

            <ComposeForm
                open={composeOpen}
                onClose={closeCompose}
                onSubmitted={onSubmitted}
            />
        </section>
    );
}
