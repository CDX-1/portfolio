"use client";

import Link from "next/link";
import { FadeText } from "@/components/ui/fade-text";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import RetroGrid from "@/components/ui/retro-grid";
import { Navbar } from "@/components/navbar";
import { FaLink, FaStar } from "react-icons/fa";

const experiences = [
    {
        title: "Lead Software Engineer",
        company: "MineSprawl",
        description: "MineSprawl is a Minecraft server developed from the ground up using Minestom, a lightweight and flexible Java library for creating custom Minecraft server implementations. Designed as a city-building minigame, Minesprawl allows players to build, expand, and manage their own virtual cities within a dynamic environment.",
        dateRange: "2024 - present",
        link: "https://minesprawl.net",
        tools: ["Java", "Minestom", "MongoDB"],
        current: true,
        pinned: true
    },
    {
        title: "Lead Software Engineer",
        company: "Dice Roll Studios",
        description: "Dice Roll Studios is a ROBLOX development group owned by myself as an outlet to publish my creations on Roblox. Currently, Dice Roll Studios has published a ROBLOX studio plugin called Ambience which allows users to save, share and reuse game lighting configurations.",
        dateRange: "2024 - present",
        link: "https://www.roblox.com/communities/5200413/Dice-Roll#!/about",
        tools: ["Luau", "Roblox Studio"],
        current: true,
        pinned: true
    },
    {
        title: "Lead Software Engineer",
        company: "BonusRound",
        description: "BonusRound is a Minecraft server designed to virtually replicate the excitement of dodgeball, using a custom Paper plugin. It incorporates skill-based matchmaking to ensure fair and competitive gameplay, creating an engaging experience for players of all levels.",
        dateRange: "2024",
        tools: ["Kotlin", "Spigot/Paper", "SQL"],
        discontinued: true
    },
    {
        title: "Game Developer",
        company: "Occulto Studios",
        description: "Occulto is a feature-rich MMORPG Minecraft server built with Minestom, designed to push the boundaries of gameplay customization. Supporting cross-play between Java and Bedrock editions, Occulto unites players across platforms in a fantasy world of mystery and adventure.",
        dateRange: "2024",
        tools: ["Java", "Kotlin", "Minestom"],
        link: "https://occulto.quest"
    },
    {
        title: "Senior Game Developer",
        company: "Valoria Studios",
        description: "Valoria is an open-world, adventure-driven RPG on Roblox, based on the anime, The Vinland Saga. The game features a large Viking-era landscape where players engage in dynamic combat, explore rich environments, and immerse themselves in a story of survival, conquest, and legacy. With a focus on skill-based mechanics, character progression, and a reactive world, Valoria combines thrilling combat with a deep, environment-driven experience.",
        dateRange: "2023 - 2024",
        tools: ["Luau", "Roblox Studio"],
        discontinued: true
    },
    {
        title: "Lead Software Engineer",
        company: "SkySplit",
        description: "SkySplit is a Minecraft server where players embark on an exhilarating adventure across a network of islands suspended in the sky. Resource generators scattered across the islands provide essential materials, challenging players to venture out, harvest loot, and fight other players and monsters.",
        dateRange: "2021 - 2023",
        tools: ["Java", "Spigot/Paper", "Skript"],
        discontinued: true
    },
    {
        title: "Lead Software Engineer",
        company: "ServerSetup",
        description: "ServerSetup is a Discord bot developed using the discord.js library, designed to simplify server management. It empowers users to create and save templates for Discord servers and reuse them across new servers. It features an interactive setup prompt in order to customize any template to your given specifications.",
        dateRange: "2021",
        tools: ["TypeScript", "Discord.js", "SQL"],
        discontinued: true
    },
]

export default function Projects() {
    const animation = {
        hide: {
            x: -30,
            opacity: 0
        },
        show: {
            x: 0,
            opacity: 1
        }
    };

    return (
        <div className="mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8">
            <Navbar/>

            <div className="mb-16 mt-6 sm:mb-8 sm:mt-12 w-full relative">
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <RetroGrid />
                </div>
                <FadeText
                    className="text-5xl font-bold"
                    text="Projects"
                    direction="down"
                    framerProps={{
                        show: { transition: { delay: 0.2 } },
                    }}
                />
                <div className="pt-2">
                    <FadeText
                        className="text-l text-silent"
                        text="A list of projects I've worked on"
                        direction="left"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                    />
                </div>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex-wrap">
                {experiences.map(item => (
                    <motion.div key={item.company} className="p-10" {...{ initial: animation.hide, animate: animation.show }}>
                        <div className="flex items-baseline space-x-2">
                            {item.pinned && <FaStar />}
                            <h1 className="font-bold text-2xl">{item.title}</h1>
                            <p className="text-silent">at {item.company}</p>
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <p className="mb-2 text-silent">{item.dateRange}</p>
                            {item.current && <Badge variant="outline">Current</Badge>}
                            {item.discontinued && <Badge variant="outline">Discontinued</Badge>}
                        </div>
                        <p className="text-silent mb-2">{item.description}</p>
                        <div className="space-x-2 flex items-baseline">
                            {item.link &&
                                <><FaLink /><Link href={item.link} target="_blank" className="hover:underline">Learn more</Link></>
                            }
                            {item.link && item.tools && <p>|</p>}
                            {item.tools?.map((tool) => (
                                <Badge variant="outline" key={tool}>{tool}</Badge>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
