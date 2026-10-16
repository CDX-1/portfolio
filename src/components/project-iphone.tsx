"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { IPhone } from "./iphone";
import { fanMainSlot, fanSlot, LIFT } from "./project-fan";

export function ProjectIPhone({
    className,
    main,
    images = [],
    expanded = false,
}: {
    className?: string;
    main: string;
    images?: string[];
    /** Keep the fan open; hovering then lifts a single phone instead. */
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
                const { slot, ring } = fanSlot(index, images.length);
                const lifted = focused === index;
                const y = ring * ring * 2;

                return (
                    <motion.div
                        key={src}
                        initial={false}
                        animate={
                            spread
                                ? {
                                      opacity: 1,
                                      x: `${slot * 52}%`,
                                      y: `${lifted ? y - LIFT.y : y}%`,
                                      rotate: lifted ? 0 : slot * 6,
                                      scale:
                                          0.9 -
                                          ring * 0.06 +
                                          (lifted ? LIFT.scale : 0),
                                  }
                                : {
                                      opacity: 0,
                                      x: 0,
                                      y: 0,
                                      rotate: 0,
                                      scale: 0.85,
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
                        style={{
                            zIndex: lifted ? 40 : 10 - ring,
                            transformOrigin: "50% 90%",
                        }}
                        className={`absolute w-[40%] sm:w-[35%] lg:w-[30%] drop-shadow-xl ${expanded ? "" : "pointer-events-none"}`}
                    >
                        <IPhone src={src} />
                    </motion.div>
                );
            })}

            <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[40%] sm:w-[35%] lg:w-[30%] pointer-events-auto drop-shadow-2xl"
                    animate={{
                        x: spread ? `${fanMainSlot(images.length) * 52}%` : 0,
                        ...(focused === -1
                            ? { scale: 1 + LIFT.scale / 2, y: `-${LIFT.y}%` }
                            : { scale: 1, y: 0 }),
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    onHoverStart={() => focus(-1)}
                    onHoverEnd={() => blur(-1)}
                >
                    <IPhone src={main} />
                </motion.div>
            </div>
        </motion.div>
    );
}
