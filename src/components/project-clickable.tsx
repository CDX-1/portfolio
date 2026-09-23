"use client";

import { IconArrowUpRight, IconTrophyFilled } from "@tabler/icons-react";
import Link from "next/link";
import type { ProjectType } from "@/lib/mdx";
import { ProjectIPhone } from "./project-iphone";
import { ProjectMacbook } from "./project-macbook";

interface ProjectMeta {
    index?: string;
    name: string;
    description: string;
    main: string;
    images: string[];
    type: ProjectType;
    slug: string;
    tags?: string[];
    awards?: string[];
}

export default function ProjectClickable({
    index,
    name,
    description,
    main,
    images,
    type,
    slug,
    tags,
    awards,
}: ProjectMeta) {
    const hasAwards = !!awards?.length;

    return (
        <Link href={`/projects/${slug}`} className="group flex flex-col w-full">
            <div className="mx-auto w-full p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-linear-to-b aspect-square from-gray-200/50 to-gray-300/70 rounded-3xl sm:rounded-4xl transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-center w-full h-full">
                    {type === "laptop" && (
                        <ProjectMacbook main={main} images={images} />
                    )}
                    {type === "phone" && (
                        <ProjectIPhone main={main} images={images} />
                    )}
                </div>
            </div>

            <div className="mt-4 px-2 sm:px-4">
                <div className="flex items-baseline gap-2">
                    {index && (
                        <span
                            className="font-mono tabular-nums text-[10px] text-foreground/40 group-hover:text-foreground/60 transition-colors"
                            aria-hidden
                        >
                            {index}
                        </span>
                    )}
                    <h3 className="font-bespoke font-medium text-xl sm:text-2xl tracking-tight flex items-center gap-1.5">
                        {name}
                        <IconArrowUpRight
                            className="size-3.5 sm:size-4 stroke-[2] text-foreground/40 transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-foreground"
                            aria-hidden
                        />
                    </h3>
                </div>

                {hasAwards && (
                    <div className="flex items-center gap-2 mt-1.5 text-foreground/70">
                        <IconTrophyFilled className="size-3.5 sm:size-4 shrink-0 text-foreground/50" />
                        <p className="font-satoshi text-sm sm:text-base font-medium tracking-tight">
                            {awards?.join("  ·  ")}
                        </p>
                    </div>
                )}

                <p className="font-satoshi text-base sm:text-lg tracking-tight text-foreground/55 mt-1">
                    {description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
                    {tags?.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium tracking-tight text-foreground/70 bg-foreground/[0.04] ring-1 ring-inset ring-foreground/[0.06] whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
