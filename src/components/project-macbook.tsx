"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MacbookPro } from "./macbook-pro";
import { fanSlot, LIFT } from "./project-fan";

export function ProjectMacbook({
    className,
    main,
    images = [],
    expanded = false,
}: {
    className?: string;
    main: string;
    images: string[];
    /** Keep the fan open; hovering then lifts a single laptop instead. */
    expanded?: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [focused, setFocused] = useState<number | null>(null);
    const spread = expanded || isHovered;

    const focus = (i: number) => expanded && setFocused(i);
    const blur = (i: number) => setFocused((f) => (f === i ? null : f));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={expanded ? undefined : { scale: 1.03, y: -10 }}
            whileTap={expanded ? undefined : { scale: 0.97, y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative w-full h-full flex items-center justify-center ${className || ""}`}
        >
            {images.map((src, index) => {
                const { slot, ring } = fanSlot(index, images.length, false);
                const lifted = focused === index;
                const y = ring === 1 ? -36 : -16;
                const scale = ring === 1 ? 0.8 : 0.66;

                return (
                    <motion.div
                        key={src}
                        initial={false}
                        animate={
                            spread
                                ? {
                                      opacity: 1,
                                      x: `${slot * (ring === 1 ? 24 : 26)}%`,
                                      y: `${lifted ? y - LIFT.y : y}%`,
                                      rotate: lifted ? 0 : slot * 5,
                                      scale: scale + (lifted ? LIFT.scale : 0),
                                  }
                                : {
                                      opacity: 0,
                                      x: 0,
                                      y: 0,
                                      rotate: 0,
                                      scale: 0.6,
                                  }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delay: spread && !expanded ? (ring - 1) * 0.04 : 0,
                        }}
                        onHoverStart={() => focus(index)}
                        onHoverEnd={() => blur(index)}
                        style={{ zIndex: lifted ? 40 : 10 - ring }}
                        className={`absolute w-[72%] ${expanded ? "" : "pointer-events-none"}`}
                    >
                        <MacbookPro src={src} className="size-full h-auto" />
                    </motion.div>
                );
            })}

            <motion.div
                className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none"
                animate={
                    spread && images.length
                        ? {
                              scale:
                                  focused === -1 ? 0.86 + LIFT.scale / 2 : 0.86,
                              y: focused === -1 ? "8%" : "12%",
                          }
                        : { scale: 1, y: 0 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <motion.div
                    className="size-full pointer-events-auto"
                    onHoverStart={() => focus(-1)}
                    onHoverEnd={() => blur(-1)}
                >
                    <MacbookPro src={main} className="size-full" showShadow />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
