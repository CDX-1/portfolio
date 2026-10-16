"use client";

import { IconSchool } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Hover flourishes for each intro row. Every effect is absolutely positioned
// relative to the highlighted phrase it decorates and never takes pointer
// events, so it can spill over neighbouring rows without getting in the way.

export type EffectProps = { show: boolean };

const overlay = "pointer-events-none absolute z-30";

function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
}

/** [1] A student ID card slides up and a grad cap gets tossed. */
export function StudentEffect({ show }: EffectProps) {
    return (
        <AnimatePresence>
            {show && (
                <>
                    <motion.span
                        key="card"
                        aria-hidden
                        className={`${overlay} bottom-full left-[60%] mb-1 block w-36 origin-bottom-left`}
                        initial={{ y: 16, rotate: 0, opacity: 0, scale: 0.85 }}
                        animate={{ y: 0, rotate: -5, opacity: 1, scale: 1 }}
                        exit={{ y: 16, rotate: 0, opacity: 0, scale: 0.85 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <span className="block overflow-hidden rounded-md border border-black/10 bg-white text-[#2a2a2a] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]">
                            <span className="flex items-center justify-between bg-[#1f4e9c] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white">
                                <span>Bur Oak SS</span>
                                <span>Student</span>
                            </span>
                            <span className="flex gap-2 p-2">
                                <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-[#e8edf5] font-mono text-[11px] font-semibold text-[#1f4e9c]">
                                    AS
                                </span>
                                <span className="flex min-w-0 flex-col justify-center gap-0.5 font-mono text-[9px] leading-tight">
                                    <span className="font-semibold">
                                        Awsaf S.
                                    </span>
                                    <span className="text-black/50">
                                        Grade 12
                                    </span>
                                    <span className="text-black/50">
                                        Class of '27
                                    </span>
                                </span>
                            </span>
                            {/* barcode */}
                            <span
                                className="mx-2 mb-2 block h-2.5"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(90deg, #2a2a2a 0 1px, transparent 1px 3px, #2a2a2a 3px 5px, transparent 5px 6px)",
                                }}
                            />
                        </span>
                    </motion.span>
                    <motion.span
                        key="cap"
                        aria-hidden
                        className={`${overlay} left-[15%] top-0 block text-foreground`}
                        initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
                        animate={{
                            y: [0, -64, -40],
                            x: [0, -14, -20],
                            rotate: [0, -200, -350],
                            opacity: [0, 1, 1],
                        }}
                        exit={{
                            opacity: 0,
                            y: -30,
                            transition: { duration: 0.15 },
                        }}
                        transition={{
                            duration: 0.75,
                            ease: "easeOut",
                            times: [0, 0.55, 1],
                        }}
                    >
                        <IconSchool className="size-7" stroke={1.6} />
                    </motion.span>
                </>
            )}
        </AnimatePresence>
    );
}

/** [2] A Figma-style selection box, a collaborator cursor and a size readout. */
export function DesignerEffect({ show }: EffectProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const parent = ref.current?.parentElement;
        if (show && parent) {
            setSize({ w: parent.offsetWidth, h: parent.offsetHeight });
        }
    }, [show]);

    const blue = "#0d99ff";
    const handles = [
        "-left-[3px] -top-[3px]",
        "-right-[3px] -top-[3px]",
        "-left-[3px] -bottom-[3px]",
        "-right-[3px] -bottom-[3px]",
    ];

    return (
        <span ref={ref} aria-hidden>
            <AnimatePresence>
                {show && (
                    <>
                        <motion.span
                            key="box"
                            className={`${overlay} -inset-[3px] block border-[1.5px]`}
                            style={{ borderColor: blue }}
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.04 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                            {handles.map((pos) => (
                                <span
                                    key={pos}
                                    className={`absolute size-[6px] border-[1.5px] bg-white ${pos}`}
                                    style={{ borderColor: blue }}
                                />
                            ))}
                            <motion.span
                                className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-[3px] px-1.5 py-0.5 font-mono text-[9px] leading-none text-white"
                                style={{ backgroundColor: blue }}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                {size.w} × {size.h}
                            </motion.span>
                        </motion.span>
                        <motion.span
                            key="cursor"
                            className={`${overlay} right-0 top-full block`}
                            initial={{ x: 60, y: 40, opacity: 0 }}
                            animate={{ x: -6, y: -6, opacity: 1 }}
                            exit={{ x: 40, y: 30, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 22,
                                delay: 0.05,
                            }}
                        >
                            <svg
                                viewBox="0 0 16 16"
                                className="size-4 drop-shadow-sm"
                            >
                                <title>cursor</title>
                                <path
                                    d="M1 1 L1 13 L4.5 9.8 L7 15 L9 14 L6.6 9 L11.5 9 Z"
                                    fill="#f24e1e"
                                    stroke="white"
                                    strokeWidth="1.2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="ml-3 -mt-0.5 block w-fit whitespace-nowrap rounded-[4px] rounded-tl-none bg-[#f24e1e] px-1.5 py-0.5 font-mono text-[9px] leading-none text-white">
                                awsaf
                            </span>
                        </motion.span>
                    </>
                )}
            </AnimatePresence>
        </span>
    );
}

const MEDALS = [
    { place: "1", fill: "#f2c94c", rim: "#c99a1a", ribbon: "#1f4e9c" },
    { place: "3", fill: "#d6925a", rim: "#a5642f", ribbon: "#c0392b" },
    { place: "3", fill: "#d6925a", rim: "#a5642f", ribbon: "#c0392b" },
    { place: "3", fill: "#d6925a", rim: "#a5642f", ribbon: "#c0392b" },
];

const CONFETTI_COLORS = ["#ec7042", "#f2c94c", "#0d99ff", "#27ae60", "#e84393"];

type Confetto = { x: number; y: number; r: number; color: string; w: number };

/** [3] Medals drop in on ribbons and swing, with a burst of confetti. */
export function MedalsEffect({ show }: EffectProps) {
    const [confetti, setConfetti] = useState<Confetto[]>([]);

    useEffect(() => {
        if (!show) return;
        setConfetti(
            Array.from({ length: 16 }, (_, i) => ({
                x: randomBetween(-90, 90),
                y: randomBetween(-70, -30),
                r: randomBetween(-360, 360),
                color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                w: randomBetween(3, 6),
            })),
        );
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <span key="medals" aria-hidden>
                    <span
                        className={`${overlay} left-3 top-1/2 flex -translate-y-1/2 gap-2`}
                    >
                        {MEDALS.map((m, i) => (
                            <motion.span
                                // biome-ignore lint/suspicious/noArrayIndexKey: fixed list
                                key={i}
                                className="flex origin-top flex-col items-center"
                                initial={{ y: -24, opacity: 0, rotate: 0 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    rotate: [
                                        0,
                                        i % 2 ? 14 : -14,
                                        i % 2 ? -8 : 8,
                                        3,
                                        0,
                                    ],
                                }}
                                exit={{
                                    y: -16,
                                    opacity: 0,
                                    transition: { duration: 0.15 },
                                }}
                                transition={{
                                    y: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 16,
                                        delay: i * 0.06,
                                    },
                                    opacity: {
                                        duration: 0.15,
                                        delay: i * 0.06,
                                    },
                                    rotate: {
                                        duration: 1.4,
                                        delay: 0.15 + i * 0.06,
                                        ease: "easeOut",
                                    },
                                }}
                            >
                                <svg
                                    viewBox="0 0 20 34"
                                    className="h-11 w-6 drop-shadow-md"
                                >
                                    <title>medal</title>
                                    <path
                                        d="M4 0 L10 12 L16 0 Z"
                                        fill={m.ribbon}
                                    />
                                    <path
                                        d="M6 0 L10 8 L14 0 Z"
                                        fill="white"
                                        opacity="0.25"
                                    />
                                    <circle
                                        cx="10"
                                        cy="22"
                                        r="8.5"
                                        fill={m.fill}
                                        stroke={m.rim}
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="10"
                                        y="25.5"
                                        textAnchor="middle"
                                        fontSize="9"
                                        fontFamily="monospace"
                                        fontWeight="700"
                                        fill={m.rim}
                                    >
                                        {m.place}
                                    </text>
                                </svg>
                            </motion.span>
                        ))}
                    </span>
                    <span className={`${overlay} left-14 top-1/2`}>
                        {confetti.map((c, i) => (
                            <motion.span
                                // biome-ignore lint/suspicious/noArrayIndexKey: positional particles
                                key={i}
                                className="absolute block rounded-[1px]"
                                style={{
                                    width: c.w,
                                    height: c.w * 1.8,
                                    backgroundColor: c.color,
                                }}
                                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                                animate={{
                                    x: [0, c.x, c.x * 1.15],
                                    y: [0, c.y, c.y + 70],
                                    rotate: c.r,
                                    opacity: [1, 1, 0],
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: ["easeOut", "easeIn"],
                                    times: [0, 0.4, 1],
                                }}
                            />
                        ))}
                    </span>
                </span>
            )}
        </AnimatePresence>
    );
}

