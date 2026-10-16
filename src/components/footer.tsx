"use client";

import {
    AnimatePresence,
    MotionConfig,
    motion,
    useMotionValue,
    useSpring,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SOCIALS = [
    {
        path: "/logos/instagram.svg",
        alt: "Instagram",
        label: "instagram",
        href: "https://www.instagram.com/awsf__/",
    },
    {
        path: "/logos/github.svg",
        alt: "Github",
        label: "github",
        href: "https://github.com/CDX-1",
    },
    {
        path: "/logos/linkedin.svg",
        alt: "LinkedIn",
        label: "linkedin",
        href: "https://www.linkedin.com/in/awsaf-syed/",
    },
    {
        path: "/logos/cosmos.svg",
        alt: "Cosmos",
        label: "cosmos",
        href: "https://www.cosmos.so/aw.sf",
    },
    {
        path: "/logos/youtube.svg",
        alt: "Youtube",
        label: "youtube",
        href: "https://www.youtube.com/@rarecdx",
    },
    {
        path: "/logos/email.svg",
        alt: "Email",
        label: "say hi!",
        href: "mailto:contact@awsaf.dev",
    },
];

const COLS = 3;
const ROWS = Math.ceil(SOCIALS.length / COLS);

type Particle = {
    id: number;
    src: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    rotVel: number;
    scale: number;
    life: number;
    maxLife: number;
};

export default function Footer() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="py-12 md:py-16 mx-auto max-w-6xl space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
                        <div className="flex-col space-y-2 text-center md:text-left w-full md:w-auto">
                            <h2 className="font-semibold font-heading text-2xl md:text-4xl tracking-tighter">
                                Connect with me
                                <span className="text-primary">.</span>
                            </h2>
                            <p className="text-foreground/55 text-sm md:text-base text-balance">
                                Thinking about working together?
                                <br className="hidden md:block" />
                                <span className="md:hidden"> </span>Or just want
                                to say{" "}
                                <span className="font-medium text-foreground">
                                    hi?
                                </span>
                            </p>
                        </div>

                        <SocialsGrid />
                    </div>

                    <TitleBlock />
                </div>
            </div>
        </MotionConfig>
    );
}

// Drawing-sheet title block, the box in the corner of every blueprint.
function TitleBlock() {
    const pathname = usePathname();
    const year = new Date().getFullYear();
    const cells = [
        { label: "Drawn by", value: "Awsaf Syed" },
        { label: "Sheet", value: pathname === "/" ? "/index" : pathname },
        { label: "Scale", value: "1 : 1" },
        { label: "Rev", value: `${year}` },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-[repeat(4,auto)_1fr] border border-foreground/15 font-mono text-[10px] uppercase tracking-[0.16em]">
            {cells.map((c) => (
                <div
                    key={c.label}
                    className="min-w-0 border-foreground/15 px-3 py-2 [&:nth-child(odd)]:border-r md:border-r [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
                >
                    <div className="text-foreground/35">{c.label}</div>
                    <div className="mt-1 truncate text-foreground/70 normal-case tracking-[0.06em]">
                        {c.value}
                    </div>
                </div>
            ))}
            <div className="col-span-2 md:col-span-1 border-t border-foreground/15 md:border-t-0 px-3 py-2 flex items-center md:justify-end text-foreground/45 normal-case tracking-[0.04em] tabular-nums">
                © {year}. Designed & developed by Awsaf Syed.
            </div>
        </div>
    );
}

function SocialsGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);
    const idRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // The physics loop only runs while there are particles in the air.
    const tick = useCallback(() => {
        let last = performance.now();
        const loop = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;

            const gravity = 1100;
            const drag = 0.985;
            for (const p of particlesRef.current) {
                p.vy += gravity * dt;
                p.vx *= drag;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rot += p.rotVel * dt;
                p.rotVel *= 0.995;
                p.life -= dt / p.maxLife;
            }
            particlesRef.current = particlesRef.current.filter(
                (p) => p.life > 0,
            );
            setParticles(particlesRef.current.slice());

            rafRef.current = particlesRef.current.length
                ? requestAnimationFrame(loop)
                : null;
        };
        rafRef.current = requestAnimationFrame(loop);
    }, []);

    useEffect(
        () => () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        },
        [],
    );

    // A one-shot pop of little logos out of the tile, not a constant stream.
    const burst = (el: HTMLElement, src: string, count: number) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        const box = containerRef.current?.getBoundingClientRect();
        const tile = el.getBoundingClientRect();
        if (!box) return;
        const cx = tile.left + tile.width / 2 - box.left;
        const cy = tile.top + tile.height / 2 - box.top;
        for (let i = 0; i < count; i++) {
            particlesRef.current.push(
                spawn(idRef.current++, src, cx, cy, i / count),
            );
        }
        if (rafRef.current === null) tick();
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseLeave={() => setHovered(null)}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.4 }}
            className="relative w-max mx-auto md:mx-0"
        >
            <div
                className={cn(
                    "grid grid-cols-3",
                    "rounded-2xl sm:rounded-3xl",
                    "bg-foreground/[0.03] ring-1 ring-inset ring-foreground/[0.05]",
                )}
            >
                {SOCIALS.map((social, i) => {
                    const col = i % COLS;
                    const row = Math.floor(i / COLS);
                    const isLeft = col === 0;
                    const isRight = col === COLS - 1;
                    const isTop = row === 0;
                    const isBottom = row === ROWS - 1;

                    return (
                        <SocialButton
                            key={social.href}
                            {...social}
                            index={i}
                            state={
                                hovered === null
                                    ? "idle"
                                    : hovered === i
                                      ? "active"
                                      : "dimmed"
                            }
                            labelBelow={isBottom}
                            onHover={(el) => {
                                setHovered(i);
                                burst(el, social.path, 7);
                            }}
                            onPress={(el) => burst(el, social.path, 14)}
                            className={cn(
                                isTop &&
                                    isLeft &&
                                    "rounded-tl-2xl sm:rounded-tl-3xl",
                                isTop &&
                                    isRight &&
                                    "rounded-tr-2xl sm:rounded-tr-3xl",
                                isBottom &&
                                    isLeft &&
                                    "rounded-bl-2xl sm:rounded-bl-3xl",
                                isBottom &&
                                    isRight &&
                                    "rounded-br-2xl sm:rounded-br-3xl",
                                !isLeft && "border-l border-foreground/[0.05]",
                                !isTop && "border-t border-foreground/[0.05]",
                            )}
                        />
                    );
                })}
            </div>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-30"
                style={{ overflow: "visible" }}
            >
                {particles.map((p) => (
                    <img
                        key={p.id}
                        src={p.src}
                        alt=""
                        draggable={false}
                        className="absolute left-0 top-0 h-8 w-8 select-none"
                        style={{
                            transform: `translate3d(${p.x - 16}px, ${p.y - 16}px, 0) rotate(${p.rot}deg) scale(${p.scale})`,
                            opacity: easeOutQuad(Math.max(0, p.life)) * 0.9,
                            willChange: "transform, opacity",
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function easeOutQuad(t: number) {
    return 1 - (1 - t) * (1 - t);
}

/** `slot` (0..1) spreads a burst evenly around an upward fan. */
function spawn(
    id: number,
    src: string,
    x: number,
    y: number,
    slot: number,
): Particle {
    const angle =
        -Math.PI / 2 +
        (slot - 0.5) * Math.PI * 1.3 +
        (Math.random() - 0.5) * 0.4;
    const speed = 260 + Math.random() * 220;
    return {
        id,
        src,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: (Math.random() - 0.5) * 60,
        rotVel: (Math.random() - 0.5) * 720,
        scale: 0.35 + Math.random() * 0.3,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
    };
}

const TILE_SPRING = { type: "spring", stiffness: 380, damping: 22 } as const;

function SocialButton({
    path,
    href,
    alt,
    label,
    index,
    state,
    labelBelow,
    className,
    onHover,
    onPress,
}: {
    path: string;
    alt: string;
    label: string;
    href: string;
    index: number;
    state: "idle" | "active" | "dimmed";
    labelBelow: boolean;
    className?: string;
    onHover: (el: HTMLElement) => void;
    onPress: (el: HTMLElement) => void;
}) {
    // icon leans toward the cursor, like it's being pulled by a magnet
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 300, damping: 20 });
    const y = useSpring(my, { stiffness: 300, damping: 20 });
    const tilt = index % 2 === 0 ? -4 : 4;

    const onMove = (e: React.MouseEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.5, rotate: tilt * 2 },
                shown: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { ...TILE_SPRING, delay: index * 0.06 },
                },
            }}
            className={cn("relative", state === "active" && "z-20")}
        >
            {/* entrance lives on the wrapper; hover on this inner layer, so
                the in-view variant can't pin scale/rotate */}
            <motion.div
                animate={
                    state === "active"
                        ? { scale: 1.14, rotate: tilt }
                        : state === "dimmed"
                          ? { scale: 0.94, rotate: 0 }
                          : { scale: 1, rotate: 0 }
                }
                whileTap={{ scale: 1.04 }}
                transition={TILE_SPRING}
            >
                <Link
                    className={cn(
                        "group relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center",
                        "transition-[background-color,box-shadow,border-radius,border-color,opacity] duration-300",
                        state === "active" &&
                            "rounded-2xl sm:rounded-3xl border-transparent bg-background shadow-xl",
                        state === "dimmed" && "opacity-60",
                        className,
                    )}
                    target="_blank"
                    href={href}
                    aria-label={alt}
                    onMouseEnter={(e) => onHover(e.currentTarget)}
                    onFocus={(e) => onHover(e.currentTarget)}
                    onMouseMove={onMove}
                    onMouseLeave={() => {
                        mx.set(0);
                        my.set(0);
                    }}
                    onPointerDown={(e) => onPress(e.currentTarget)}
                >
                    <motion.span style={{ x, y }} className="block">
                        <Image
                            src={path}
                            alt=""
                            width={40}
                            height={40}
                            className={cn(
                                "transition duration-300 sm:w-[48px] sm:h-[48px]",
                                state === "active"
                                    ? "opacity-100 grayscale-0"
                                    : "opacity-50 grayscale",
                            )}
                        />
                    </motion.span>
                </Link>
            </motion.div>

            {/* mono callout chip, same voice as the blueprint figure labels */}
            <AnimatePresence>
                {state === "active" && (
                    <motion.span
                        aria-hidden
                        initial={{
                            opacity: 0,
                            y: labelBelow ? -6 : 6,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            transition: { duration: 0.12 },
                        }}
                        transition={TILE_SPRING}
                        className={cn(
                            "pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-primary px-1.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-primary-foreground shadow-[0_8px_20px_-10px_rgba(200,80,30,0.6)]",
                            labelBelow ? "-bottom-2.5" : "-top-2.5",
                        )}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
