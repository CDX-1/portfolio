import {
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconCalendarFilled,
    IconLinkFilled,
    IconMapPinFilled,
    IconTrophyFilled,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug, MDXComponents } from "@/lib/mdx";

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = getProjectBySlug(slug);

    return {
        title: meta.title,
        description: meta.description,

        openGraph: {
            title: meta.title,
            description: meta.description,
            url: "https://awsaf.dev",
            siteName: "Awsaf's Portfolio",
            images: [
                {
                    url: `https://awsaf.dev/projects/assets/${meta.images?.[0]}`,
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

const collageStyles = [
    "-rotate-6 hover:rotate-0 z-10",
    "rotate-3 hover:rotate-0 z-20 -ml-12 md:-ml-24 mt-8 md:mt-12",
    "-rotate-3 hover:rotate-0 z-30 -ml-12 md:-ml-24 -mt-6 md:-mt-10",
    "rotate-6 hover:rotate-0 z-40 -ml-12 md:-ml-24 mt-4 md:mt-8",
    "-rotate-12 hover:rotate-0 z-50 -ml-12 md:-ml-24",
];

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { content, meta } = getProjectBySlug(slug);

    return (
        <main className="min-h-screen pt-14 sm:pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 relative">
            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                {meta.images && meta.images.length > 0 && (
                    <div className="-mx-4 sm:mx-0 flex flex-row justify-center items-center py-10 md:py-16 mb-8 overflow-x-clip sm:overflow-visible">
                        {meta.images.map((image, i) => (
                            <div
                                key={image}
                                className={`
                                    relative w-32 sm:w-48 md:w-64 shrink-0
                                    transition-all duration-300 ease-in-out hover:scale-110 hover:z-[60]
                                    shadow-xl hover:shadow-2xl rounded-xl md:rounded-2xl 
                                    border-4 border-white/10 bg-background overflow-hidden
                                    ${collageStyles[i % collageStyles.length]}
                                `}
                            >
                                <Image
                                    src={image}
                                    alt={`${meta.title} screenshot ${i + 1}`}
                                    width={0}
                                    height={0}
                                    className="w-full h-auto"
                                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col gap-4 text-center mb-12 md:mb-16">
                    <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        <span
                            className="h-px w-6 bg-foreground/15"
                            aria-hidden
                        />
                        <span className="text-foreground/55">Project</span>
                        <span
                            className="h-px w-6 bg-foreground/15"
                            aria-hidden
                        />
                    </div>
                    <h1 className="text-[2.5rem] leading-[1.1] md:text-5xl font-semibold font-bespoke tracking-tight text-balance">
                        {meta.title}
                    </h1>

                    <p className="text-lg md:text-xl text-foreground/55 max-w-2xl mx-auto">
                        {meta.description}
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-foreground/70">
                        {meta.author.map((author) => (
                            <div
                                className="flex gap-2 items-center text-sm"
                                key={author.name}
                            >
                                <span>{author.name}</span>
                                {author.github && (
                                    <Link
                                        href={author.github}
                                        target="_blank"
                                        className="text-foreground/40 hover:text-foreground transition-colors"
                                    >
                                        <IconBrandGithubFilled className="size-3.5" />
                                    </Link>
                                )}
                                {author.linkedin && (
                                    <Link
                                        href={author.linkedin}
                                        target="_blank"
                                        className="text-foreground/40 hover:text-foreground transition-colors"
                                    >
                                        <IconBrandLinkedinFilled className="size-3.5" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {meta.awards && meta.awards.length > 0 && (
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                            {meta.awards.map((award) => (
                                <div
                                    key={award}
                                    className="flex gap-2 items-center"
                                >
                                    <IconTrophyFilled className="size-3.5 text-foreground/50" />
                                    <p className="text-sm md:text-base text-foreground/70 tracking-tight">
                                        {award}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
                        {meta.location && (
                            <div className="flex gap-1.5 items-center">
                                <IconMapPinFilled className="size-3 text-foreground/40" />
                                <span>{meta.location}</span>
                            </div>
                        )}
                        <div className="flex gap-1.5 items-center">
                            <IconCalendarFilled className="size-3 text-foreground/40" />
                            <span className="tabular-nums">{meta.date}</span>
                        </div>
                    </div>

                    {(meta.github || meta.devpost) && (
                        <div className="flex justify-center items-center gap-6 mt-2">
                            {meta.github && (
                                <Link
                                    href={meta.github}
                                    target="_blank"
                                    className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-200"
                                >
                                    <IconBrandGithubFilled className="size-4 text-foreground/50 group-hover:text-foreground transition-colors" />
                                    <span>View Source</span>
                                </Link>
                            )}

                            {meta.devpost && (
                                <Link
                                    href={meta.devpost}
                                    target="_blank"
                                    className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-200"
                                >
                                    <IconLinkFilled className="size-4 text-foreground/50 group-hover:text-foreground transition-colors" />
                                    <span>View on Devpost</span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative mx-auto max-w-4xl">
                    <MDXRemote source={content} components={MDXComponents} />
                </div>
            </article>
        </main>
    );
}
