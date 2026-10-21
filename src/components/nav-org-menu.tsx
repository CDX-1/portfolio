"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const ORGS = [
    {
        href: "/org/haven-toronto",
        name: "Haven Toronto",
        blurb: "Point of contact · Nov 14",
        image: "/org/haven-toronto.jpg",
    },
];

// Smaller sibling of the projects dropdown, centered under the nav pill.
export default function NavOrgMenu({
    open,
    onEnter,
    onLeave,
    onNavigate,
}: {
    open: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onNavigate: () => void;
}) {
    return (
        <AnimatePresence>
            {open && (
                <section
                    id="nav-org-menu"
                    aria-label="Organizations"
                    className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2"
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
                        <ul className="flex flex-col gap-2">
                            {ORGS.map((org, i) => (
                                <motion.li
                                    key={org.href}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.06 + i * 0.06,
                                        ease: EASE,
                                    }}
                                >
                                    <Link
                                        href={org.href}
                                        onClick={onNavigate}
                                        className="group block overflow-hidden rounded-xl ring-1 ring-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <Image
                                                src={org.image}
                                                alt=""
                                                fill
                                                sizes="288px"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                                            <div className="min-w-0">
                                                <p className="truncate font-heading text-sm font-semibold tracking-tight">
                                                    {org.name}
                                                </p>
                                                <p className="mt-0.5 truncate text-[11px] text-foreground/55">
                                                    {org.blurb}
                                                </p>
                                            </div>
                                            <IconArrowUpRight
                                                className="size-3.5 shrink-0 stroke-[2] text-foreground/40 transition-[color,transform] duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-foreground"
                                                aria-hidden
                                            />
                                        </div>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </section>
            )}
        </AnimatePresence>
    );
}
