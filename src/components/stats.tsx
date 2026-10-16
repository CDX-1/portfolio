"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";

type VizProps = { on: boolean; hovered: boolean; thumbs: string[] };
type Viz = (props: VizProps) => ReactNode;

const STATS: { value: string; label: string; Viz: Viz }[] = [
    { value: "20+", label: "Shipped projects", Viz: ShippedViz },
    { value: "6+", label: "Years of experience", Viz: YearsViz },
    { value: "100%", label: "Self-taught", Viz: SelfTaughtViz },
    { value: "$3K+", label: "Earned via code", Viz: EarnedViz },
];

/** `thumbs` are project cover images, shown as the "shipped" deck. */
export default function Stats({ thumbs }: { thumbs: string[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });
    const reduced = useReducedMotion();
    const on = inView || !!reduced;

    return (
        <section className="my-14 sm:my-20">
            <div
                ref={ref}
                className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-10"
            >
                {STATS.map((s) => (
                    <StatItem key={s.label} stat={s} on={on} thumbs={thumbs} />
                ))}
            </div>
        </section>
    );
}

function StatItem({
    stat,
    on,
    thumbs,
}: {
    stat: (typeof STATS)[number];
    on: boolean;
    thumbs: string[];
}) {
    const [hovered, setHovered] = useState(false);
    const { Viz } = stat;

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <div className="flex h-14 items-end" aria-hidden>
                <Viz on={on} hovered={hovered} thumbs={thumbs} />
            </div>
            <div className="mt-4 border-t border-dashed border-foreground/15 pt-3">
                <h3 className="font-heading font-semibold text-3xl sm:text-4xl tracking-tighter tabular-nums">
                    {stat.value}
                </h3>
                <h4 className="mt-1 text-sm sm:text-base text-foreground/55">
                    {stat.label}
                </h4>
            </div>
        </motion.div>
    );
}

