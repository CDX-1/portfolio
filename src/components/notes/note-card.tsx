import { NOTE_PALETTE, type Note } from "@/content/notes";
import { cn } from "@/lib/utils";
import DoodleRender from "./doodle-render";
import { letterTilt, Postmark, ruledLines, Stamp } from "./letter-paper";

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
    tilt = true,
    className,
}: {
    note: CardNote;
    badge?: string;
    clamp?: boolean;
    placeholder?: { message?: boolean; sender?: boolean };
    /** Pin it slightly crooked, like a letter on a corkboard. */
    tilt?: boolean;
    className?: string;
}) {
    const palette = NOTE_PALETTE[note.color];
    const rotate = tilt ? letterTilt(`${note.sender}${note.createdAt}`) : 0;

    return (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden rounded-[3px] px-5 pt-4 pb-5 text-left",
                "shadow-[0_1px_1px_rgba(0,0,0,0.06),0_12px_28px_-16px_rgba(0,0,0,0.3)]",
                palette.paper,
                palette.ink,
                className,
            )}
            style={{ rotate: `${rotate}deg` }}
        >
            <div className="relative flex items-start justify-between gap-3">
                <span className="pt-2 font-caveat text-xl leading-none opacity-70">
                    To Awsaf,
                </span>
                <div className="flex items-center">
                    <Postmark
                        label={badge ?? formatNoteDate(note.createdAt, "short")}
                        className="-mr-1.5 mt-2"
                    />
                    <Stamp color={note.color} />
                </div>
            </div>

            {/* the whole writing area is ruled, so doodles sit on the lines too */}
            <div
                className="relative mt-2 flex flex-1 flex-col font-caveat text-[22px]"
                style={ruledLines(30)}
            >
                <p
                    className={cn(
                        "whitespace-pre-wrap break-words",
                        clamp && "line-clamp-[7]",
                        placeholder?.message && "opacity-40",
                    )}
                >
                    {note.message}
                </p>

                {note.doodle && note.doodle.length > 0 && (
                    <div className="mt-2 w-full max-w-[170px] opacity-85">
                        <DoodleRender paths={note.doodle} ink={palette.ink} />
                    </div>
                )}

                <p
                    className={cn(
                        "mt-auto self-end truncate pt-[30px] text-2xl",
                        placeholder?.sender && "opacity-40",
                    )}
                >
                    — {note.sender}
                </p>
            </div>
        </div>
    );
}
