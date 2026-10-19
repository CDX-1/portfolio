import {
    IconArrowLeft,
    IconArrowRight,
    IconArrowUpRight,
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconTrophyFilled,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import BlueprintFill from "@/components/blueprint-fill";
import ProjectShowcase from "@/components/project-showcase";
import { getAllProjects, getProjectBySlug, MDXComponents } from "@/lib/mdx";
import { PROJECT_TYPE_LABELS } from "@/lib/project-types";

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = getProjectBySlug(slug);

    return {
        title: `${meta.title} — awsaf.dev`,
        description: meta.description,

        openGraph: {
            title: meta.title,
            description: meta.description,
            url: `https://awsaf.dev/projects/${slug}`,
            siteName: "Awsaf's Portfolio",
            images: [
                {
                    url: `https://awsaf.dev${meta.main}`,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "article",
        },
    };
}

type Props = {
    params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { content, meta } = getProjectBySlug(slug);

    const all = getAllProjects();
    const position = all.findIndex((p) => p.slug === slug);
    const next = all[(position + 1) % all.length];
    const index = String(position + 1).padStart(2, "0");

    const links = [
        meta.github && {
            href: meta.github,
            label: "Source",
            icon: <IconBrandGithubFilled className="size-3.5" aria-hidden />,
        },
        meta.devpost && {
            href: meta.devpost,
            label: "Devpost",
            icon: null,
        },
    ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];
    const hasAwards = !!meta.awards?.length;

    return (
        <main className="min-h-screen pt-14 sm:pt-24 md:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative">
            <article className="mx-auto max-w-6xl">
                <Link
                    href="/projects"
                    className="group mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-foreground/50 transition-colors hover:text-foreground"
                >
                    <IconArrowLeft
                        className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                        aria-hidden
                    />
                    All projects
                </Link>

                <header>
                    <h1 className="font-heading text-3xl font-semibold leading-[1.1] tracking-tighter text-balance md:text-5xl">
                        {meta.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/55 md:text-xl">
                        {meta.description}
                    </p>

                    {(hasAwards || links.length > 0) && (
                        <div className="mt-6 flex flex-col gap-4 border-y border-dashed border-foreground/15 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                            {hasAwards && (
                                <ul className="flex flex-col gap-1.5">
                                    {meta.awards?.map((award) => {
                                        const [place, event] =
                                            award.split(" — ");
                                        return (
                                            <li
                                                key={award}
                                                className="flex items-center gap-2 text-sm tracking-tight sm:text-base"
                                            >
                                                <IconTrophyFilled
                                                    className="size-4 shrink-0 text-primary"
                                                    aria-hidden
                                                />
                                                <span className="font-medium text-foreground/85">
                                                    {place}
                                                </span>
                                                {event && (
                                                    <span className="text-foreground/45">
                                                        {event}
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            {links.length > 0 && (
                                <div className="flex shrink-0 items-center gap-5 sm:ml-auto">
                                    {links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground/55 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                                        >
                                            {link.icon}
                                            <span className="underline decoration-foreground/20 underline-offset-4 transition-colors group-hover:decoration-primary">
                                                {link.label}
                                            </span>
                                            <IconArrowUpRight
                                                className="size-3.5 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                                                aria-hidden
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </header>

                <ProjectShowcase
                    slug={slug}
                    type={meta.type}
                    name={meta.name}
                    main={meta.main}
                    images={meta.images ?? []}
                    index={index}
                    expanded
                    className="mt-10 aspect-square overflow-hidden sm:aspect-[16/10] md:mt-14"
                />

                {/* Article on the left, specs pinned alongside it, so the
                    text column spans the same width as the showcase above. */}
                <div className="mt-8 grid gap-14 md:mt-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
                    <aside className="lg:order-2">
                        <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
                            <SpecRow label="Type">
                                {PROJECT_TYPE_LABELS[meta.type]}
                            </SpecRow>
                            <SpecRow label="Date">
                                <span className="tabular-nums">
                                    {formatDate(meta.date)}
                                </span>
                            </SpecRow>
                            {meta.location && (
                                <SpecRow label="Where">{meta.location}</SpecRow>
                            )}
                            <SpecRow label="Team">
                                <span className="flex flex-wrap gap-x-4 gap-y-1">
                                    {meta.author.map((author) => (
                                        <span
                                            key={author.name}
                                            className="inline-flex items-center gap-1.5"
                                        >
                                            {author.name}
                                            {author.github && (
                                                <Link
                                                    href={author.github}
                                                    target="_blank"
                                                    aria-label={`${author.name} on GitHub`}
                                                    className="text-foreground/35 transition-colors hover:text-foreground"
                                                >
                                                    <IconBrandGithubFilled className="size-3.5" />
                                                </Link>
                                            )}
                                            {author.linkedin && (
                                                <Link
                                                    href={author.linkedin}
                                                    target="_blank"
                                                    aria-label={`${author.name} on LinkedIn`}
                                                    className="text-foreground/35 transition-colors hover:text-foreground"
                                                >
                                                    <IconBrandLinkedinFilled className="size-3.5" />
                                                </Link>
                                            )}
                                        </span>
                                    ))}
                                </span>
                            </SpecRow>
                            {meta.tags && meta.tags.length > 0 && (
                                <SpecRow label="Stack">
                                    <span className="flex flex-wrap gap-1.5">
                                        {meta.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-sm border border-border bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-xs text-foreground/65"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </SpecRow>
                            )}
                        </dl>
                    </aside>
                    <div className="min-w-0 lg:order-1 lg:pt-3">
                        <div className="relative">
                            <MDXRemote
                                source={content}
                                components={MDXComponents}
                            />
                        </div>

                        {next && next.slug !== slug && (
                            <nav
                                aria-label="Next project"
                                className="mt-20 border-t border-dashed border-foreground/15 pt-8 md:mt-28"
                            >
                                <Link
                                    href={`/projects/${next.slug}`}
                                    className="group flex items-end justify-between gap-6"
                                >
                                    <div className="min-w-0">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/40">
                                            Next project
                                        </span>
                                        <p className="mt-1 truncate font-heading text-2xl font-semibold tracking-tighter transition-colors group-hover:text-primary md:text-3xl">
                                            {next.meta.name}
                                        </p>
                                        <p className="mt-1 truncate text-foreground/55">
                                            {next.meta.description}
                                        </p>
                                    </div>
                                    <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-md border border-foreground/10 text-foreground/60 transition-colors duration-300 group-hover:border-primary group-hover:text-white">
                                        <BlueprintFill />
                                        <IconArrowRight
                                            className="relative size-5 transition-transform duration-300 group-hover:translate-x-0.5"
                                            aria-hidden
                                        />
                                    </span>
                                </Link>
                            </nav>
                        )}
                    </div>
                </div>
            </article>
        </main>
    );
}

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex items-baseline gap-4 border-b border-dashed border-foreground/15 py-3">
            <dt className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/40">
                {label}
            </dt>
            <dd className="min-w-0 text-sm text-foreground/80 sm:text-base">
                {children}
            </dd>
        </div>
    );
}
