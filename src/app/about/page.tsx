'use client';

import { RetroGrid } from "@/components/magicui/retro-grid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function About() {
    const languages = [
        "typescript",
        "java",
        "kotlin",
        "python",
        "rust",
        "c++"
    ]

    const frameworks = [
        {
            name: "react",
            link: "https://react.dev/"
        },
        {
            name: "next.js",
            link: "https://nextjs.org/"
        },
        {
            name: "spigot/paper",
            link: "https://papermc.io/"
        },
        {
            name: "minestom",
            link: "https://minestom.net"
        },
        {
            name: "discord.js",
            link: "https://discord.js.org/"
        },
        {
            name: "pycord",
            link: "https://pycord.dev/"
        },
    ]

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-8 lg:pb-0">
            <RetroGrid />
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 lg:gap-12 xl:gap-16">
                    {/* Content Section */}
                    <div className="flex-1 max-w-2xl xl:max-w-3xl">
                        <div className="space-y-6 md:space-y-8 text-center xl:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="font-mono font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                            >
                                about me
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                className="font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl"
                            >
                                I&apos;m a full-stack developer from Canada with over five years of experience across various platforms,
                                including websites, desktop applications, Roblox games, Minecraft servers, Discord bots, and AI/ML systems.
                            </motion.p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                                {/* Languages Section */}
                                <div className="space-y-3 md:space-y-4">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                        className="font-mono font-bold text-base sm:text-sm md:text-lg lg:text-xl"
                                    >
                                        Languages I&apos;m proficient in:
                                    </motion.h2>

                                    <ul className="space-y-1.5 md:space-y-2">
                                        {languages.map((language, index) => (
                                            <motion.li
                                                key={language}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                    delay: 0.3 + (index * 0.1)
                                                }}
                                            >
                                                <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg">
                                                    {language}
                                                </p>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Frameworks Section */}
                                <div className="space-y-3 md:space-y-4">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                                        className="font-mono font-bold text-base sm:text-sm md:text-lg lg:text-xl"
                                    >
                                        Frameworks/libraries I&apos;m proficient in:
                                    </motion.h2>

                                    <ul className="space-y-1.5 md:space-y-2">
                                        {frameworks.map((framework, index) => (
                                            <motion.li
                                                key={framework.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                    delay: 0.9 + (index * 0.1)
                                                }}
                                            >
                                                <Link
                                                    href={framework.link}
                                                    target="_blank"
                                                    className="inline-block hover:transform hover:scale-105 transition-transform duration-200"
                                                >
                                                    <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg hover:text-accent transition-colors duration-200">
                                                        {framework.name}
                                                    </p>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-shrink-0 mt-8 xl:mt-0">
                        <motion.div
                            className="relative group"
                            style={{ perspective: 1200 }}
                            whileTap={{ scale: 0.98 }}
                            animate={{ rotateX: 0, rotateY: 0 }}
                            whileHover={{
                                rotateX: 8,
                                rotateY: -8,
                                scale: 1.04
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Ambient glow using blurred image */}
                            <motion.img
                                src="/photography.jpg"
                                alt="Photography Example Ambient Glow"
                                className="rounded-2xl absolute top-0 left-0 w-full h-full object-cover"
                                style={{
                                    zIndex: 0,
                                }}
                                initial={{
                                    filter: 'blur(40px) brightness(2)',
                                    transform: 'scale(0.9)',
                                    opacity: 0.35,
                                }}
                                animate={isHovered ? {
                                    filter: 'blur(48px) brightness(2.3)',
                                    transform: 'scale(0.9)',
                                    opacity: 0.55,
                                } : {
                                    filter: 'blur(40px) brightness(2)',
                                    transform: 'scale(0.9)',
                                    opacity: 0.35,
                                }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                aria-hidden="true"
                                draggable={false}
                            />

                            {/* Main image with responsive sizing */}
                            <Image
                                src="/photography.jpg"
                                alt="Photography Example"
                                width={400}
                                height={600}
                                className="rounded-2xl shadow-lg relative z-10 w-48 h-72 sm:w-56 sm:h-84 md:w-64 md:h-96 lg:w-80 lg:h-[480px] xl:w-96 xl:h-[576px] 2xl:w-[400px] 2xl:h-[600px] object-cover"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* My Interests Section */}
                <div className="mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                        className="font-mono font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                    >
                        my interests
                    </motion.h2>
                </div>
            </div>
        </div>
    );
}