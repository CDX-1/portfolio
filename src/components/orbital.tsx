'use client';

import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";

export const Orbital = () => {
    const { scrollYProgress } = useScroll();

    const orbitRadiusX = 38;
    const orbitRadiusY = 10;
    const centerX = 14;
    const centerY = 14;

    const angle = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);

    const x = useTransform(angle, (a) => {
        return centerX + Math.cos(a) * orbitRadiusX - 3;
    });

    const y = useTransform(angle, (a) => {
        return centerY + Math.sin(a) * orbitRadiusY - 3;
    });

    const depth = useTransform(angle, (a) => {
        return (Math.sin(a) + 1) / 2;
    });

    const zIndex = useTransform(depth, (d) => (d > 0.5 ? 10 : 1));

    const scale = useTransform(depth, [0, 1], [0.5, 1.3]);
    const opacity = useTransform(depth, [0, 1], [0.4, 1]);

    return (
        <motion.div
            className="relative h-10 w-10 border-foreground border-4 border-double rounded-sm"
            style={{
                rotate: 12,
                perspective: 400,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 12,
                    height: 12,
                    x,
                    y,
                    scale,
                    zIndex,
                    opacity,
                    background: "#000"
                }}
            />
        </motion.div>
    );
}