// Traces run from the end of the line out to the chip on the right.
const TRACES: [number, number][][] = [
    [
        [0, 18],
        [24, 18],
        [28, 14],
        [74, 14],
    ],
    [
        [0, 24],
        [30, 24],
        [34, 20],
        [74, 20],
    ],
    [
        [0, 30],
        [36, 30],
        [40, 26],
        [74, 26],
    ],
];

function tracePath(points: [number, number][]) {
    return points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
}

// Keyframe times proportional to distance so the pulse moves at a steady speed.
function traceTimes(points: [number, number][]) {
    const lengths = points.map((p, i) =>
        i
            ? Math.abs(p[0] - points[i - 1][0]) +
              Math.abs(p[1] - points[i - 1][1])
            : 0,
    );
    const total = lengths.reduce((a, b) => a + b, 0);
    let acc = 0;
    return lengths.map((l) => {
        acc += l;
        return acc / total;
    });
}

/** [4] Circuit traces draw out of the phrase into a chip with a blinking LED. */
export function CircuitEffect({ show }: EffectProps) {
    const green = "#27ae60";
    return (
        <AnimatePresence>
            {show && (
                <motion.svg
                    key="circuit"
                    aria-hidden
                    viewBox="0 0 120 48"
                    className={`${overlay} left-2 top-1/2 h-12 w-[120px] -translate-y-1/2 overflow-visible`}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                    <title>circuit</title>
                    {TRACES.map((points, i) => {
                        const d = tracePath(points);
                        return (
                            <g key={d}>
                                <motion.path
                                    d={d}
                                    fill="none"
                                    stroke={green}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 0.45,
                                        delay: i * 0.08,
                                        ease: "easeInOut",
                                    }}
                                />
                                {/* signal pulse travelling the trace */}
                                <motion.circle
                                    r="2"
                                    fill={green}
                                    cx={points[0][0]}
                                    cy={points[0][1]}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        cx: points.map((p) => p[0]),
                                        cy: points.map((p) => p[1]),
                                        opacity: [0, 1, 1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.55 + i * 0.15,
                                        repeat: Infinity,
                                        repeatDelay: 0.4,
                                        ease: "linear",
                                        times: traceTimes(points),
                                    }}
                                />
                            </g>
                        );
                    })}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.4,
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                        }}
                        style={{ transformOrigin: "95px 20px" }}
                    >
                        {[8, 14, 20, 26, 32].map((y) => (
                            <g key={y}>
                                <rect
                                    x="71"
                                    y={y - 1}
                                    width="4"
                                    height="2"
                                    fill="#9aa0a6"
                                />
                                <rect
                                    x="115"
                                    y={y - 1}
                                    width="4"
                                    height="2"
                                    fill="#9aa0a6"
                                />
                            </g>
                        ))}
                        <rect
                            x="75"
                            y="2"
                            width="40"
                            height="36"
                            rx="3"
                            fill="#1d1f22"
                        />
                        <circle cx="80" cy="7" r="1.5" fill="#3a3d42" />
                        <text
                            x="95"
                            y="23"
                            textAnchor="middle"
                            fontSize="7"
                            fontFamily="monospace"
                            fill="#cfd3d8"
                        >
                            CE-27
                        </text>
                        <motion.circle
                            cx="110"
                            cy="33"
                            r="2"
                            fill={green}
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                        />
                    </motion.g>
                </motion.svg>
            )}
        </AnimatePresence>
    );
}

