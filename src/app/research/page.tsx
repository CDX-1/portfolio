import {
    IconArrowUpRight,
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import BrandStar from "@/components/brand-star";
import { getAllResearch } from "@/lib/mdx";

export const metadata: Metadata = {
    title: "Research — awsaf.dev",
    description: "Research papers and writing by Awsaf Syed.",
};

const statusStyles: Record<string, string> = {
    published: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/15",
    preprint:
        "bg-foreground/[0.04] text-foreground/70 ring-1 ring-inset ring-foreground/[0.06]",
    "in-progress":
        "bg-foreground/[0.03] text-foreground/55 ring-1 ring-inset ring-foreground/[0.05]",
};

const statusLabels: Record<string, string> = {
    published: "Published",
    preprint: "Preprint",
    "in-progress": "In Progress",
};

function formatDate(date: string) {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
}

export default function ResearchPage() {
    const papers = getAllResearch();

    return (
        <main className="min-h-screen pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 relative">
            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
                <header className="mb-16 md:mb-24">
                    <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        <span className="tabular-nums text-foreground/55">
                            02
                        </span>
                        <span
                            className="h-px w-6 bg-foreground/15"
                            aria-hidden
                        />
                        Research
                        <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-bespoke">
                        Papers & Writing
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/55 max-w-2xl mt-4 leading-relaxed">
                        A collection of research papers, preprints, and
                        technical writing.
                    </p>
                </header>

                {papers.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/50 bg-foreground/[0.02] px-8 py-16 text-center">
                        <div className="mx-auto max-w-md space-y-3">
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                                Nothing here yet
                            </div>
                            <h2 className="font-bespoke text-2xl md:text-3xl tracking-tight">
                                Papers are on the way.
                            </h2>
                            <p className="text-foreground/55 text-base leading-relaxed">
                                No published work to share just yet. Check back
                                soon, or reach out if you&rsquo;d like to
                                collaborate.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ul className="flex flex-col divide-y divide-border/40">
                        {papers.map((paper, i) => (
                            <li
                                key={paper.slug}
                                className="py-8 md:py-10 first:pt-0"
                            >
                                <Link
                                    href={`/research/${paper.slug}`}
                                    className="group block"
                                >
                                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span
                                                    className="font-mono tabular-nums text-[10px] text-foreground/40"
                                                    aria-hidden
                                                >
                                                    {String(i + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium tracking-tight ${
                                                        statusStyles[
                                                            paper.meta.status
                                                        ] ??
                                                        statusStyles["preprint"]
                                                    }`}
                                                >
                                                    {statusLabels[
                                                        paper.meta.status
                                                    ] ?? paper.meta.status}
                                                </span>
                                                {paper.meta.venue && (
                                                    <span className="text-xs sm:text-sm text-foreground/55 font-satoshi">
                                                        {paper.meta.venue}
                                                    </span>
                                                )}
                                                <span className="text-xs sm:text-sm text-foreground/40 font-satoshi tabular-nums">
                                                    {formatDate(
                                                        paper.meta.date,
                                                    )}
                                                </span>
                                            </div>

                                            <h2 className="font-bespoke text-2xl md:text-3xl tracking-tight leading-snug group-hover:text-foreground transition-colors duration-200">
                                                {paper.meta.title}
                                            </h2>

                                            <p className="text-foreground/55 text-base md:text-lg mt-3 leading-relaxed">
                                                {paper.meta.abstract}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                                                {paper.meta.authors?.map(
                                                    (author) => (
                                                        <div
                                                            key={author.name}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="text-sm text-foreground/70">
                                                                {author.name}
                                                            </span>
                                                            {author.github && (
                                                                <IconBrandGithubFilled className="size-3.5 text-foreground/40" />
                                                            )}
                                                            {author.linkedin && (
                                                                <IconBrandLinkedinFilled className="size-3.5 text-foreground/40" />
                                                            )}
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {paper.meta.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-4">
                                                    {paper.meta.tags.map(
                                                        (tag) => (
                                                            <span
                                                                key={tag}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium tracking-tight text-foreground/70 bg-foreground/[0.04] ring-1 ring-inset ring-foreground/[0.06]"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <IconArrowUpRight
                                            className="size-4 stroke-[2] text-foreground/40 group-hover:text-foreground group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-200 shrink-0"
                                            aria-hidden
                                        />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </main>
    );
}
