'use client';

import Image from "next/image";
import {
    motion,
    useMotionValue,
    useSpring,
    useReducedMotion,
} from "motion/react";
import { useRef, useState, useEffect } from "react";

interface ProjectSummaryProps {
    title: string;
    description: string;
    tags: string[];
    author: string;
    date: string;
    image?: string;
    location?: string;
    github?: string;
}

export const ProjectSummary = ({
    title,
    description,
    author,
    date,
    image,
}: ProjectSummaryProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const [isHovered, setIsHovered] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsTouch(window.matchMedia("(pointer: coarse)").matches);
        }
    }, []);

    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const rotate = useMotionValue(0);

    const springConfig = prefersReducedMotion
        ? { damping: 100, stiffness: 1000 }
        : { damping: 18, stiffness: 220, mass: 0.6 };

    const springX = useSpring(targetX, springConfig);
    const springY = useSpring(targetY, springConfig);
    const springRotate = useSpring(rotate, {
        damping: 20,
        stiffness: 200,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isTouch) return;

        const rect = ref.current.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;

        const padding = 16;
        const clampedX = Math.min(Math.max(px, padding), rect.width - padding);
        const clampedY = Math.min(Math.max(py, padding), rect.height - padding);

        targetX.set(clampedX);
        targetY.set(clampedY);

        const centerX = rect.width / 2;
        rotate.set((clampedX - centerX) * 0.04);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex flex-col gap-4 rounded-2xl p-4 overflow-hidden
                       transition-colors hover:bg-muted/20 hover:cursor-none"
        >
            {!isTouch && (
                <motion.div
                    className="absolute pointer-events-none z-50
                               bg-foreground text-background
                               px-3 py-2 rounded-full
                               text-sm font-bold font-foss
                               tracking-wider uppercase
                               mix-blend-difference"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                        isHovered
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.6 }
                    }
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                        left: springX,
                        top: springY,
                        rotate: springRotate,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                >
                    View
                </motion.div>
            )}

            {image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={`/projects/assets/${image}`}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold font-foss leading-tight">
                        {title}
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-wide">
                        <span>{date}</span>
                        <span>•</span>
                        <span>{author}</span>
                    </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
};
