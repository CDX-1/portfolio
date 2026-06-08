'use client';

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { IPhone } from "./iphone";

export function ProjectIPhone({ className, main, images = [] }: { className?: string; main: string; images?: string[] }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
                scale: 1.03,
                y: -10,
            }}
            whileTap={{
                scale: 0.97,
                y: -2
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative w-full h-full flex items-center justify-center ${className || ""}`}
        >
            {images.map((src, index) => {
                const isLeft = index % 2 === 0;
                const direction = isLeft ? -1 : 1;
                const step = Math.floor(index / 2);

                const targetX = direction * (140 + step * 80);
                const targetY = (isLeft ? -20 : 20) + step * 15 * direction;
                const targetRotate = direction * (12 + step * 10);

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.8,
                            x: isHovered ? targetX : 0,
                            y: isHovered ? targetY : 0,
                            rotate: isHovered ? targetRotate : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 25,
                            delay: index * 0.05,
                        }}
                        className="absolute z-0 flex flex-col bg-white p-2 pb-8 shadow-2xl rounded-sm border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 w-32 h-[282px] pointer-events-none"
                    >
                        <div className="relative w-full h-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
                            <Image
                                src={src}
                                alt={`Project secondary image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </motion.div>
                );
            })}

            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                <IPhone
                    src={main}
                    className="pointer-events-auto drop-shadow-2xl"
                />
            </div>
        </motion.div>
    );
}