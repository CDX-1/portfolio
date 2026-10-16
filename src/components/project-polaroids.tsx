"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { fanMainSlot, fanSlot, LIFT } from "./project-fan";

function Polaroid({
    src,
    alt,
    caption,
    priority,
    className,
}: {
    src: string;
    alt: string;
    caption?: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col bg-[#fbfaf6] p-[5%] pb-0 rounded-[3px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5",
                className,
            )}
        >
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-200">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 768px) 60vw, 25vw"
                />
            </div>
            <div className="flex h-[min(3.25rem,14cqw)] items-center justify-center font-caveat text-[clamp(0.9rem,5cqw,1.5rem)] leading-none text-neutral-700">
                {caption}
            </div>
        </div>
    );
}

/** Hardware projects: a photo on top of a stack that fans out on hover. */
export function ProjectPolaroids({
    className,
    name,
    main,
    images = [],
    expanded = false,
}: {
    className?: string;
    name: string;
    main: string;
    images?: string[];
    /** Keep the photos dealt out; hovering then lifts a single one instead. */
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
            className={cn(
                "relative w-full h-full flex items-center justify-center",
                className,
            )}
        >
            {images.map((src, index) => {
                const { slot, ring } = fanSlot(index, images.length);
                // Resting, the photos peek out from under the top one like a
                // loose stack; on hover they deal out to either side.
                const restRotate = slot * 3;
                const lifted = focused === index;
                const y = ring * ring * 3;

                return (
                    <motion.div
                        key={src}
                        initial={false}
                        animate={
                            spread
                                ? {
                                      x: `${slot * 44}%`,
                                      y: `${lifted ? y - LIFT.y : y}%`,
                                      rotate: lifted ? 0 : slot * 8,
                                      scale:
                                          0.88 -
                                          ring * 0.06 +
                                          (lifted ? LIFT.scale : 0),
                                  }
                                : {
                                      x: `${slot * 2}%`,
                                      y: 0,
                                      rotate: restRotate,
                                      scale: 0.96,
                                  }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 28,
                            delay: spread && !expanded ? (ring - 1) * 0.04 : 0,
                        }}
                        onHoverStart={() => focus(index)}
                        onHoverEnd={() => blur(index)}
                        style={{ zIndex: lifted ? 40 : 10 - ring }}
                        className={cn(
                            "absolute w-[50%] sm:w-[46%] [container-type:inline-size]",
                            !expanded && "pointer-events-none",
                        )}
                    >
                        <Polaroid
                            src={src}
                            alt={`${name} photo ${index + 2}`}
                        />
                    </motion.div>
                );
            })}

            <motion.div
                className="relative z-20 w-[50%] sm:w-[46%] [container-type:inline-size]"
                animate={{
                    x: spread ? `${fanMainSlot(images.length) * 44}%` : 0,
                    rotate: spread ? 0 : -2,
                    scale: focused === -1 ? 1 + LIFT.scale / 2 : 1,
                    y: focused === -1 ? `-${LIFT.y}%` : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                onHoverStart={() => focus(-1)}
                onHoverEnd={() => blur(-1)}
            >
                <Polaroid src={main} alt={name} caption={name} priority />
            </motion.div>
        </motion.div>
    );
}
