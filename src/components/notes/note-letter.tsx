"use client";

import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { NOTE_PALETTE, type Note } from "@/content/notes";
import { cn } from "@/lib/utils";
import DoodleRender from "./doodle-render";
import NoteAdminControls from "./note-admin-controls";
import { formatNoteDate } from "./note-card";
import Sheet from "./sheet";

export default function NoteLetter({
    note: noteProp,
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
    // hold on to the last note so the sheet keeps its content while closing
    const [shown, setShown] = useState(noteProp);
    if (noteProp && noteProp !== shown) setShown(noteProp);
    const note = noteProp ?? shown;
    const palette = note ? NOTE_PALETTE[note.color] : null;

    return (
        <Sheet
            open={open && !!noteProp}
            onClose={onClose}
            label={note ? `Letter from ${note.sender}` : "Letter"}
            className={cn("sm:max-w-lg", palette?.paper, palette?.ink)}
        >
            {note && (
                <>
                    <div className="flex items-center justify-between gap-3 px-6 pt-7 sm:pt-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
                            {formatNoteDate(note.createdAt, "long")}
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="-mr-2 rounded-full p-2 opacity-50 transition hover:bg-black/5 hover:opacity-100"
                        >
                            <IconX className="size-4" />
                        </button>
                    </div>

                    <div className="overflow-y-auto overscroll-contain px-6 pt-4 pb-8">
                        <p className="whitespace-pre-wrap break-words font-bespoke text-[19px] leading-[1.6]">
                            {note.message}
                        </p>

                        {note.doodle && note.doodle.length > 0 && (
                            <div className="mt-6 max-w-[280px] opacity-90">
                                <DoodleRender
                                    paths={note.doodle}
                                    ink={palette?.ink ?? ""}
                                />
                            </div>
                        )}

                        <p className="mt-8 font-bespoke text-lg italic">
                            — {note.sender}
                        </p>

                        {isPending && (
                            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-black/[0.06] px-3 py-1 text-xs opacity-75">
                                <span
                                    aria-hidden
                                    className="size-1.5 rounded-full bg-current"
                                />
                                {isOwner
                                    ? "Waiting for your approval"
                                    : "Only you can see this until it's approved"}
                            </p>
                        )}
                    </div>

                    {isOwner && (
                        <div className="border-t border-black/10 bg-black/[0.03] px-5 py-3">
                            <NoteAdminControls note={note} onDone={onClose} />
                        </div>
                    )}

                    {!isOwner && isPending && onLocalDrop && (
                        <div className="border-t border-black/10 bg-black/[0.03] px-5 py-3 text-right">
                            <button
                                type="button"
                                onClick={() => {
                                    onLocalDrop(note.id);
                                    onClose();
                                }}
                                className="py-1 text-xs opacity-60 hover:opacity-100"
                            >
                                Hide from my view
                            </button>
                        </div>
                    )}
                </>
            )}
        </Sheet>
    );
}