type Leaf = {
    x: number;
    drift: number;
    delay: number;
    size: number;
    spin: number;
};

/** [5] The CN Tower rises from behind the phrase while maple leaves fall. */
export function TorontoEffect({ show }: EffectProps) {
    const [leaves, setLeaves] = useState<Leaf[]>([]);

    useEffect(() => {
        if (!show) return;
        setLeaves(
            Array.from({ length: 4 }, (_, i) => ({
                x: randomBetween(-10, 80),
                drift: randomBetween(-24, 24),
                delay: 0.2 + i * 0.18,
                size: randomBetween(11, 16),
                spin: randomBetween(-200, 200),
            })),
        );
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <span key="toronto" aria-hidden>
                    {/* clipped at the baseline so the tower emerges from the text */}
                    <span
                        className={`${overlay} bottom-[0.1em] left-3 block h-[76px] w-8 overflow-hidden`}
                    >
                        <motion.svg
                            viewBox="0 0 40 96"
                            className="absolute bottom-0 h-[76px] w-8 text-foreground"
                            initial={{ y: 76 }}
                            animate={{ y: 0 }}
                            exit={{ y: 76, transition: { duration: 0.2 } }}
                            transition={{
                                type: "spring",
                                stiffness: 140,
                                damping: 18,
                            }}
                        >
                            <title>CN Tower</title>
                            <path
                                d="M19.4 2 H20.6 V22 H19.4 Z"
                                fill="currentColor"
                            />
                            <path
                                d="M18 22 H22 L23 44 H17 Z"
                                fill="currentColor"
                            />
                            <ellipse
                                cx="20"
                                cy="47"
                                rx="8"
                                ry="4"
                                fill="currentColor"
                            />
                            <path
                                d="M16.5 50 H23.5 L27 96 H13 Z"
                                fill="currentColor"
                            />
                            <motion.circle
                                cx="20"
                                cy="2"
                                r="1.8"
                                fill="#e74c3c"
                                animate={{ opacity: [1, 0.15, 1] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: 0.5,
                                }}
                            />
                        </motion.svg>
                    </span>
                    <span
                        className={`${overlay} bottom-full left-0 mb-12 block`}
                    >
                        {leaves.map((leaf, i) => (
                            <motion.span
                                // biome-ignore lint/suspicious/noArrayIndexKey: positional particles
                                key={i}
                                className="absolute block text-[#d64531]"
                                style={{ left: leaf.x, fontSize: leaf.size }}
                                initial={{
                                    y: -10,
                                    x: 0,
                                    rotate: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: [-10, 30, 70],
                                    x: [0, leaf.drift, -leaf.drift / 2],
                                    rotate: leaf.spin,
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1.8,
                                    delay: leaf.delay,
                                    repeat: Infinity,
                                    repeatDelay: 0.6,
                                    ease: "easeInOut",
                                }}
                            >
                                <MapleLeaf />
                            </motion.span>
                        ))}
                    </span>
                </span>
            )}
        </AnimatePresence>
    );
}

function MapleLeaf() {
    return (
        <svg viewBox="0 0 24 24" className="size-[1em]" fill="currentColor">
            <title>maple leaf</title>
            <path d="M12 1 L13.6 5.4 L15.8 4.4 L15.2 9.2 L18.6 6.8 L19.4 8.8 L22.6 8.2 L21.2 11.4 L22.8 12.4 L17.6 16.2 L18.4 18.4 L12.8 17.6 L13 23 H11 L11.2 17.6 L5.6 18.4 L6.4 16.2 L1.2 12.4 L2.8 11.4 L1.4 8.2 L4.6 8.8 L5.4 6.8 L8.8 9.2 L8.2 4.4 L10.4 5.4 Z" />
        </svg>
    );
}