/** Real project covers dealt out into a fanned deck; hovering spreads it. */
function ShippedViz({ on, hovered, thumbs }: VizProps) {
    const cards = thumbs.slice(0, 6);
    const mid = (cards.length - 1) / 2;
    return (
        <div className="relative h-[46px] w-[170px] max-w-full">
            {cards.map((src, i) => {
                const offset = i - mid;
                return (
                    <motion.div
                        key={src}
                        className="absolute bottom-0 left-1/2 h-[38px] w-[52px] origin-bottom overflow-hidden rounded-[3px] border-2 border-background bg-muted shadow-[0_3px_8px_-3px_rgba(0,0,0,0.35)]"
                        style={{ marginLeft: -26, zIndex: i }}
                        initial={{ x: -60, y: 10, rotate: -20, opacity: 0 }}
                        animate={
                            on
                                ? {
                                      x: offset * (hovered ? 17 : 11),
                                      y:
                                          Math.abs(offset) *
                                          (hovered ? 2.5 : 1.5),
                                      rotate: offset * (hovered ? 9 : 5),
                                      opacity: 1,
                                  }
                                : { x: -60, y: 10, rotate: -20, opacity: 0 }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 26,
                            delay: hovered ? 0 : 0.25 + i * 0.09,
                        }}
                    >
                        <Image
                            src={src}
                            alt=""
                            fill
                            sizes="52px"
                            className="object-cover object-top"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}

const FIRST_YEAR = 2020;
const LAST_YEAR = 2026;

/** A tear-off desk calendar that flips through each year of experience. */
function YearsViz({ on, hovered }: VizProps) {
    const reduced = useReducedMotion();
    const [year, setYear] = useState(FIRST_YEAR);
    // Pages mid-flip; each removes itself once it has fallen away.
    const [torn, setTorn] = useState<{ id: number; year: number }[]>([]);
    const nextId = useRef(0);

    // Each play (first view, then every hover) flips from the first year up.
    const [run, setRun] = useState(0);
    useEffect(() => {
        if (hovered) setRun((r) => r + 1);
    }, [hovered]);

    useEffect(() => {
        if (!on) return;
        if (reduced) {
            setYear(LAST_YEAR);
            return;
        }
        setYear(FIRST_YEAR);
        const step = run === 0 ? 260 : 140;
        const start = run === 0 ? 400 : 0;
        const timers: number[] = [];
        for (let y = FIRST_YEAR; y < LAST_YEAR; y++) {
            timers.push(
                window.setTimeout(
                    () => {
                        const id = nextId.current++;
                        setTorn((pages) => [...pages, { id, year: y }]);
                        setYear(y + 1);
                    },
                    start + (y - FIRST_YEAR + 1) * step,
                ),
            );
        }
        return () => timers.forEach(clearTimeout);
    }, [on, run, reduced]);

    const isNow = year === LAST_YEAR;

    return (
        <div className="relative h-11 w-full max-w-[140px] [perspective:400px]">
            {/* binding rings */}
            <div className="absolute -top-[3px] inset-x-4 z-20 flex justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span
                        key={i}
                        className="h-2 w-1 rounded-full bg-foreground/55"
                    />
                ))}
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-[4px] border border-border bg-background shadow-[0_4px_10px_-6px_rgba(0,0,0,0.3)]">
                <CalendarPage year={year} isNow={isNow} />
            </div>
            {torn.map((page) => (
                <motion.div
                    key={page.id}
                    className="absolute inset-0 z-10 origin-top overflow-hidden rounded-[4px] border border-border bg-background"
                    initial={{ rotateX: 0, opacity: 1 }}
                    animate={{ rotateX: -110, opacity: [1, 1, 0] }}
                    transition={{
                        duration: 0.4,
                        ease: "easeIn",
                        opacity: { duration: 0.4, times: [0, 0.7, 1] },
                    }}
                    onAnimationComplete={() =>
                        setTorn((pages) =>
                            pages.filter((p) => p.id !== page.id),
                        )
                    }
                >
                    <CalendarPage year={page.year} isNow={false} />
                </motion.div>
            ))}
        </div>
    );
}

function CalendarPage({ year, isNow }: { year: number; isNow: boolean }) {
    const nth = year - FIRST_YEAR + 1;
    return (
        <div className="flex h-full flex-col">
            <div className="h-2.5 shrink-0 bg-primary" />
            <div className="flex flex-1 items-center justify-between px-2.5 leading-none">
                <span className="font-mono text-base font-semibold tabular-nums tracking-tight">
                    {year}
                </span>
                <span
                    className={`font-mono text-[9px] uppercase tracking-wider ${isNow ? "text-primary" : "text-foreground/40"}`}
                >
                    {isNow ? "now" : `yr ${String(nth).padStart(2, "0")}`}
                </span>
            </div>
        </div>
    );
}

const QUERIES = [
    "how to center a div",
    "what is a pointer",
    "java vs javascript",
    "merge sort time complexity",
    "how to play modded minecraft",
    "how to make a discord bot",
    "why is javascript so weird",
    "how to make a voltage divider",
    "how to learn assembly in 30 mins",
    "how to make chatgpt at home",
    "what does this error mean",
];

/** A search bar typing out the questions every self-taught dev has googled. */
function SelfTaughtViz({ on, hovered }: VizProps) {
    const reduced = useReducedMotion();
    const [text, setText] = useState("");
    const [queryIdx, setQueryIdx] = useState(0);
    // Start somewhere random so returning visitors see something new.
    useEffect(() => {
        setQueryIdx(Math.floor(Math.random() * QUERIES.length));
    }, []);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!on) return;
        const query = QUERIES[queryIdx];
        if (reduced) {
            setText(query);
            return;
        }
        let cancelled = false;
        const timers: number[] = [];
        const at = (ms: number, fn: () => void) =>
            timers.push(window.setTimeout(() => !cancelled && fn(), ms));

        // type, "press enter", pause, then erase and move on
        let t = 600;
        for (let i = 1; i <= query.length; i++) {
            at(t, () => setText(query.slice(0, i)));
            t += 45 + Math.random() * 40;
        }
        at(t + 250, () => setSubmitted(true));
        at(t + 650, () => setSubmitted(false));
        t += 1900;
        for (let i = query.length - 1; i >= 0; i--) {
            at(t, () => setText(query.slice(0, i)));
            t += 18;
        }
        at(t + 150, () => setQueryIdx((q) => (q + 1) % QUERIES.length));

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [on, queryIdx, reduced]);

    return (
        <motion.div
            className="flex h-7 w-full max-w-[220px] items-center gap-1.5 rounded-full border border-border bg-background px-2.5 shadow-[0_2px_8px_-6px_rgba(0,0,0,0.3)]"
            animate={{
                scale: submitted ? 0.97 : 1,
                borderColor:
                    hovered || submitted ? "var(--primary)" : "var(--border)",
            }}
            transition={{ duration: 0.15 }}
        >
            <svg
                viewBox="0 0 16 16"
                className="size-3 shrink-0 text-foreground/40"
            >
                <title>search</title>
                <circle
                    cx="7"
                    cy="7"
                    r="4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <path
                    d="M10.5 10.5 L14 14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
            <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-foreground/70">
                {text}
                <span className="ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] animate-pulse bg-foreground/60" />
            </span>
            <motion.span
                className="shrink-0 font-mono text-[10px] text-primary"
                animate={{ opacity: submitted ? 1 : 0, x: submitted ? 0 : -4 }}
            >
                ↵
            </motion.span>
        </motion.div>
    );
}

