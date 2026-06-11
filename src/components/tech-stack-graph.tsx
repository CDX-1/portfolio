'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export interface Connection {
    id: string;
    type: "in" | "out" | "dual";
}

export interface TechStackItem {
    id: string;
    name: string;
    icon: string;
    connections: Connection[];
}

const NODE_WIDTH = 112;
const NODE_HEIGHT = 36;
const NODE_RADIUS = 22;

export function TechStackGraph({ items }: { items: TechStackItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
    const [layout, setLayout] = useState<Record<string, { top: number; left: number }>>({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!containerRef.current || items.length === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const radius = Math.min(rect.width, rect.height) / 3;

        const newLayout: Record<string, { top: number; left: number }> = {};
        items.forEach((item, i) => {
            const angle = (i / items.length) * 2 * Math.PI;
            newLayout[item.id] = {
                left: cx + radius * Math.cos(angle) - NODE_WIDTH / 2,
                top: cy + radius * Math.sin(angle) - NODE_HEIGHT / 2,
            };
        });
        setLayout(newLayout);
        setReady(true);
    }, [items]);

    const updateLines = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPositions: Record<string, { x: number; y: number }> = {};

        items.forEach((item) => {
            const node = nodeRefs.current[item.id];
            if (node) {
                const rect = node.getBoundingClientRect();
                newPositions[item.id] = {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                };
            }
        });
        setPositions(newPositions);
    };

    useEffect(() => {
        if (!ready) return;
        updateLines();
        window.addEventListener("resize", updateLines);
        return () => window.removeEventListener("resize", updateLines);
    }, [layout, ready]);

    const edges = useMemo(() => {
        const directed = new Set<string>();
        items.forEach((item) => {
            item.connections.forEach((conn) => {
                if (conn.type === "out" || conn.type === "dual") {
                    directed.add(`${item.id}->${conn.id}`);
                }
                if (conn.type === "in" || conn.type === "dual") {
                    directed.add(`${conn.id}->${item.id}`);
                }
            });
        });

        const seenPairs = new Set<string>();
        const result: Array<{
            id: string;
            source: string;
            target: string;
            arrowEnd: boolean;
            arrowStart: boolean;
            dashed: boolean;
        }> = [];

        items.forEach((item) => {
            item.connections.forEach((conn) => {
                const sorted = [item.id, conn.id].sort();
                const pairId = `${sorted[0]}-${sorted[1]}`;
                if (!seenPairs.has(pairId)) {
                    seenPairs.add(pairId);
                    const a = sorted[0];
                    const b = sorted[1];
                    const hasAB = directed.has(`${a}->${b}`);
                    const hasBA = directed.has(`${b}->${a}`);
                    if (hasAB || hasBA) {
                        result.push({
                            id: pairId,
                            source: a,
                            target: b,
                            arrowEnd: hasAB,
                            arrowStart: hasBA,
                            dashed: hasAB && hasBA,
                        });
                    }
                }
            });
        });
        return result;
    }, [items]);

    const getShortenedLine = (x1: number, y1: number, x2: number, y2: number, offset: number) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2 * offset) return null;
        const ux = dx / dist;
        const uy = dy / dist;
        return {
            x1: x1 + ux * offset,
            y1: y1 + uy * offset,
            x2: x2 - ux * offset,
            y2: y2 - uy * offset,
        };
    };

    if (!ready || Object.keys(layout).length === 0) {
        return <div ref={containerRef} className="w-full h-[400px]" />;
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] overflow-hidden rounded-xl border border-border bg-background"
            style={{
                backgroundImage:
                    "linear-gradient(to right, rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
            }}
        >
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {edges.map((edge) => {
                    const p1 = positions[edge.source];
                    const p2 = positions[edge.target];
                    if (!p1 || !p2) return null;

                    const line = getShortenedLine(p1.x, p1.y, p2.x, p2.y, NODE_RADIUS);
                    if (!line) return null;

                    const midX = (line.x1 + line.x2) / 2;
                    const midY = (line.y1 + line.y2) / 2;
                    const dx = line.x2 - line.x1;
                    const dy = line.y2 - line.y1;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);

                    const gap = edge.arrowStart && edge.arrowEnd ? 14 : 0;

                    return (
                        <g key={edge.id}>
                            <line
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="text-muted-foreground/25"
                                strokeDasharray={edge.dashed ? "4 4" : "none"}
                            />

                            {edge.arrowEnd && (
                                <g
                                    transform={`translate(${midX + gap * dx / dist}, ${midY + gap * dy / dist}) rotate(${angleDeg})`}
                                >
                                    <polygon
                                        points="0,0 -7,3 -7,-3"
                                        className="fill-muted-foreground/40"
                                    />
                                </g>
                            )}

                            {edge.arrowStart && (
                                <g
                                    transform={`translate(${midX - gap * dx / dist}, ${midY - gap * dy / dist}) rotate(${angleDeg + 180})`}
                                >
                                    <polygon
                                        points="0,0 -7,3 -7,-3"
                                        className="fill-muted-foreground/40"
                                    />
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>

            {items.map((item) => (
                <motion.div
                    key={item.id}
                    ref={(el) => {
                        if (el) nodeRefs.current[item.id] = el;
                    }}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    onDrag={updateLines}
                    onDragEnd={updateLines}
                    className="absolute z-20 select-none"
                    style={{
                        top: layout[item.id]?.top || 0,
                        left: layout[item.id]?.left || 0,
                    }}
                    whileHover={{ zIndex: 30 }}
                    whileDrag={{ cursor: "grabbing", zIndex: 40 }}
                >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/40 transition-colors duration-150 hover:bg-accent backdrop-blur-sm border border-border/60 shadow-xs text-xs font-medium text-secondary-foreground whitespace-nowrap">
                        <Image
                            src={
                                item.icon.endsWith(".svg")
                                    ? `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${item.icon}`
                                    : `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${item.icon}/default.svg`
                            }
                            alt={item.name}
                            width={16}
                            height={16}
                            className="object-contain"
                            unoptimized
                        />
                        <span>{item.name}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}