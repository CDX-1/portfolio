'use client';

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useState, useRef } from "react";

export type FolderColor = "azure" | "navy" | "sky" | "slate" | "indigo";

interface PhotoFolderProps {
    className?: string;
    color?: FolderColor;
    images?: string[];
}

const COLOR_MAP = {
    azure: { backTop: "#4ca0e6", backBottom: "#3184cb", frontTop: "#8cc2f2", frontMid: "#66ace8", frontBottom: "#3d8fdb", shadow: "#1a456b", lines: "#3179b8" },
    navy: { backTop: "#2563eb", backBottom: "#1e40af", frontTop: "#60a5fa", frontMid: "#3b82f6", frontBottom: "#1d4ed8", shadow: "#172554", lines: "#1e3a8a" },
    sky: { backTop: "#7dd3fc", backBottom: "#0ea5e9", frontTop: "#e0f2fe", frontMid: "#bae6fd", frontBottom: "#38bdf8", shadow: "#0369a1", lines: "#0284c7" },
    slate: { backTop: "#64748b", backBottom: "#334155", frontTop: "#cbd5e1", frontMid: "#94a3b8", frontBottom: "#475569", shadow: "#0f172a", lines: "#1e293b" },
    indigo: { backTop: "#818cf8", backBottom: "#4f46e5", frontTop: "#c7d2fe", frontMid: "#a5b4fc", frontBottom: "#6366f1", shadow: "#312e81", lines: "#4338ca" }
};

const flapVariants = {
    rest: { 
        rotateX: 0, 
        y: 0, 
        skewX: 0, 
        scaleY: 1, 
        originX: 0.5, 
        originY: 1,
        transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] }
    },
    hover: { 
        rotateX: -32,
        y: 10,
        skewX: 1,
        scaleY: 0.98,
        originX: 0.5, 
        originY: 1,
        transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] } 
    }
};

const interiorVariants = {
    rest: {
        d: "M 22 102 C 22 90, 32 82, 46 82 L 234 82 C 248 82, 258 90, 258 102 L 258 174 C 258 190, 246 200, 230 200 L 50 200 C 34 200, 22 190, 22 174 Z",
        opacity: 0.2,
        transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] }
    },
    hover: {
        d: "M 16 102 C 16 90, 26 82, 40 82 L 240 82 C 254 82, 264 90, 264 102 L 264 176 C 264 194, 250 204, 232 204 L 48 204 C 30 204, 16 194, 16 176 Z",
        opacity: 0.4,
        transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] }
    }
};

const imageVariants = {
    rest: (custom: { index: number; total: number }) => ({
        rotate: (custom.index - (custom.total - 1) / 2) * 8,
        y: 0,
        x: (custom.index - (custom.total - 1) / 2) * 5,
        z: 0
    }),
    hover: (custom: { index: number; total: number }) => ({
        rotate: (custom.index - (custom.total - 1) / 2) * 16,
        y: -70,
        x: (custom.index - (custom.total - 1) / 2) * 15,
        z: 100
    })
};

export default function PhotoFolder({ className, color = "azure", images = [] }: PhotoFolderProps) {
    const theme = COLOR_MAP[color] || COLOR_MAP.azure;
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
                style={{ perspective: "1500px" }} 
                variants={{
                    rest: { rotate: 0, scale: 1, y: 0, z: 0 },
                    hover: { rotate: 2, scale: 1.1, y: -12, z: 20, cursor: "pointer" }, 
                    tap: { rotate: 1, scale: 1.05, y: -6, z: 10, transition: { duration: 0.08, ease: "easeOut" } }
                }}
                transition={{ duration: 0.35, ease: "anticipate" }}
            >
                <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
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
                            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={theme.shadow} floodOpacity="0.35" />
                        </filter>
                    </defs>
                    <path d="M 16 45 C 16 28, 28 20, 44 20 L 85 20 C 105 20, 112 28, 126 38 L 134 44 C 142 50, 150 52, 162 52 L 244 52 C 258 52, 264 60, 264 74 L 264 176 C 264 194, 250 204, 232 204 L 48 204 C 30 204, 16 194, 16 176 Z" fill={`url(#ios-folder-back-${color})`} />
                </svg>

                <motion.div 
                    className="absolute top-[10%] bottom-[45px] left-0 right-0 flex items-end justify-center pointer-events-auto"
                    variants={{
                        rest: { zIndex: 10, transition: { delay: 0.35 } },
                        hover: { zIndex: 30, transition: { delay: 0 } }
                    }}
                >
                    {images.map((path, i) => (
                        <motion.div
                            key={`${path}-${i}`}
                            custom={{ index: i, total: images.length }}
                            variants={imageVariants}
                            className="absolute bottom-0 origin-bottom"
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <PictureItem path={path} theme={theme} />
                        </motion.div>
                    ))}
                </motion.div>

                <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                    <motion.path 
                        variants={interiorVariants}
                        fill="#1e466b" 
                        filter={`url(#inner-shadow-${color})`} 
                    />
                    
                    <motion.g variants={flapVariants} style={{ transformBox: "fill-box" }}>
                        <path d="M 22 100 C 22 88, 32 80, 46 80 L 234 80 C 248 80, 258 88, 258 100 L 258 172 C 258 188, 246 198, 230 198 L 50 198 C 34 198, 22 188, 22 172 Z" fill={`url(#ios-folder-front-${color})`} />
                        <path d="M 22 100 C 22 88, 32 80, 46 80 L 234 80 C 248 80, 258 88, 258 100" stroke="url(#flap-top-edge)" strokeWidth="1.25" strokeLinecap="round" fill="none" />
                        <line x1="48" y1="180" x2="232" y2="180" stroke={theme.lines} strokeWidth="1" opacity="0.35" />
                        <line x1="58" y1="184" x2="222" y2="184" stroke={theme.lines} strokeWidth="1" opacity="0.15" />
                    </motion.g>
                </svg>
            </motion.div>
        </div>
    );
}

function PictureItem({ path, theme }: { path: string, theme: typeof COLOR_MAP.azure }) {
    return (
        <div
            className="group relative w-fit h-fit rounded-sm p-1.5 shadow-xl transition-all duration-300"
            style={{ backgroundColor: theme.frontTop }}
        >
            <div className="relative overflow-hidden border border-black/10 bg-stone-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
                <Image
                    src={path}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 150px, 200px"
                    alt="Folder Image"
                    className="w-auto h-auto min-w-[80px] max-w-[120px] min-h-[100px] max-h-[140px] sm:min-w-[100px] sm:max-w-[140px] sm:min-h-[120px] sm:max-h-[160px] object-contain p-1 transition-transform duration-500 ease-out"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
        </div>
    );
}