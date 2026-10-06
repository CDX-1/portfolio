import { NOTE_PALETTE, type Note } from "@/content/notes";
import { cn } from "@/lib/utils";
import DoodleRender from "./doodle-render";

export function formatNoteDate(iso: string, style: "short" | "long") {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: style === "long" ? "long" : "short",
        year: style === "long" ? "numeric" : undefined,
    });
}

type CardNote = Pick<Note, "sender" | "message" | "color" | "createdAt"> & {
    doodle?: string[];
};

/**
 * A single letter as it appears on the wall. Also used as the live preview
 * in the compose sheet, so `placeholder` dims whatever hasn't been typed yet.
 */
export default function NoteCard({
    note,
    badge,
    clamp = false,
    placeholder,
    className,
}: {
    note: CardNote;
    badge?: string;
    clamp?: boolean;
    placeholder?: { message?: boolean; sender?: boolean };
    className?: string;
}) {
    const palette = NOTE_PALETTE[note.color];

    return (
        <div
            className={cn(
                "relative flex flex-col rounded-2xl p-5 text-left",
                "ring-1 ring-inset ring-black/[0.05]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-16px_rgba(0,0,0,0.18)]",
                palette.paper,
                palette.ink,
                className,
            )}
        >
            <p
                className={cn(
                    "whitespace-pre-wrap break-words font-bespoke text-[17px] leading-[1.55]",
                    clamp && "line-clamp-[8]",
                    placeholder?.message && "opacity-40",
                )}
            >
                {note.message}
            </p>

            {note.doodle && note.doodle.length > 0 && (
                <div className="mt-3 w-full max-w-[170px] opacity-85">
                    <DoodleRender paths={note.doodle} ink={palette.ink} />
                </div>
            )}

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-current/10 pt-3">
                <span
                    className={cn(
                        "min-w-0 truncate font-bespoke text-[15px] italic",
                        placeholder?.sender && "opacity-40",
                    )}
                >
                    {note.sender}
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] opacity-55">
                    {badge ?? formatNoteDate(note.createdAt, "short")}
                </span>
            </div>
        </div>
    );
}
