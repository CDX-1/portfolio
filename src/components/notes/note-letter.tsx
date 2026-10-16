"use client";

import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { NOTE_PALETTE, type Note } from "@/content/notes";
import { cn } from "@/lib/utils";
import DoodleRender from "./doodle-render";
import { Postmark, ruledLines, Stamp } from "./letter-paper";
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
                    <div className="relative flex items-start justify-between gap-3 px-6 pt-7 sm:pt-6">
                        <div className="pt-1">
                            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
                                {formatNoteDate(note.createdAt, "long")}
                            </span>
                            <span className="mt-3 block font-caveat text-2xl leading-none opacity-75">
                                Dear Awsaf,
                            </span>
                        </div>
                        <div className="flex items-start gap-1">
                            <div className="flex items-center">
                                <Postmark
                                    label={formatNoteDate(
                                        note.createdAt,
                                        "short",
                                    )}
                                    className="-mr-1.5 mt-2"
                                />
                                <Stamp color={note.color} />
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="-mr-2 -mt-1 rounded-full p-2 opacity-50 transition hover:bg-black/5 hover:opacity-100"
                            >
                                <IconX className="size-4" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-y-auto overscroll-contain px-6 pt-3 pb-8">
                        <div
                            className="font-caveat text-[26px]"
                            style={ruledLines(36)}
                        >
                            <p className="whitespace-pre-wrap break-words">
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

                            <p className="pt-[36px] text-right text-[28px]">
                                — {note.sender}
                            </p>
                        </div>

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
