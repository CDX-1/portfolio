"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import BrandStar from "./brand-star";

const SOCIALS = [
    {
        path: "/logos/instagram.svg",
        alt: "Instagram",
        href: "https://www.instagram.com/awsf__/",
    },
    {
        path: "/logos/github.svg",
        alt: "Github",
        href: "https://github.com/CDX-1",
    },
    {
        path: "/logos/linkedin.svg",
        alt: "LinkedIn",
        href: "https://www.linkedin.com/in/awsaf-syed/",
    },
    {
        path: "/logos/cosmos.svg",
        alt: "Cosmos",
        href: "https://www.cosmos.so/aw.sf",
    },
    {
        path: "/logos/youtube.svg",
        alt: "Youtube",
        href: "https://www.youtube.com/@rarecdx",
    },
    {
        path: "/logos/email.svg",
        alt: "Email",
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
        <div
            data-trail-exclude
            className="py-12 md:py-16 mx-auto max-w-6xl space-y-8 px-4 sm:px-6"
        >
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                <span className="tabular-nums text-foreground/55">03</span>
                <span className="h-px w-6 bg-foreground/15" aria-hidden />
                Contact
                <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
                <div className="flex-col space-y-2 text-center md:text-left w-full md:w-auto">
                    <h2 className="font-medium font-bespoke text-3xl md:text-4xl tracking-tight">
                        Connect with me.
                    </h2>
                    <p className="text-foreground/55 text-sm md:text-base">
                        Thinking about working together?
                        <br className="hidden md:block" />
                        <span className="md:hidden"> </span>Or just want to say
                        hi?
                    </p>
                </div>

                <SocialsGrid />
            </div>

            <div className="border-t border-border/40 w-full" />

            <div className="flex flex-col w-full md:flex-row justify-between items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="text-foreground/55">awsaf</span>
                    <BrandStar className="mx-1 inline-block size-2 text-[#ec7042]" />
                    <span className="tabular-nums">
                        v{new Date().getFullYear()}
                    </span>
                </span>
                <p className="text-foreground/55 text-sm text-center md:text-right tabular-nums">
                    © {new Date().getFullYear()}. Designed & developed by Awsaf
                    Syed.
                </p>
            </div>
        </div>
    );
}

function SocialsGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const hoverRef = useRef<{ src: string | null; x: number; y: number }>({
        src: null,
        x: 0,
        y: 0,
    });
    const idRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const lastSpawnRef = useRef(0);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReduced) return;

        let last = performance.now();
        const loop = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;

            const state = hoverRef.current;
            if (state.src && now - lastSpawnRef.current > 32) {
                lastSpawnRef.current = now;
                particlesRef.current.push(
                    spawn(idRef.current++, state.src, state.x, state.y),
                );
            }

            const gravity = 1200;
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

            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handleMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        hoverRef.current.x = e.clientX - rect.left;
        hoverRef.current.y = e.clientY - rect.top;
    };

    const handleLeave = () => {
        hoverRef.current.src = null;
    };

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: Pointer tracking is visual-only and triggers no action.
        <div
            ref={containerRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
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
                            onHover={() => {
                                hoverRef.current.src = social.path;
                            }}
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
        </div>
    );
}

function easeOutQuad(t: number) {
    return 1 - (1 - t) * (1 - t);
}

function spawn(id: number, src: string, x: number, y: number): Particle {
    const angle = Math.random() * Math.PI * 2;
    const speed = 30 + Math.random() * 90;
    const spawnAngle = Math.random() * Math.PI * 2;
    const spawnRadius = Math.random() * 22;
    const offsetX = Math.cos(spawnAngle) * spawnRadius;
    const offsetY = Math.sin(spawnAngle) * spawnRadius * 0.9 - 6;
    return {
        id,
        src,
        x: x + offsetX,
        y: y + offsetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.5 - (40 + Math.random() * 60),
        rot: (Math.random() - 0.5) * 90,
        rotVel: (Math.random() - 0.5) * 900,
        scale: 0.4 + Math.random() * 0.35,
        life: 1,
        maxLife: 0.7 + Math.random() * 0.5,
    };
}

function SocialButton({
    path,
    href,
    alt,
    className,
    onHover,
}: {
    path: string;
    alt: string;
    href: string;
    className?: string;
    onHover?: () => void;
}) {
    return (
        <Link
            className={cn(
                "group relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center",
                "transition-[transform,background-color,box-shadow,border-radius,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                "hover:scale-[1.12] hover:z-20",
                "hover:bg-background hover:shadow-xl",
                "hover:rounded-2xl sm:hover:rounded-3xl hover:border-transparent",
                "active:scale-[1.05]",
                className,
            )}
            target="_blank"
            href={href}
            onMouseEnter={onHover}
        >
            <Image
                src={path}
                alt={alt}
                width={40}
                height={40}
                className="opacity-50 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:w-[48px] sm:h-[48px]"
            />
        </Link>
    );
}
