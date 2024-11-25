"use client";

import { useState } from "react";

import Particles from "@/components/ui/particles";
import { FadeText } from "@/components/ui/fade-text";
import TypingAnimation from "@/components/ui/typing-animation";

import { ArrowUpRightFromSquare } from "lucide-react";
import IconCloud from "@/components/ui/icon-cloud";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

const toolSlugs = [
  "javascript",
  "typescript",
  "lua",
  "java",
  "python",
  "github",
  "react",
  "html5",
  "css3",
  "vercel",
  "visualstudiocode",
  "kotlin",
  "figma",
  "git",
  "visualstudio",
  "unity",
  "unrealengine",
  "roblox",
  "mysql",
  "mongodb",
  "blender",
  "minecraft",
  "tailwindcss",
];

export default function Home() {
  const [color] = useState("#ffffff");

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden h-screen mx-auto z-[-1] backdrop-blur-[200px] bg-gradient-to-b ${if (theme == 'dark) 'from-[#1a191b] to-[#0A0A0A]'}">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />

      <Navbar/>

      {/* Main */}
      <div className="text-center">
        <FadeText
          className="text-9xl font-bold"
          text="CDX"
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
        />
        <TypingAnimation
          className="text-xl font-normal text-silent px-6"
          duration={10}
          text="Builder of various projects using unique toolsets"
        />
        <a href="/projects">
          <Button className="mt-2 text-lg" variant="ghost">
            <ArrowUpRightFromSquare />Take a look!
          </Button>
        </a>
      </div>

      <div className="absolute flex size-full items-center justify-center pointer-events-none">
        <IconCloud iconSlugs={toolSlugs} />
      </div>
    </div >
  );
}
