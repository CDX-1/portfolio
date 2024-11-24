import { FaAt, FaDiscord, FaGithub } from 'react-icons/fa';
import Experience from './components/Experience';
import { FaUpRightFromSquare, FaXTwitter } from 'react-icons/fa6';

export default function Home() {
  return (
    <main className="flex items-start justify-center min-h-screen text-gray-100 p-8 pt-16 z-[-1] backdrop-blur-[200px]">
      {/* Left Column */}
      <div className="w-full sm:w-1/4 md:w-1/6 flex flex-col justify-start items-start group hover">
        <h1 className="text-4xl sm:text-8xl font-bold text-transparent text-white">CDX</h1>
        <p className="text-2xl text-gray-300">Software Engineer</p>
        <p className="text-l text-gray-400 pt-2">Builder of various projects</p>
        <p className="text-l text-gray-400">using unique toolsets</p>
        <div className="flex flex-col space-y-2 pt-2">
          <span className="inline-flex items-center text-gray-300 hover:text-white duration-300">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cdxlol.dev@gmail.com&su=Development Proposal" className="flex items-center">
              <FaAt />
              <span className="ml-2">cdxlol.dev@gmail.com</span>
            </a>
          </span>
          <span className="inline-flex items-center text-gray-300 hover:text-white duration-300">
            <a href="/projects" className="flex items-center">
              <FaUpRightFromSquare />
              <span className="ml-2">View Projects</span>
            </a>
          </span>
        </div>
        <div className="mt-4 flex space-x-4 text-gray-400">
          <a href="https://github.com/CDX-1" className="hover:text-white duration-300"><FaGithub className="h-6 w-6"></FaGithub></a>
          <a href="#x" className="hover:text-white duration-300"><FaXTwitter className="h-6 w-6"></FaXTwitter></a>
          <a href="#discord" className="hover:text-white duration-300"><FaDiscord className="h-6 w-6"></FaDiscord></a>
        </div>
      </div >

      {/* Right Column */}
      < div className="w-full sm:w-3/4 max-w-full sm:max-w-2xl space-y-6 pl-8 text-gray-300" >
        <h1 className="text-lg leading-relaxed font-bold text-white">About Me</h1>
        <p className="text-lg leading-relaxed break-words">
          Hi, I&apos;m <b className="text-white">CDX</b>, a passionate developer specializing in creating immersive experiences and robust solutions across various platforms. My expertise includes:
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-4 sm:space-y-2">
          <li><b className="text-white">Minecraft Server Plugins:</b> Skilled in Bukkit/Spigot/Paper/Velocity plugin development, including NMS and packet handling, to craft powerful and unique gameplay mechanics.</li>
          <li><b className="text-white">Roblox Scripting:</b> Proficient in Luau and tools like Rojo and Knit to build powerful Roblox experiences.</li>
          <li><b className="text-white">Discord Bots:</b> Experienced in building feature-rich bots using discord.js</li>
        </ul>
        <h1 className="text-lg leading-relaxed font-bold break-words">Skills & Tools</h1>
        <ul className="list-disc pl-5 mt-4 space-y-4 sm:space-y-2">
          <li><b className="text-white">Languages:</b> Java, Kotlin, JavaScript/TypeScript, Python, Lua(u)</li>
          <li><b className="text-white">Software:</b> Visual Studio, Visual Studio Code, IntelliJ IDEA, PyCharm, Roblox Studio, Unity Engine, Unreal Engine, Godot, Blender, Davinci Resolve</li>
          <li><b className="text-white">Databases:</b> SQL, MongoDB</li>
          <li><b className="text-white">Version Control:</b> GitHub</li>
        </ul>
        <p className="text-lg leading-relaxed break-words">
          Whether it&apos;s designing unique gameplay mechanics, creating automation scripts, or creating user-focused applications, I thrive on bringing ideas to life with clean and efficient code.
        </p>

        {/* Past Work Experiences */}
        <h1 className="text-lg leading-relaxed font-bold break-words">Experiences</h1>
        <div>
          <Experience
            title="Lead Software Engineer"
            company="MineSprawl"
            dateRange="2024 - Present"
            description="MineSprawl is a Minecraft server I developed from the ground up using Minestom, a lightweight and flexible Java library for creating custom Minecraft servers. Designed as a city-building minigame, Minesprawl allows players to craft, expand, and manage their own virtual cities within a dynamic and engaging environment."
            link="https://minesprawl.net"
          />
          <Experience
            title="Software Engineer"
            company="Occulto Studios"
            dateRange="2024"
            description="Occulto is a feature-rich MMORPG Minecraft server built with Minestom, designed to push the boundaries of gameplay customization. Supporting cross-play between Java and Bedrock editions, Occulto unites players across platforms in a shared world of mystery and adventure."
            link="https://occulto.quest"
            discontinued={true}
          />
          <Experience
            title="Lead Developer"
            company="Valoria Studios"
            dateRange="2023 - 2024"
            description="Valoria is an open-world, adventure-driven RPG on Roblox, inspired by the anime The Vinland Saga. The game features a sprawling Viking-era landscape where players engage in dynamic combat, explore rich environments, and immerse themselves in a story of survival, conquest, and legacy. With a focus on skill-based mechanics, character progression, and a reactive world, Valoria combines thrilling battles with a deep, narrative-driven experience."
            discontinued={true}
          />
          <Experience
            title="Lead Software Engineer"
            company="SkySplit (Formerly Axolotl Gen)"
            dateRange="2021 - 2023"
            description="Skysplit is a dynamic Minecraft server where players embark on an exhilarating adventure across a network of floating islands suspended in the sky. Resource generators scattered across the islands provide essential materials, challenging players to venture out, harvest loot, and strategize their progression."
            discontinued={true}
          />
          <Experience
            title="Lead Software Engineer"
            company="ServerSetup"
            dateRange="2020 - 2021"
            description="ServerSetup is a Discord bot I developed using the discord.js library, designed to simplify server management. It empowers users to create and save templates for Discord servers and reuse them across new servers. It features an interactive setup prompt in order to customize any template to your given specifications"
          />
        </div>
      </div >
    </main >
  );
}
