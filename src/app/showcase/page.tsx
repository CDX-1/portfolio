"use client";

import { FadeText } from "@/components/ui/fade-text";
import { Separator } from "@/components/ui/separator";
import RetroGrid from "@/components/ui/retro-grid";
import { Navbar } from "@/components/navbar";
import { LayoutGrid } from "@/components/ui/layout-grid";
import ShowcaseContent from "@/components/showcase";

const minecraftCards = [
    {
        id: 1,
        content: <ShowcaseContent
            id="city-building"
            title="City Building"
            description="Minecraft city building using schematics"
            tools={["Java", "Minestom"]}
        />,
        className: "col-span-1",
        thumbnail: "/showcase/minecraft/city_building/header.png"
    },
    {
        id: 2,
        content: <ShowcaseContent
            id="dodgeball"
            title="Dodgeball"
            description="Dodgeball mechanics in Minecraft"
            tools={["Kotlin", "Spigot/Paper"]}
        />,
        className: "col-span-2",
        thumbnail: "/showcase/minecraft/dodgeball/header.png"
    },
    {
        id: 3,
        content: <ShowcaseContent
            id="skygens"
            title="Sky Gens"
            description="A gamemode with resource generators"
            tools={["Java", "Skript", "Spgiot/Paper"]}
        />,
        className: "col-span-2",
        thumbnail: "/showcase/minecraft/skygens/header.png"
    },
    {
        id: 4,
        content: <ShowcaseContent
            id="pvp"
            title="Minestom PvP"
            description="Partial vanilla PVP mechanics in Minestom"
            tools={["Kotlin", "Minestom"]}
        />,
        className: "col-span-1",
        thumbnail: "/showcase/minecraft/pvp/header.png"
    }
]

const robloxCards = [
    {
        id: 1,
        content: <ShowcaseContent
            id="valoria"
            title="Valoria"
            description="A loading scene and a combat system"
            tools={["Luau", "Roblox Studio"]}
        />,
        className: "col-span-2",
        thumbnail: "/showcase/roblox/valoria/header.png"
    },
    {
        id: 2,
        content: <ShowcaseContent
            id="bleach"
            title="Bleach In ROBLOX"
            description="A Bleach attack in ROBLOX"
            tools={["Luau", "Roblox Studio"]}
        />,
        className: "col-span-1",
        thumbnail: "/showcase/roblox/bleach/header.png"
    },
    {
        id: 3,
        content: <ShowcaseContent
            id="lockon"
            title="Lock On System"
            description="A simple enemy lock on system"
            tools={["Luau", "Roblox Studio"]}
        />,
        className: "col-span-1",
        thumbnail: "/showcase/roblox/lockon/header.png"
    },
    {
        id: 4,
        content: <ShowcaseContent
            id="valoria"
            title="Valoria"
            description="A loading scene and a combat system"
            tools={["Luau", "Roblox Studio"]}
        />,
        className: "col-span-2",
        thumbnail: "/showcase/roblox/valoria/header.png"
    }
]

export default function Showcase() {
    return (
        <div className="mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8">
            <Navbar />

            <div className="mb-16 mt-6 sm:mb-8 sm:mt-12 w-full relative">
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <RetroGrid />
                </div>
                <FadeText
                    className="text-5xl font-bold"
                    text="Showcase"
                    direction="down"
                    framerProps={{
                        show: { transition: { delay: 0.2 } },
                    }}
                />
                <div className="pt-2">
                    <FadeText
                        className="text-l text-silent"
                        text="Many difference cool things I've made"
                        direction="left"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                    />
                </div>
            </div>

            <Separator orientation="horizontal" />

            <div className="h-screen py-20 w-full">
                <h2 className="text-3xl font-bold text-center">Minecraft</h2>
                <LayoutGrid cards={minecraftCards} />
                <h2 className="text-3xl font-bold text-center">ROBLOX</h2>
                <LayoutGrid cards={robloxCards} />
            </div>
        </div >
    );
}
