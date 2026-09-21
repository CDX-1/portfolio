import { getAllResearch } from "@/lib/mdx";
import {
    IconArrowUpRight,
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconX,
} from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Research — awsaf.dev",
    description: "Research papers and writing by Awsaf Syed.",
};

const statusStyles: Record<string, string> = {
    published: "bg-primary/10 text-primary border-primary/20",
    preprint: "bg-accent text-accent-foreground border-border/50",
    "in-progress": "bg-muted text-muted-foreground border-border/50",
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

    if (papers.length === 0) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 relative">
            <div className="fixed top-6 right-6 md:top-10 md:right-10 z-100">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors duration-300"
                    aria-label="Go Home"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest hidden md:block">
                        Home
                    </span>
                    <IconX className="size-6 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                </Link>
            </div>

            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
                <header className="mb-16 md:mb-24">
                    <span className="text-sm font-mono tracking-widest uppercase text-foreground/40 mb-3 block">
                        Research
                    </span>
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-bespoke">
                        Papers & Writing
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mt-4 leading-relaxed">
                        A collection of research papers, preprints, and technical writing.
                    </p>
                </header>

                <ul className="flex flex-col divide-y divide-border/40">
                    {papers.map((paper) => (
                        <li key={paper.slug} className="py-8 md:py-10 first:pt-0">
                            <Link
                                href={`/research/${paper.slug}`}
                                className="group block"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${
                                                    statusStyles[paper.meta.status] ??
                                                    statusStyles["preprint"]
                                                }`}
                                            >
                                                {statusLabels[paper.meta.status] ??
                                                    paper.meta.status}
                                            </span>
                                            {paper.meta.venue && (
                                                <span className="text-xs sm:text-sm text-foreground/50 font-satoshi">
                                                    {paper.meta.venue}
                                                </span>
                                            )}
                                            <span className="text-xs sm:text-sm text-foreground/50 font-satoshi">
                                                {formatDate(paper.meta.date)}
                                            </span>
                                        </div>

                                        <h2 className="font-bespoke text-2xl md:text-3xl tracking-tight leading-snug group-hover:text-primary transition-colors duration-200">
                                            {paper.meta.title}
                                        </h2>

                                        <p className="text-foreground/60 text-base md:text-lg mt-3 leading-relaxed">
                                            {paper.meta.abstract}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                                            {paper.meta.authors?.map((author) => (
                                                <div
                                                    key={author.name}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-sm text-foreground/70">
                                                        {author.name}
                                                    </span>
                                                    {author.github && (
                                                        <IconBrandGithubFilled className="size-4 text-foreground/40" />
                                                    )}
                                                    {author.linkedin && (
                                                        <IconBrandLinkedinFilled className="size-4 text-foreground/40" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {paper.meta.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {paper.meta.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-accent text-accent-foreground"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <IconArrowUpRight
                                        className="size-6 text-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                                        stroke={1.5}
                                    />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </article>
        </main>
    );
}
