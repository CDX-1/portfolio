"use client";

import {
    IconConfetti,
    IconDeviceDesktop,
    IconFlask2,
    IconHome,
    IconLayoutGrid,
} from "@tabler/icons-react";
import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MARKER, type MarkerColor } from "./intro-list";

// Each page gets its own highlighter, same inks as the intro list.
const NAV_ITEMS: {
    name: string;
    href: string;
    icon: typeof IconHome;
    ink: MarkerColor;
}[] = [
    { name: "Home", href: "/", icon: IconHome, ink: "butter" },
    { name: "Projects", href: "/projects", icon: IconLayoutGrid, ink: "sky" },
    { name: "Research", href: "/research", icon: IconFlask2, ink: "sage" },
    {
        name: "Shenanigans",
        href: "/shenanigans",
        icon: IconConfetti,
        ink: "rose",
    },
    {
        name: "Equipment",
        href: "/equipment",
        icon: IconDeviceDesktop,
        ink: "cream",
    },
];

function matchIndex(pathname: string) {
    if (pathname === "/") return 0;
    if (pathname === "/projects" || pathname.startsWith("/projects/")) return 1;
    if (pathname === "/research" || pathname.startsWith("/research/")) return 2;
    if (pathname === "/shenanigans" || pathname.startsWith("/shenanigans/"))
        return 3;
    if (pathname === "/equipment" || pathname.startsWith("/equipment/"))
        return 4;
    return -1;
}

export default function Navbar() {
    const pathname = usePathname();
    const activeIdx = matchIndex(pathname);

    return (
        <MotionConfig reducedMotion="user">
            <DesktopNav activeIdx={activeIdx} />
            <MobileTabBar activeIdx={activeIdx} />
        </MotionConfig>
    );
}

// Phones get an app-style tab bar pinned to the bottom, within thumb reach.
function MobileTabBar({ activeIdx }: { activeIdx: number }) {
    return (
        <nav
            aria-label="Primary"
            style={{ viewTransitionName: "site-tabbar" }}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:hidden"
        >
            <ul
                className={cn(
                    "flex w-full max-w-sm items-stretch rounded-md border border-border/70 p-1",
                    "bg-background/85 backdrop-blur-xl",
                    "shadow-[0_12px_32px_-14px_rgba(0,0,0,0.25)]",
                )}
            >
                {NAV_ITEMS.map((item, i) => {
                    const active = i === activeIdx;
                    const Icon = item.icon;
                    return (
                        <li key={item.name} className="flex-1">
                            <Link
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "relative flex flex-col items-center gap-0.5 rounded-md py-1.5",
                                    "text-[11px] font-medium tracking-tight transition-colors",
                                    active
                                        ? "text-foreground"
                                        : "text-foreground/50 active:text-foreground/80",
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="tab-active-pill"
                                        className="absolute inset-0 rounded-md bg-foreground/[0.06] dark:bg-foreground/10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 32,
                                        }}
                                    />
                                )}
                                <Icon
                                    className={cn(
                                        "relative size-5",
                                        active && "text-primary",
                                    )}
                                    stroke={active ? 2 : 1.6}
                                    aria-hidden
                                />
                                <span className="relative">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function DesktopNav({ activeIdx }: { activeIdx: number }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            aria-label="Primary"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            style={{ viewTransitionName: "site-nav" }}
            className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 sm:flex"
        >
            <div
                className={cn(
                    "flex items-center gap-2 rounded-full py-1 pl-4 pr-1.5 ring-1 backdrop-blur-xl",
                    "transition-[background-color,box-shadow] duration-300",
                    scrolled
                        ? "bg-background/90 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.3)] ring-border"
                        : "bg-background/60 ring-border/60",
                )}
            >
                <Link
                    href="/"
                    aria-label="Home"
                    className="mr-1 font-mono text-sm font-semibold tracking-tighter"
                >
                    Awsaf
                </Link>

                <NavLinks activeIdx={activeIdx} />

                <ResumeLink />
            </div>
        </motion.nav>
    );
}

function ResumeLink() {
    return (
        <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium tracking-tight text-background transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
            Resume
        </Link>
    );
}

function NavLinks({ activeIdx }: { activeIdx: number }) {
    return (
        <ul className="flex items-center gap-0.5 lg:gap-1.5">
            {NAV_ITEMS.map((item, i) => (
                <NavLink key={item.name} item={item} active={i === activeIdx} />
            ))}
        </ul>
    );
}

// The current page is highlighted in its own ink; hovering swipes the
// highlighter across the others, left to right like a real marker.
function NavLink({
    item,
    active,
}: {
    item: (typeof NAV_ITEMS)[number];
    active: boolean;
}) {
    return (
        <li>
            <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                    "group block px-1.5 py-2 text-sm tracking-tight transition-colors duration-200 focus-visible:outline-none",
                    active
                        ? "font-medium text-foreground"
                        : "text-foreground/55 hover:text-foreground focus-visible:text-foreground",
                )}
            >
                <span
                    className={cn(
                        "-mx-0.5 rounded-[2px] bg-left-bottom bg-no-repeat px-0.5 box-decoration-clone",
                        "transition-[background-size] duration-300 ease-out",
                        active
                            ? "[background-size:100%_88%]"
                            : "[background-size:0%_88%] group-hover:[background-size:100%_88%] group-focus-visible:[background-size:100%_88%]",
                    )}
                    style={{
                        backgroundImage: `linear-gradient(${MARKER[item.ink]}, ${MARKER[item.ink]})`,
                    }}
                >
                    {item.name}
                </span>
            </Link>
        </li>
    );
}
