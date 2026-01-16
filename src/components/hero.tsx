"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useScroll, useTransform } from "motion/react";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa";

export function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const springConfig = { damping: 25, stiffness: 150 };
    const blob1X = useSpring(0, springConfig);
    const blob1Y = useSpring(0, springConfig);
    const blob2X = useSpring(0, springConfig);
    const blob2Y = useSpring(0, springConfig);
    const blob3X = useSpring(0, springConfig);
    const blob3Y = useSpring(0, springConfig);

    useEffect(() => {
        const handlePointer = (clientX: number, clientY: number) => {
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            setMousePosition({ x, y });

            const smallScreen = innerWidth < 640;
            const amp1 = smallScreen ? 120 : 250;
            const amp2 = smallScreen ? -90 : -200;
            const amp3 = smallScreen ? 80 : 150;
            const ampY1 = smallScreen ? 80 : 180;
            const ampY2 = smallScreen ? 120 : 250;
            const ampY3 = smallScreen ? -90 : -200;

            blob1X.set(x * amp1);
            blob1Y.set(y * ampY1);
            blob2X.set(x * amp2);
            blob2Y.set(y * ampY2);
            blob3X.set(x * amp3);
            blob3Y.set(y * ampY3);
        };

        const mouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
        const touchMove = (e: TouchEvent) => {
            if (e.touches && e.touches.length) {
                const t = e.touches[0];
                handlePointer(t.clientX, t.clientY);
            }
        };

        window.addEventListener("mousemove", mouseMove, { passive: true });
        window.addEventListener("touchmove", touchMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchmove", touchMove);
        };
    }, [blob1X, blob1Y, blob2X, blob2Y, blob3X, blob3Y]);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 220]);

    return (
        <div className="bg-black">
            <div className="min-h-screen relative overflow-hidden bg-background rounded-b-4xl">
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ filter: "blur(80px)", willChange: "transform" }}
                    aria-hidden
                >
                    <motion.div
                        className="absolute -top-24 -left-12 rounded-full"
                        style={{
                            x: blob1X,
                            y: blob1Y,
                            width: "min(60vw,1000px)",
                            height: "min(60vw,1000px)",
                            background:
                                "radial-gradient(circle, rgba(147, 197, 253, 0.55) 0%, transparent 60%)",
                        }}
                    />

                    <motion.div
                        className="absolute top-1/4 -right-12 rounded-full"
                        style={{
                            x: blob2X,
                            y: blob2Y,
                            width: "min(55vw,900px)",
                            height: "min(55vw,900px)",
                            background:
                                "radial-gradient(circle, rgba(196, 181, 253, 0.47) 0%, transparent 60%)",
                        }}
                    />

                    <motion.div
                        className="absolute -bottom-20 left-1/4 rounded-full"
                        style={{
                            x: blob3X,
                            y: blob3Y,
                            width: "min(50vw,800px)",
                            height: "min(50vw,800px)",
                            background:
                                "radial-gradient(circle, rgba(253, 186, 116, 0.42) 0%, transparent 60%)",
                        }}
                    />
                </div>

                <div className="absolute inset-0 flex pointer-events-none">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 border-r border-foreground/6 last:border-r-0 ${i % 2 === 0 ? "opacity-70" : "opacity-40"} sm:block hidden`}
                        />
                    ))}
                </div>

                <motion.div style={{ y }} className="relative min-h-screen z-10 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-8 left-4 md:top-12 md:left-12"
                    >
                        <p
                            className="font-bold font-foss leading-[0.85] tracking-tighter text-foreground drop-shadow-xl whitespace-normal"
                            style={{ fontSize: "clamp(2.4rem, 12vw, 7.5rem)", maxWidth: "12ch", marginLeft: "0.4em", textIndent: "-0.4em" }}
                        >
                            full stack developer
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="
                            absolute
                            inset-x-4 bottom-6
                            sm:inset-x-auto sm:right-6 sm:bottom-8
                            md:right-12 md:bottom-12
                            text-center sm:text-right
                            flex flex-col items-center sm:items-end
                            gap-2
                        "
                    >
                        <h1
                            className="
                                font-bold font-foss
                                leading-[0.85]
                                tracking-tighter
                                text-foreground
                                drop-shadow-xl
                            "
                            style={{
                                fontSize: "clamp(2.6rem, 12vw, 9.5rem)",
                            }}
                        >
                            awsaf
                        </h1>

                        <div
                            className="
                            flex flex-wrap
                            items-center justify-center sm:justify-end
                            gap-x-2 gap-y-1
                            text-[11px] sm:text-xs md:text-sm
                            text-foreground/50
                            font-mono
                            drop-shadow-lg
                            max-w-[90vw] sm:max-w-none
                        ">
                            <span className="tracking-wider whitespace-nowrap">16 years old</span>

                            <FaSquare className="text-foreground/70 hidden sm:block" size={8} />

                            <span className="tracking-wider whitespace-nowrap">
                                based in ontario, canada
                            </span>

                            <FaCanadianMapleLeaf
                                className="text-red-500/70"
                                size={14}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="
                            absolute
                            left-1/2 -translate-x-1/2
                            bottom-24 sm:bottom-6
                            flex flex-col items-center gap-2
                            sm:gap-4
                        "
                        aria-hidden
                    >
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-mono">
                            Scroll
                        </span>

                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 36 }}
                            transition={{
                                duration: 1.5,
                                delay: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="w-px bg-linear-to-b from-foreground/20 to-transparent"
                        />
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
