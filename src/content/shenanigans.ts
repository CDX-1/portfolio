export type ShenanigansMediaKind = "image" | "video" | "gif";

export type ShenanigansEntry = {
    id: string;
    date: string;
    title: string;
    caption?: string;
    media: {
        kind: ShenanigansMediaKind;
        src: string;
        poster?: string;
        alt?: string;
        aspect?: "video" | "square" | "portrait" | "wide" | "tall";
    };
    span?: "half" | "full";
};

export type ShenanigansRow = {
    id: string;
    slug: string;
    entry_date: string;
    title: string;
    caption: string | null;
    media_kind: ShenanigansMediaKind;
    media_src: string;
    media_poster: string | null;
    media_alt: string | null;
    media_aspect:
        | "video"
        | "square"
        | "portrait"
        | "wide"
        | "tall"
        | null;
    span: "half" | "full";
    position: number;
    created_at: string;
    updated_at: string;
};

export function rowToEntry(row: ShenanigansRow): ShenanigansEntry {
    return {
        id: row.slug,
        date: row.entry_date,
        title: row.title,
        caption: row.caption ?? undefined,
        media: {
            kind: row.media_kind,
            src: row.media_src,
            poster: row.media_poster ?? undefined,
            alt: row.media_alt ?? undefined,
            aspect: row.media_aspect ?? undefined,
        },
        span: row.span,
    };
}
