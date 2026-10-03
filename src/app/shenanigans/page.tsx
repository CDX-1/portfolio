import type { Metadata } from "next";
import Image from "next/image";
import BrandStar from "@/components/brand-star";
import {
    rowToEntry,
    type ShenanigansEntry,
    type ShenanigansRow,
} from "@/content/shenanigans";
import { isOwner } from "@/lib/supabase/owner";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import AdminPanel from "./admin-panel";
import EntryAdminControls from "./entry-admin-controls";

export const metadata: Metadata = {
    title: "Shenanigans — awsaf.dev",
    description: "What I'm messing with lately.",
};

export const dynamic = "force-dynamic";

const aspectClass: Record<
    NonNullable<ShenanigansEntry["media"]["aspect"]>,
    string
> = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    tall: "aspect-[9/16]",
};

const kindLabel: Record<ShenanigansEntry["media"]["kind"], string> = {
    image: "Image",
    video: "Video",
    gif: "Gif",
};

function formatDate(date: string) {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed
        .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        .toUpperCase();
}

function Media({
    entry,
    overlay,
}: {
    entry: ShenanigansEntry;
    overlay?: React.ReactNode;
}) {
    const { media } = entry;
    const aspect = aspectClass[media.aspect ?? "video"];

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-2xl",
                "bg-muted/30 ring-1 ring-inset ring-border/40",
                aspect,
            )}
        >
            {media.kind === "video" ? (
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={media.src}
                    poster={media.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={media.alt ?? entry.title}
                />
            ) : (
                <Image
                    src={media.src}
                    alt={media.alt ?? entry.title}
                    fill
                    unoptimized={media.kind === "gif"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover"
                />
            )}
            {overlay}
        </div>
    );
}

function EntryCard({
    entry,
    index,
    adminOverlay,
}: {
    entry: ShenanigansEntry;
    index: number;
    adminOverlay?: React.ReactNode;
}) {
    return (
        <article
            id={entry.id}
            className={cn(
                "group flex flex-col",
                entry.span === "full" && "md:col-span-2",
            )}
        >
            <Media entry={entry} overlay={adminOverlay} />

            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                <span className="tabular-nums text-foreground/55">
                    {String(index + 1).padStart(3, "0")}
                </span>
                <span className="h-px w-4 bg-foreground/15" aria-hidden />
                <span className="tabular-nums">{formatDate(entry.date)}</span>
                <span className="text-foreground/25" aria-hidden>
                    ·
                </span>
                <span>{kindLabel[entry.media.kind]}</span>
            </div>

            <h2 className="mt-2 font-bespoke text-2xl md:text-[28px] leading-snug tracking-tight text-foreground">
                {entry.title}
            </h2>

            {entry.caption && (
                <p className="mt-2 max-w-prose text-[15px] md:text-base leading-relaxed text-foreground/55">
                    {entry.caption}
                </p>
            )}
        </article>
    );
}

function EmptyState() {
    return (
        <div className="relative flex items-center justify-center rounded-2xl border border-dashed border-border/50 bg-muted/10 py-24 md:py-32 text-center">
            <p className="font-bespoke text-2xl md:text-3xl tracking-tight text-foreground/70">
                Nothing here yet.
            </p>
        </div>
    );
}

export default async function ShenanigansPage() {
    const supabase = await createClient();

    const [{ data: rows }, { data: userData }] = await Promise.all([
        supabase
            .from("shenanigans")
            .select(
                "id, slug, entry_date, title, caption, media_kind, media_src, media_poster, media_alt, media_aspect, span, position, created_at, updated_at",
            )
            .order("position", { ascending: false })
            .order("entry_date", { ascending: false })
            .order("created_at", { ascending: false }),
        supabase.auth.getUser(),
    ]);

    const entries = ((rows ?? []) as ShenanigansRow[]).map(rowToEntry);
    const ownerAuthed = isOwner(userData.user);

    return (
        <main className="min-h-screen pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 relative">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
                <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                            <span className="tabular-nums text-foreground/55">
                                03
                            </span>
                            <span
                                className="h-px w-6 bg-foreground/15"
                                aria-hidden
                            />
                            Shenanigans
                            <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-bespoke">
                            Shenanigans
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/55 max-w-2xl mt-4 leading-relaxed">
                            What I'm messing with lately.
                        </p>
                    </div>

                    {entries.length > 0 && (
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40 shrink-0">
                            <span className="tabular-nums text-foreground/55">
                                {String(entries.length).padStart(3, "0")}
                            </span>
                            <span className="text-foreground/25 px-1">/</span>
                            <span>Entries</span>
                        </div>
                    )}
                </header>

                {entries.length === 0 ? (
                    <EmptyState />
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24 [grid-auto-flow:dense]">
                        {entries.map((entry, i) => {
                            const row = (rows ?? [])[i] as ShenanigansRow;
                            return (
                                <EntryCard
                                    key={entry.id}
                                    entry={entry}
                                    index={i}
                                    adminOverlay={
                                        ownerAuthed ? (
                                            <EntryAdminControls
                                                entryId={row.id}
                                                title={entry.title}
                                                mediaSrc={entry.media.src}
                                            />
                                        ) : null
                                    }
                                />
                            );
                        })}
                    </section>
                )}
            </div>

            {ownerAuthed && <AdminPanel />}
        </main>
    );
}
