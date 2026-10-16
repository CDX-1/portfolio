export type NoteStatus = "pending" | "approved" | "rejected";

export type NoteColor = "peach" | "apricot" | "tangerine" | "amber" | "clay";

export const NOTE_COLORS: NoteColor[] = [
    "peach",
    "apricot",
    "tangerine",
    "amber",
    "clay",
];

export const DEFAULT_NOTE_COLOR: NoteColor = "peach";

// Paper colours from before letters went all-orange. Rows were migrated in
// supabase/migrations/20261011120100_notes_orange_palette_remap.sql, but browsers may still
// hold pending notes in localStorage with the old names.
const LEGACY_NOTE_COLORS: Record<string, NoteColor> = {
    cream: "peach",
    sage: "apricot",
    sky: "tangerine",
    butter: "amber",
    rose: "clay",
};

export function normalizeNoteColor(
    color: string | null | undefined,
): NoteColor {
    if (color && (NOTE_COLORS as string[]).includes(color)) {
        return color as NoteColor;
    }
    return (color && LEGACY_NOTE_COLORS[color]) || DEFAULT_NOTE_COLOR;
}

export const MAX_NAME_LEN = 40;
export const MAX_MESSAGE_LEN = 500;
export const MAX_DOODLE_STROKES = 60;
export const MAX_DOODLE_PATH_LEN = 4000;
export const DOODLE_VIEWBOX = { w: 260, h: 160 } as const;

export type NoteRow = {
    id: string;
    sender_name: string;
    message: string;
    color: NoteColor;
    status: NoteStatus;
    created_at: string;
    approved_at: string | null;
    doodle: string[] | null;
};

export type Note = {
    id: string;
    sender: string;
    message: string;
    color: NoteColor;
    status: NoteStatus;
    createdAt: string;
    approvedAt?: string;
    doodle?: string[];
};

export function rowToNote(row: NoteRow): Note {
    return {
        id: row.id,
        sender: row.sender_name,
        message: row.message,
        color: normalizeNoteColor(row.color),
        status: row.status,
        createdAt: row.created_at,
        approvedAt: row.approved_at ?? undefined,
        doodle: row.doodle && row.doodle.length > 0 ? row.doodle : undefined,
    };
}

export const NOTE_PALETTE: Record<
    NoteColor,
    { paper: string; flap: string; ink: string; seal: string; stamp: string }
> = {
    peach: {
        paper: "bg-[#fbe7d8]",
        flap: "bg-[#f4d0b6]",
        ink: "text-[#5a2e14]",
        seal: "bg-[#c2541f]",
        stamp: "text-[#c2541f]/70",
    },
    apricot: {
        paper: "bg-[#fcdcc1]",
        flap: "bg-[#f5c197]",
        ink: "text-[#5b2c0e]",
        seal: "bg-[#d0611f]",
        stamp: "text-[#d0611f]/70",
    },
    tangerine: {
        paper: "bg-[#f9cba8]",
        flap: "bg-[#f1ad7f]",
        ink: "text-[#4d220a]",
        seal: "bg-[#b8470f]",
        stamp: "text-[#b8470f]/70",
    },
    amber: {
        paper: "bg-[#fbd2a6]",
        flap: "bg-[#f3b475]",
        ink: "text-[#563510]",
        seal: "bg-[#b8701a]",
        stamp: "text-[#b8701a]/70",
    },
    clay: {
        paper: "bg-[#f1cdbb]",
        flap: "bg-[#e3ae94]",
        ink: "text-[#4f2418]",
        seal: "bg-[#9e3f25]",
        stamp: "text-[#9e3f25]/70",
    },
};
