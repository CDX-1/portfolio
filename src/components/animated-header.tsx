"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

type Author = {
    name: string;
    github?: string;
    linkedin?: string;
};

type Meta = {
    title: string;
    author: Author[];
    location?: string;
    date: string;
    github?: string;
};

export function AnimatedHeader({ meta }: { meta: Meta }) {
    return (
        <motion.div
            className="mb-4 text-center"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
        >
            <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-foss"
                    variants={fadeInUp}
                >
                    {meta.title}
                </motion.h1>
            </div>

            <motion.div
                className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6"
                variants={fadeInUp}
            >
                {meta.author.map((author, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-mono"
                    >
                        <span className="text-sm md:text-base font-medium">{author.name}</span>
                        {(author.github || author.linkedin) && (
                            <>
                                {author.github && (
                                    <Link
                                        href={author.github}
                                        target="_blank"
                                        className="hover:text-muted-foreground transition-colors"
                                    >
                                        <FaGithub size={14} className="md:w-4 md:h-4" />
                                    </Link>
                                )}
                                {author.linkedin && (
                                    <Link
                                        href={author.linkedin}
                                        target="_blank"
                                        className="hover:text-muted-foreground transition-colors"
                                    >
                                        <FaLinkedin size={14} className="md:w-4 md:h-4" />
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </motion.div>

            <motion.div
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base"
                variants={fadeInUp}
            >
                {meta.location && (
                    <div className="flex items-center rounded-full font-mono gap-2 text-muted-foreground">
                        <span>📍</span>
                        <span className="font-medium">{meta.location}</span>
                    </div>
                )}
                <time className="text-muted-foreground font-mono uppercase tracking-wider">
                    {meta.date}
                </time>
                {meta.github && (
                    <Link
                        href={meta.github}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                            <FaGithub size={18} className="md:w-5 md:h-5" />
                        </motion.div>
                    </Link>
                )}
            </motion.div>
        </motion.div>
    );
}