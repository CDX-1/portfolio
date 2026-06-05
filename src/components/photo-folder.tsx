'use client';

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useRef } from "react";
import MessageBubble from "./message-bubble";

export type FolderColor = "blue" | "red" | "green" | "yellow" | "purple";

interface PhotoFolderProps {
    className?: string;
    color?: FolderColor;
    images?: string[];
}

const COLOR_MAP = {
    blue: { backTop: "#4ca0e6", backBottom: "#3184cb", frontTop: "#8cc2f2", frontMid: "#66ace8", frontBottom: "#3d8fdb", shadow: "#1a456b", lines: "#3179b8" },
    red: { backTop: "#f87171", backBottom: "#ef4444", frontTop: "#fca5a5", frontMid: "#f87171", frontBottom: "#dc2626", shadow: "#7f1d1d", lines: "#b91c1c" },
    green: { backTop: "#4ade80", backBottom: "#22c55e", frontTop: "#86efac", frontMid: "#4ade80", frontBottom: "#16a34a", shadow: "#14532d", lines: "#15803d" },
    yellow: { backTop: "#facc15", backBottom: "#eab308", frontTop: "#fde047", frontMid: "#facc15", frontBottom: "#ca8a04", shadow: "#713f12", lines: "#a16207" },
    purple: { backTop: "#c084fc", backBottom: "#a855f7", frontTop: "#d8b4fe", frontMid: "#c084fc", frontBottom: "#9333ea", shadow: "#581c87", lines: "#7e22ce" }
};

const imageVariants = {
    rest: (custom: { index: number; total: number }) => ({
        rotate: (custom.index - (custom.total - 1) / 2) * 8,
        y: 0,
        x: (custom.index - (custom.total - 1) / 2) * 5,
    }),
    hover: (custom: { index: number; total: number }) => ({
        rotate: (custom.index - (custom.total - 1) / 2) * 16,
        y: -50,
        x: (custom.index - (custom.total - 1) / 2) * 15,
    })
};

export default function PhotoFolder({ className, color = "blue", images = [] }: PhotoFolderProps) {
    const theme = COLOR_MAP[color] || COLOR_MAP.blue;
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className={cn("relative w-[280px] h-[220px] select-none flex items-center justify-center", className)}
                initial="rest"
                animate={isHovered ? "hover" : "rest"}
                whileTap="tap"
                variants={{
                    rest: { rotate: 0, scale: 1, y: 0 },
                    hover: { rotate: 4, scale: 1.1, y: -8, cursor: "pointer" },
                    tap: { rotate: 2, scale: 1.05, y: -4, transition: { duration: 0.08, ease: "easeOut" } }
                }}
                transition={{ duration: 0.3, ease: "anticipate" }}
            >
                <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
                    <defs>
                        <linearGradient id={`ios-folder-back-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={theme.backTop} />
                            <stop offset="100%" stopColor={theme.backBottom} />
                        </linearGradient>
                        <linearGradient id={`ios-folder-front-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={theme.frontTop} />
                            <stop offset="15%" stopColor={theme.frontMid} />
                            <stop offset="100%" stopColor={theme.frontBottom} />
                        </linearGradient>
                        <linearGradient id="flap-top-edge" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                        </linearGradient>
                        <filter id={`inner-shadow-${color}`} x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={theme.shadow} floodOpacity="0.3" />
                        </filter>
                    </defs>
                    <path d="M 16 45 C 16 28, 28 20, 44 20 L 85 20 C 105 20, 112 28, 126 38 L 134 44 C 142 50, 150 52, 162 52 L 244 52 C 258 52, 264 60, 264 74 L 264 176 C 264 194, 250 204, 232 204 L 48 204 C 30 204, 16 194, 16 176 Z" fill={`url(#ios-folder-back-${color})`} />
                </svg>

                <div className="absolute top-[10%] bottom-[45px] left-0 right-0 flex items-end justify-center z-10 pointer-events-auto">
                    {images.map((path, i) => (
                        <motion.div
                            key={`${path}-${i}`}
                            custom={{ index: i, total: images.length }}
                            variants={imageVariants}
                            className="absolute bottom-0 origin-bottom"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <PictureItem path={path} theme={theme} />
                        </motion.div>
                    ))}
                </div>

                <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                    <path d="M 22 102 C 22 90, 32 82, 46 82 L 234 82 C 248 82, 258 90, 258 102 L 258 174 C 258 190, 246 200, 230 200 L 50 200 C 34 200, 22 190, 22 174 Z" fill="#1e466b" opacity="0.2" filter={`url(#inner-shadow-${color})`} />
                    <path d="M 22 100 C 22 88, 32 80, 46 80 L 234 80 C 248 80, 258 88, 258 100 L 258 172 C 258 188, 246 198, 230 198 L 50 198 C 34 198, 22 188, 22 172 Z" fill={`url(#ios-folder-front-${color})`} />
                    <path d="M 22 100 C 22 88, 32 80, 46 80 L 234 80 C 248 80, 258 88, 258 100" stroke="url(#flap-top-edge)" strokeWidth="1.25" strokeLinecap="round" fill="none" />
                    <line x1="48" y1="180" x2="232" y2="180" stroke={theme.lines} strokeWidth="1" opacity="0.35" />
                    <line x1="58" y1="184" x2="222" y2="184" stroke={theme.lines} strokeWidth="1" opacity="0.15" />
                </svg>
            </motion.div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.1 }}
                        className="absolute z-30 pointer-events-none will-change-transform whitespace-nowrap max-w-none"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y,
                            x: "-89%",
                            y: "-100%"
                        }}
                    >
                        <MessageBubble text="View article" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function PictureItem({ path, theme }: { path: string, theme: typeof COLOR_MAP.blue }) {
    return (
        <div
            className="group relative w-28 h-32 sm:w-32 sm:h-40 rounded-sm p-1.5 shadow-xl transition-all duration-300"
            style={{ backgroundColor: theme.frontTop }}
        >
            <div className="relative w-full h-full overflow-hidden border border-black/10 bg-stone-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                <Image
                    src={path}
                    fill
                    alt="Folder Image"
                    className="object-contain p-1 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 150px, 200px"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
        </div>
    );
}