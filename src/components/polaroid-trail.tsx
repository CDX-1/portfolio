"use client";

import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    rotVel: number;
    life: number;
    invMaxLife: number;
    scale: number;
    size: number;
};

const POOL_SIZE = 48;
const SPAWN_COOLDOWN_MS = 42;
const SPAWN_MIN_DIST_SQ = 22 * 22;
const GRAVITY = 260;

export default function PolaroidTrail({ images }: { images: string[] }) {
    const slotRefs = useRef<HTMLDivElement[]>([]);
    const imgRefs = useRef<HTMLImageElement[]>([]);
    const particles = useRef<(Particle | null)[]>(
        Array(POOL_SIZE).fill(null),
    );
    const visible = useRef<boolean[]>(Array(POOL_SIZE).fill(false));
    const mouse = useRef({
        x: 0,
        y: 0,
        moved: false,
        excluded: true,
        dirty: false,
    });
    const lastSpawn = useRef({ t: 0, x: 0, y: 0 });
    const bag = useRef<string[]>([]);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (images.length === 0) return;
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const hasHover = window.matchMedia("(hover: hover)").matches;
        if (reduced || !hasHover) return;

        const pickImage = () => {
            if (bag.current.length === 0) {
                bag.current = images.slice();
                for (let i = bag.current.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const tmp = bag.current[i];
                    bag.current[i] = bag.current[j];
                    bag.current[j] = tmp;
                }
            }
            return bag.current.pop()!;
        };

        const onMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            mouse.current.moved = true;
            mouse.current.dirty = true;
        };
        const onLeave = () => {
            mouse.current.excluded = true;
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);

        let last = performance.now();
        const loop = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;

            const m = mouse.current;
            if (m.dirty) {
                const el = document.elementFromPoint(m.x, m.y);
                m.excluded = !el || !!el.closest("[data-trail-exclude]");
                m.dirty = false;
            }

            if (m.moved && !m.excluded) {
                const dx = m.x - lastSpawn.current.x;
                const dy = m.y - lastSpawn.current.y;
                if (
                    now - lastSpawn.current.t > SPAWN_COOLDOWN_MS &&
                    dx * dx + dy * dy > SPAWN_MIN_DIST_SQ
                ) {
                    for (let i = 0; i < POOL_SIZE; i++) {
                        if (particles.current[i] === null) {
                            const p = spawn(m.x, m.y);
                            particles.current[i] = p;
                            const img = imgRefs.current[i];
                            if (img) {
                                img.src = pickImage();
                                const sz = `${p.size}px`;
                                img.style.width = sz;
                                img.style.height = sz;
                            }
                            lastSpawn.current = { t: now, x: m.x, y: m.y };
                            break;
                        }
                    }
                }
            }

            for (let i = 0; i < POOL_SIZE; i++) {
                const p = particles.current[i];
                const node = slotRefs.current[i];
                if (!p) {
                    if (visible.current[i] && node) {
                        node.style.opacity = "0";
                        visible.current[i] = false;
                    }
                    continue;
                }
                p.vy += GRAVITY * dt;
                p.vx *= 0.99;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rot += p.rotVel * dt;
                p.rotVel *= 0.985;
                p.life -= dt * p.invMaxLife;

                if (p.life <= 0) {
                    particles.current[i] = null;
                    if (node) node.style.opacity = "0";
                    visible.current[i] = false;
                    continue;
                }

                if (node) {
                    const half = p.size * 0.5;
                    const t = p.life;
                    node.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0) rotate(${p.rot}deg) scale(${p.scale})`;
                    node.style.opacity = `${t * (2 - t)}`;
                    visible.current[i] = true;
                }
            }

            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [images]);

    if (images.length === 0) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
            style={{ contain: "strict" }}
        >
            {Array.from({ length: POOL_SIZE }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) slotRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-0 bg-white shadow-[0_14px_30px_-8px_rgba(0,0,0,0.28),0_6px_12px_-8px_rgba(0,0,0,0.22)]"
                    style={{
                        padding: "6px 6px 22px 6px",
                        opacity: 0,
                        willChange: "transform, opacity",
                        transform: "translate3d(-9999px, -9999px, 0)",
                        contain: "layout paint",
                    }}
                >
                    <img
                        ref={(el) => {
                            if (el) imgRefs.current[i] = el;
                        }}
                        alt=""
                        draggable={false}
                        decoding="async"
                        className="block select-none bg-neutral-200 object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

function spawn(x: number, y: number): Particle {
    const size = 84 + Math.floor(Math.random() * 40);
    const maxLife = 1.4 + Math.random() * 0.7;
    return {
        x,
        y,
        vx: (Math.random() - 0.5) * 90,
        vy: -30 - Math.random() * 40,
        rot: (Math.random() - 0.5) * 30,
        rotVel: (Math.random() - 0.5) * 200,
        life: 1,
        invMaxLife: 1 / maxLife,
        scale: 0.85 + Math.random() * 0.25,
        size,
    };
}