// A loose pile of bills, bottom to top.
const BILLS = [
    { x: 0, y: 0, rotate: -6 },
    { x: 6, y: -5, rotate: 4 },
    { x: 2, y: -10, rotate: -2 },
];

function Bill() {
    return (
        <div className="relative h-[30px] w-[62px] rounded-[3px] border border-[#b4501f]/70 bg-[#f6b48c] p-[3px] shadow-[0_2px_5px_-2px_rgba(0,0,0,0.3)]">
            <div className="flex h-full items-center justify-center rounded-[2px] border border-[#b4501f]/40">
                <span className="grid size-[16px] place-items-center rounded-full border border-[#b4501f]/50 bg-[#fbd2b8] font-mono text-[10px] font-bold leading-none text-[#9a4319]">
                    $
                </span>
            </div>
        </div>
    );
}

function Coin() {
    return (
        <div className="grid size-[24px] place-items-center rounded-full border-[1.5px] border-[#b4501f] bg-gradient-to-br from-[#ffc29e] to-[#e2622f] shadow-[0_2px_5px_-2px_rgba(0,0,0,0.35)]">
            <span className="grid size-[17px] place-items-center rounded-full border border-[#b4501f]/40 font-mono text-[10px] font-bold leading-none text-[#8a3a14]">
                $
            </span>
        </div>
    );
}

/** A pile of cash with a coin beside it; hovering flips the coin. */
function EarnedViz({ on, hovered }: VizProps) {
    return (
        <div className="relative h-12 w-[110px]">
            {BILLS.map((bill, i) => {
                const top = i === BILLS.length - 1;
                return (
                    <motion.div
                        // biome-ignore lint/suspicious/noArrayIndexKey: fixed pile
                        key={i}
                        className="absolute bottom-1 left-0"
                        style={{ zIndex: i }}
                        initial={{ x: -30, y: bill.y, rotate: 0, opacity: 0 }}
                        animate={
                            on
                                ? {
                                      x: top && hovered ? bill.x + 8 : bill.x,
                                      y: bill.y,
                                      rotate:
                                          top && hovered
                                              ? bill.rotate + 7
                                              : bill.rotate,
                                      opacity: 1,
                                  }
                                : { x: -30, y: bill.y, rotate: 0, opacity: 0 }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 24,
                            delay: hovered ? 0 : 0.25 + i * 0.12,
                        }}
                    >
                        <Bill />
                    </motion.div>
                );
            })}

            <motion.div
                className="absolute bottom-0 left-[76px] z-10 [perspective:200px]"
                initial={{ y: -40, opacity: 0 }}
                animate={
                    on
                        ? {
                              y: hovered ? [0, -26, 0] : 0,
                              rotateY: hovered ? [0, 720] : 360,
                              opacity: 1,
                          }
                        : { y: -40, opacity: 0 }
                }
                transition={
                    hovered
                        ? { duration: 0.75, ease: "easeInOut" }
                        : {
                              y: {
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 16,
                                  delay: 0.75,
                              },
                              rotateY: {
                                  duration: 0.7,
                                  delay: 0.75,
                                  ease: "easeOut",
                              },
                              opacity: { duration: 0.1, delay: 0.75 },
                          }
                }
            >
                <Coin />
            </motion.div>
        </div>
    );
}
