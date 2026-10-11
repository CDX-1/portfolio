"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NOTE_PALETTE, type NoteColor } from "@/content/notes";
import { cn } from "@/lib/utils";

type Floater = {
    color: NoteColor;
    text?: string;
    /** target offset from the button center, in px */
    x: number;
    y: number;
    rotate: number;
    size: "sm" | "md";
};

const FLOATER_CONTENT = [
    {
        color: "rose",
        text: "hi!",
        size: "sm",
    },
    {
        color: "sky",
        text: "hello",
        size: "sm",
    },
    {
        color: "sage",
        text: "thanks",
        size: "sm",
    },
    {
        color: "butter",
        text: "hey",
        size: "sm",
    },
] as const satisfies Omit<Floater, "x" | "y" | "rotate">[];

// Keep one letter in each quadrant so the burst feels spontaneous without
// obscuring the button or stacking every envelope on the same side.
const FLOATER_ANGLES = [-145, -35, 35, 145] as const;

function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function createFloaters(): Floater[] {
    return FLOATER_CONTENT.map((floater, index) => {
        const angle =
            (FLOATER_ANGLES[index] + randomBetween(-16, 16)) * (Math.PI / 180);

        return {
            ...floater,
            x: Math.cos(angle) * randomBetween(64, 94),
            y: Math.sin(angle) * randomBetween(36, 54),
            rotate: randomBetween(-16, 16),
        };
    });
}

function MiniEnvelope({ floater, index }: { floater: Floater; index: number }) {
    const palette = NOTE_PALETTE[floater.color];
    const dims = floater.size === "md" ? "h-11 w-16" : "h-9 w-14";

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
            <motion.div
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.3, opacity: 0 }}
                animate={{
                    x: floater.x,
                    y: floater.y,
                    rotate: floater.rotate,
                    scale: 1,
                    opacity: 1,
                }}
                exit={{ x: 0, y: 0, rotate: 0, scale: 0.3, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                    delay: index * 0.05,
                }}
            >
                <motion.div
                    animate={{
                        y: [0, -3, 0, 3, 0],
                        rotate: [0, 1.5, 0, -1.5, 0],
                    }}
                    transition={{
                        duration: 5 + index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={cn(
                        "relative overflow-hidden rounded-[4px] shadow-[0_4px_10px_-6px_rgba(0,0,0,0.25)]",
                        dims,
                        palette.paper,
                    )}
                >
                    <div
                        aria-hidden
                        className={cn(
                            "absolute inset-x-0 top-0 h-1/2",
                            palette.flap,
                        )}
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        }}
                    />
                    <div
                        aria-hidden
                        className={cn(
                            "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                            palette.seal,
                        )}
                    />
                    {floater.text && (
                        <div
                            className={cn(
                                "absolute inset-x-0 bottom-0.5 text-center font-caveat text-[13px] leading-none",
                                palette.ink,
                                "opacity-75",
                            )}
                        >
                            {floater.text}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function FloatingNotes({ hovered }: { hovered: boolean }) {
    const [floaters, setFloaters] = useState<Floater[]>([]);

    useEffect(() => {
        if (hovered) setFloaters(createFloaters());
    }, [hovered]);

    return (
        <AnimatePresence>
            {hovered &&
                floaters.map((floater, i) => (
                    <MiniEnvelope
                        key={`${floater.color}-${floater.text ?? ""}-${i}`}
                        floater={floater}
                        index={i}
                    />
                ))}
        </AnimatePresence>
    );
}
