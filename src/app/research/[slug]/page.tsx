import {
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconCalendarFilled,
    IconFileTextFilled,
    IconLinkFilled,
    IconX,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllResearch, getResearchBySlug, MDXComponents } from "@/lib/mdx";

export async function generateStaticParams() {
    const papers = getAllResearch();
    return papers.map((paper) => ({
        slug: paper.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = getResearchBySlug(slug);

    return {
        title: meta.title,
        description: meta.abstract,

        openGraph: {
            title: meta.title,
            description: meta.abstract,
            url: `https://awsaf.dev/research/${slug}`,
            siteName: "Awsaf's Portfolio",
            type: "article",
        },
    };
}

type Props = {
    params: Promise<{ slug: string }>;
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
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function ResearchPaperPage({ params }: Props) {
    const { slug } = await params;
    const { content, meta } = getResearchBySlug(slug);

    return (
        <main className="min-h-screen pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 relative">
            <div className="fixed top-6 right-6 md:top-10 md:right-10 z-100">
                <Link
                    href="/research"
                    className="group flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors duration-300"
                    aria-label="Back to Research"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest hidden md:block">
                        Research
                    </span>
                    <IconX className="size-6 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                </Link>
            </div>

            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
                <header className="flex flex-col gap-4 mb-16">
                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                statusStyles[meta.status] ??
                                statusStyles.preprint
                            }`}
                        >
                            {statusLabels[meta.status] ?? meta.status}
                        </span>
                        {meta.venue && (
                            <span className="text-sm text-foreground/60 font-satoshi">
                                {meta.venue}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-semibold font-bespoke tracking-tight leading-tight">
                        {meta.title}
                    </h1>

                    <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                        {meta.abstract}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-2">
                        {meta.authors?.map((author) => (
                            <div
                                className="flex gap-2 items-center"
                                key={author.name}
                            >
                                <p>{author.name}</p>
                                {author.github && (
                                    <Link href={author.github} target="_blank">
                                        <IconBrandGithubFilled className="size-5 hover:text-foreground/70" />
                                    </Link>
                                )}
                                {author.linkedin && (
                                    <Link
                                        href={author.linkedin}
                                        target="_blank"
                                    >
                                        <IconBrandLinkedinFilled className="size-5 hover:text-foreground/70" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        <div className="flex gap-2 items-center">
                            <IconCalendarFilled className="size-5" />
                            <p className="text-sm md:text-base text-foreground/70">
                                {formatDate(meta.date)}
                            </p>
                        </div>
                    </div>

                    {(meta.pdf || meta.arxiv || meta.doi) && (
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-2">
                            {meta.pdf && (
                                <Link
                                    href={meta.pdf}
                                    target="_blank"
                                    className="flex items-center gap-2 group"
                                >
                                    <IconFileTextFilled className="size-5 group-hover:text-foreground/70 transition-colors duration-200" />
                                    <span className="group-hover:text-foreground/70 transition-colors duration-200">
                                        Read PDF
                                    </span>
                                </Link>
                            )}

                            {meta.arxiv && (
                                <Link
                                    href={meta.arxiv}
                                    target="_blank"
                                    className="flex items-center gap-2 group"
                                >
                                    <IconLinkFilled className="size-5 group-hover:text-foreground/70 transition-colors duration-200" />
                                    <span className="group-hover:text-foreground/70 transition-colors duration-200">
                                        arXiv
                                    </span>
                                </Link>
                            )}

                            {meta.doi && (
                                <Link
                                    href={`https://doi.org/${meta.doi.replace(/^https?:\/\/doi\.org\//, "")}`}
                                    target="_blank"
                                    className="flex items-center gap-2 group"
                                >
                                    <IconLinkFilled className="size-5 group-hover:text-foreground/70 transition-colors duration-200" />
                                    <span className="group-hover:text-foreground/70 transition-colors duration-200">
                                        DOI
                                    </span>
                                </Link>
                            )}
                        </div>
                    )}

                    {meta.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {meta.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                <div className="mx-auto">
                    <MDXRemote source={content} components={MDXComponents} />
                </div>
            </article>
        </main>
    );
}
