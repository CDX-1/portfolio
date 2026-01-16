"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

export default function AnimatedProjectsGrid({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        whileHover={{ y: -6 }}
                    >
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
}
