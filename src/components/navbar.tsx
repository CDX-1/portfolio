"use client";

import {
    IconArrowUpRight,
    IconConfetti,
    IconDeviceDesktop,
    IconFlask2,
    IconHome,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Home", href: "/", index: "01", icon: IconHome },
    { name: "Research", href: "/research", index: "02", icon: IconFlask2 },
    {
        name: "Shenanigans",
        href: "/shenanigans",
        index: "03",
        icon: IconConfetti,
    },
    {
        name: "Equipment",
        href: "/equipment",
        index: "04",
        icon: IconDeviceDesktop,
    },
] as const;

function matchIndex(pathname: string) {
    if (pathname === "/" || pathname.startsWith("/projects")) return 0;
    if (pathname === "/research" || pathname.startsWith("/research/")) return 1;
    if (pathname === "/shenanigans" || pathname.startsWith("/shenanigans/"))
        return 2;
    if (pathname === "/equipment" || pathname.startsWith("/equipment/"))
        return 3;
    return -1;
}

export default function Navbar() {
    const pathname = usePathname();
    const activeIdx = matchIndex(pathname);

    return (
        <>
            <DesktopNav activeIdx={activeIdx} />
            <MobileTabBar activeIdx={activeIdx} />
        </>
    );
}

// Phones get an app-style tab bar pinned to the bottom, within thumb reach.
function MobileTabBar({ activeIdx }: { activeIdx: number }) {
    return (
        <nav
            aria-label="Primary"
            data-trail-exclude
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:hidden"
        >
            <ul
                className={cn(
                    "flex w-full max-w-sm items-stretch rounded-full border border-border/70 p-1",
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
                                    "relative flex flex-col items-center gap-0.5 rounded-full py-1.5",
                                    "text-[11px] font-medium tracking-tight transition-colors",
                                    active
                                        ? "text-foreground"
                                        : "text-foreground/50 active:text-foreground/80",
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="tab-active-pill"
                                        className="absolute inset-0 rounded-full bg-foreground/[0.06] dark:bg-foreground/10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 32,
                                        }}
                                    />
                                )}
                                <Icon
                                    className="relative size-5"
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
    // touch devices can't hover to re-expand, so keep the bar open for them
    const canHover = useMediaQuery("(hover: hover)");
    const [scrolled, setScrolled] = useState(false);
    const [hoveringNav, setHoveringNav] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const expanded = !scrolled || hoveringNav || !canHover;

    return (
        <motion.nav
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                delay: 0.15,
            }}
            className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-6 pb-5 sm:flex"
            aria-label="Primary"
            data-trail-exclude
            onMouseEnter={() => setHoveringNav(true)}
            onMouseLeave={() => setHoveringNav(false)}
            onFocusCapture={() => setHoveringNav(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setHoveringNav(false);
                }
            }}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className={cn(
                    "flex items-center rounded-full border backdrop-blur-xl",
                    "transition-[background-color,border-color,box-shadow,padding] duration-300 ease-out",
                    scrolled
                        ? "bg-background/85 border-border/70 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] py-1"
                        : "bg-background/60 border-border/40 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.04)] py-1.5",
                    expanded ? "px-1.5" : "px-1",
                )}
            >
                {/* Wordmark */}
                <Link
                    href="/"
                    aria-label="Home"
                    className={cn(
                        "group flex items-center gap-1 transition-[padding,border-color] duration-300",
                        expanded
                            ? "border-r border-border/40 pl-3 pr-3.5 sm:pl-3.5 sm:pr-4"
                            : "px-3",
                    )}
                >
                    <span
                        className={cn(
                            "font-bespoke italic text-[15px] leading-none tracking-tight",
                            "text-foreground/85 group-hover:text-foreground",
                            "transition-colors duration-200",
                        )}
                    >
                        awsaf
                    </span>
                    <motion.span
                        aria-hidden
                        className="font-bespoke text-[15px] leading-none text-foreground/40 italic"
                        animate={{ opacity: [0.35, 0.9, 0.35] }}
                        transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        .
                    </motion.span>
                </Link>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{
                                duration: 0.22,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex items-center overflow-hidden"
                        >
                            {/* Tabs */}
                            <ul className="relative flex items-center px-1 sm:px-1.5">
                                {NAV_ITEMS.map((item, i) => {
                                    const active = i === activeIdx;
                                    return (
                                        <motion.li
                                            key={item.name}
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.08 + i * 0.05,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "group relative flex items-center gap-1.5 rounded-full",
                                                    "px-2.5 py-1.5 sm:px-3.5",
                                                    "text-sm font-medium tracking-tight",
                                                    "transition-colors duration-200",
                                                    active
                                                        ? "text-foreground"
                                                        : "text-foreground/55 hover:text-foreground",
                                                )}
                                            >
                                                {active && (
                                                    <motion.span
                                                        layoutId="nav-active-pill"
                                                        className="absolute inset-0 rounded-full bg-foreground/[0.045] ring-1 ring-foreground/[0.03] ring-inset dark:bg-foreground/10"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 380,
                                                            damping: 32,
                                                        }}
                                                    />
                                                )}
                                                <span
                                                    className={cn(
                                                        "relative z-10 hidden font-mono text-[10px] leading-none tabular-nums sm:inline-block",
                                                        "transition-[color,transform] duration-200",
                                                        active
                                                            ? "text-foreground/55"
                                                            : "text-foreground/30 group-hover:-translate-y-px group-hover:text-foreground/55",
                                                    )}
                                                    aria-hidden
                                                >
                                                    {item.index}
                                                </span>
                                                <span className="relative z-10">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            {/* Resume */}
                            <div className="flex items-center border-l border-border/40 pl-1">
                                <Link
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "group relative flex items-center gap-1 rounded-full",
                                        "px-3 py-1.5 sm:px-3.5",
                                        "text-sm font-medium tracking-tight",
                                        "text-foreground/70 hover:text-foreground",
                                        "transition-colors duration-200",
                                    )}
                                >
                                    <span className="relative">Resume</span>
                                    <IconArrowUpRight
                                        className={cn(
                                            "size-3.5 stroke-[2] text-foreground/50",
                                            "transition-transform duration-200 ease-out",
                                            "group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:text-foreground",
                                        )}
                                        aria-hidden
                                    />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.nav>
    );
}
