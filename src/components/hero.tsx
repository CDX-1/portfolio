'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Pokemon3DCard } from "./pokemon-3d-card";
import { HyperText } from "./magicui/hyper-text";
import { motion } from "framer-motion";
import { TypingAnimation } from "./magicui/typing-animation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Hero() {
    const { resolvedTheme } = useTheme();
    const [_, setColor] = useState("#ffffff");
    const [card, setCard] = useState("");
    const router = useRouter();

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    useEffect(() => {
        const cards = [
            "swsh9/154",
            "sv7/151",
            "xy7/98",
            "sma/SV47",
            "sv4pt5/233",
            "sv6/214"
        ];

        setCard(cards[Math.floor(Math.random() * cards.length)]);
    }, [card]);

    return (
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10 h-screen px-4 md:px-0">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-30">
                <div className="flex flex-col space-y-4 md:space-y-6 text-center lg:text-left max-w-md lg:max-w-none">
                    <div>
                        <HyperText className="font-mono font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">CDX</HyperText>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="font-mono text-lg md:text-xl"
                        >
                            🍁 Developer
                        </motion.p>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-wrap max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md text-sm md:text-base"
                    >
                        Heyo! I&apos;m a full-stack developer from Canada with extensive experience in various programming languages and technologies.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex justify-center lg:justify-start space-x-2"
                    >
                        <Button variant="link" className="p-0! font-mono hover:text-accent text-sm md:text-base hover:no-underline hover:cursor-pointer"
                            onClick={() => router.push("/about")}
                        >
                            <span>Learn more</span>
                            <IconArrowRight />
                        </Button>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="scale-75 sm:scale-90 md:scale-100"
                >
                    <Pokemon3DCard
                        frontImage={`https://images.pokemontcg.io/${card}_hires.png`}
                        backImage={`https://images.pokemontcg.io/${card}_back_hires.png`}
                    />
                </motion.div>
            </div>
            <Link href="https://github.com/CDX-1/portfolio" target="_blank">
                <TypingAnimation className="font-mono text-xs hover:text-accent text-center" duration={20}>
                    my portfolio is open source :)
                </TypingAnimation>
            </Link>
        </div>
    );
}