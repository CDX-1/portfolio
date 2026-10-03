"use client";

import { IconMail, IconMailOpened } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Squiggle } from "./notes/doodles";
import FloatingNotes from "./notes/floating-notes";

export const NOTES_SECTION_ID = "notes";
export const OPEN_COMPOSE_EVENT = "notes:open-compose";

function goToNotes() {
    if (typeof window === "undefined") return;
    const target = document.getElementById(NOTES_SECTION_ID);
    const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (target) {
        target.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
        });
    }

    // wait for the scroll to settle before popping the compose modal.
    const delay = reduced ? 0 : 550;
    window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent(OPEN_COMPOSE_EVENT));
    }, delay);
}

export default function LeaveNoteButton() {
    const reduced = useReducedMotion();
    const [hovered, setHovered] = useState(false);

    return (
        <div className="relative z-[60] isolate inline-block">
            <FloatingNotes hovered={hovered && !reduced} />
            <motion.button
                type="button"
                onClick={goToNotes}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                initial="rest"
                animate={hovered && !reduced ? "hover" : "rest"}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={cn(
                    "relative z-10 inline-flex items-center gap-2 rounded-full",
                    "border border-foreground/10 bg-background/95 backdrop-blur-sm",
                    "pl-2.5 pr-3 py-1.5 text-[13px] font-medium tracking-tight text-foreground/65",
                    "hover:border-foreground/18 hover:bg-background hover:text-foreground/85 transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
                )}
                variants={{
                    rest: { y: 0 },
                    hover: { y: -1 },
                }}
                aria-label="Leave me a note"
            >
                <span className="relative inline-flex size-4 items-center justify-center">
                    <motion.span
                        className="absolute inset-0 inline-flex items-center justify-center text-foreground/60"
                        variants={{
                            rest: { opacity: 1, rotate: 0 },
                            hover: { opacity: 0, rotate: -6 },
                        }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        <IconMail className="size-4 stroke-[1.9]" aria-hidden />
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 inline-flex items-center justify-center text-[#ec7042]/75"
                        variants={{
                            rest: { opacity: 0, y: 2, rotate: -8, scale: 0.9 },
                            hover: { opacity: 1, y: 0, rotate: 0, scale: 1 },
                        }}
                        transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <IconMailOpened
                            className="size-4 stroke-[1.9]"
                            aria-hidden
                        />
                    </motion.span>
                </span>

                <span className="relative">
                    leave me a note
                    <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 -bottom-1.5 block h-1.5 text-[#ec7042]/70"
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 },
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <Squiggle className="h-full w-full" />
                    </motion.span>
                </span>

                <motion.svg
                    viewBox="0 0 12 12"
                    aria-hidden
                    className="size-3 text-foreground/50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                        rest: { y: 0 },
                        hover: { y: 1 },
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut",
                    }}
                >
                    <title>scroll down arrow</title>
                    <path d="M6 2 L 6 10" />
                    <path d="M2.5 6.5 L 6 10 L 9.5 6.5" />
                </motion.svg>
            </motion.button>
        </div>
    );
}
