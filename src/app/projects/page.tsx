"use client";

import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { Project } from "@/components/project";

const projects = [
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
    return (
        <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
            <Navbar />
            <PageHeader title="Projects" description="Some cool projects I have worked on"/>
            <div className="flex-wrap">
                {projects.map(item => (
                    <Project
                        title={item.title}
                        company={item.company}
                        dateRange={item.dateRange}
                        description={item.description}
                        link={item.link}
                        pinned={item.pinned || false}
                        current={item.current || false}
                        discontinued={item.discontinued || false}
                        tools={item.tools}                        
                    />
                ))}
            </div>
        </div>
    );
}
