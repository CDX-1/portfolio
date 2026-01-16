"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
};

export function AnimatedContent({ children, hasGallery }: { children: ReactNode; hasGallery: boolean }) {
    return (
        <motion.div 
            className={cn(
                "prose prose-invert max-w-none",
                hasGallery ? "lg:col-span-2" : ""
            )}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
        >
            {children}
        </motion.div>
    );
}