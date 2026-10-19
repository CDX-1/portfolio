"use client";

import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export type FeaturedProject = {
    slug: string;
    name: string;
    description: string;
    main: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Dropdown under the nav pill: starred projects as small tiles whose photos
// wipe up over a blueprint grid, one after another.
export default function NavProjectsMenu({
    open,
    projects,
    onEnter,
    onLeave,
    onNavigate,
}: {
    open: boolean;
    projects: FeaturedProject[];
    onEnter: () => void;
    onLeave: () => void;
    onNavigate: () => void;
}) {
    return (
        <AnimatePresence>
            {open && projects.length > 0 && (
                // The top padding bridges the gap so the cursor can travel
                // from the link into the panel without closing it.
                <section
                    id="nav-projects-menu"
                    aria-label="Featured projects"
                    className="absolute left-1/2 top-full w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 pt-2"
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                            opacity: 0,
                            y: -6,
                            scale: 0.98,
                            transition: { duration: 0.15 },
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                        }}
                        style={{ transformOrigin: "top center" }}
                        className="rounded-2xl bg-background p-2 ring-1 ring-border shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]"
                    >
                        <ul className="grid grid-cols-4 gap-2">
                            {projects.map((project, i) => (
                                <ProjectTile
                                    key={project.slug}
                                    project={project}
                                    index={i}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </ul>

                        <Link
                            href="/projects"
                            onClick={onNavigate}
                            className="group mt-2 flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium tracking-tight text-foreground/55 transition-colors hover:bg-foreground/[0.04] hover:text-foreground focus-visible:bg-foreground/[0.04] focus-visible:text-foreground focus-visible:outline-none"
                        >
                            <span>All projects</span>
                            <IconArrowRight
                                className="size-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                    </motion.div>
                </section>
            )}
        </AnimatePresence>
    );
}

function ProjectTile({
    project,
    index,
    onNavigate,
}: {
    project: FeaturedProject;
    index: number;
    onNavigate: () => void;
}) {
    const delay = 0.06 + index * 0.06;

    return (
        <motion.li
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: EASE }}
        >
            <Link
                href={`/projects/${project.slug}`}
                onClick={onNavigate}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                <span
                    aria-hidden
                    className="blueprint-grid absolute inset-0 [background-size:32px_32px,32px_32px,8px_8px,8px_8px]"
                />

                <motion.div
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.25 }}
                    animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: delay + 0.05,
                        ease: EASE,
                    }}
                >
                    <Image
                        src={project.main}
                        alt=""
                        fill
                        sizes="176px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
                    />
                </motion.div>

                <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90"
                />

                <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                    <p className="flex items-center gap-1 font-heading text-sm font-semibold tracking-tight">
                        <span className="truncate">{project.name}</span>
                        <IconArrowUpRight
                            className="size-3.5 shrink-0 stroke-[2] opacity-60 transition-[opacity,transform] duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:opacity-100"
                            aria-hidden
                        />
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/70">
                        {project.description}
                    </p>
                </div>
            </Link>
        </motion.li>
    );
}
