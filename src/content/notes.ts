export type NoteStatus = "pending" | "approved" | "rejected";

export type NoteColor = "cream" | "sky" | "sage" | "rose" | "butter";

export const NOTE_COLORS: NoteColor[] = [
    "cream",
    "sky",
    "sage",
    "rose",
    "butter",
];

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
        color: row.color,
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
    cream: {
        paper: "bg-[#f4ecd8]",
        flap: "bg-[#eadcbb]",
        ink: "text-[#4a3a20]",
        seal: "bg-[#8a3324]",
        stamp: "text-[#8a3324]/70",
    },
    sky: {
        paper: "bg-[#e6eef7]",
        flap: "bg-[#c8d6e6]",
        ink: "text-[#22405f]",
        seal: "bg-[#2e5a86]",
        stamp: "text-[#2e5a86]/70",
    },
    sage: {
        paper: "bg-[#e6ede0]",
        flap: "bg-[#c9d4be]",
        ink: "text-[#2f4531]",
        seal: "bg-[#4b6b48]",
        stamp: "text-[#4b6b48]/70",
    },
    rose: {
        paper: "bg-[#f4e3e0]",
        flap: "bg-[#e6c7c1]",
        ink: "text-[#5c2c2c]",
        seal: "bg-[#a34a3f]",
        stamp: "text-[#a34a3f]/70",
    },
    butter: {
        paper: "bg-[#f7ecc7]",
        flap: "bg-[#ecda9c]",
        ink: "text-[#5a4419]",
        seal: "bg-[#a87a1e]",
        stamp: "text-[#a87a1e]/70",
    },
};
