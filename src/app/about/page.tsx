'use client';

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
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10 h-screen px-4 md:px-0">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-30">
                <div className="flex flex-col space-y-4 md:space-y-6 text-center lg:text-left max-w-md lg:max-w-lg">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                    >
                        about me
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-mono text-sm md:text-md"
                    >
                        I&apos;m a full-stack Canadian developer with half a decade of experience in several platforms, including but not limited to:
                        Websites, Desktop Applications, Roblox Games, Minecraft Servers, and Discord Bots, as well as AI/ML.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-mono font-bold text-md md:text-lg"
                    >
                        Languages I&apos;m proficient in:
                    </motion.p>

                    <ul>
                        {languages.map((language) => (
                            <li key={language}>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="font-mono text-sm md:text-md"
                                >
                                    {language}
                                </motion.p>
                            </li>
                        ))}
                    </ul>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-mono font-bold text-md md:text-lg"
                    >
                        Frameworks/libraries I&apos;m proficient in:
                    </motion.p>

                    <ul>
                        {frameworks.map((framework) => (
                            <li key={framework.name}>
                                <Link href={framework.link}>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="font-mono text-sm md:text-md hover:text-accent"
                                    >
                                        {framework.name}
                                    </motion.p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <motion.div
                    className="relative w-[400px] h-[600px] flex items-center justify-center rounded-2xl group"
                    style={{ perspective: 1200 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ rotateX: 0, rotateY: 0 }}
                    whileHover={{ rotateX: 8, rotateY: -8, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Ambient glow using blurred image */}
                    <motion.img
                        src="/photography.jpg"
                        alt="Photography Example Ambient Glow"
                        width={400}
                        height={600}
                        className="rounded-2xl"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            zIndex: 0,
                        }}
                        initial={{
                            filter: 'blur(40px) brightness(2)',
                            transform: 'scale(0.9)',
                            opacity: 0.35,
                        }}
                        animate={isHovered ? {
                            filter: 'blur(48px) brightness(2.3)',
                            transform: 'scale(1)',
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
                    {/* Main image */}
                    <Image
                        src="/photography.jpg"
                        alt="Photography Example"
                        width={700}
                        height={200}
                        className="rounded-2xl shadow-lg"
                        style={{
                            width: '400px',
                            height: '600px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: 'inherit',
                            position: 'relative',
                            zIndex: 1,
                        }}
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}