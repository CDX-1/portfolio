"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaBriefcase, FaEnvelope, FaHouse, FaWandMagicSparkles } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [, setColor] = useState("#ffffff");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu on mobile

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

    return (
        <nav className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-background bg-opacity-50 w-full md:w-auto rounded-lg p-2 flex items-center justify-between drop-shadow-lg">
            {/* Logo or Home button */}
            <Link href="/">
                <Button variant="link" className="text-silent hover:text-gray-600 hover:dark:text-white">
                    <FaHouse />
                    Home
                </Button>
            </Link>

            {/* Hamburger Menu Icon (visible on small screens) */}
            <div className="md:hidden">
                <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? "Close" : "Menu"} {/* You can use an icon like Hamburger here */}
                </Button>
            </div>

            {/* Links - hidden on small screens, displayed on medium and larger screens */}
            <div className={`flex-1 md:flex justify-center items-center space-x-4 ${isMenuOpen ? "block" : "hidden"} md:block`}>
                <Link href="/projects">
                    <Button variant="link" className="text-silent hover:text-gray-600 hover:dark:text-white">
                        <FaBriefcase />
                        Projects
                    </Button>
                </Link>
                <Link href="/showcase">
                    <Button variant="link" className="text-silent hover:text-gray-600 hover:dark:text-white">
                        <FaWandMagicSparkles />
                        Showcase
                    </Button>
                </Link>
                <Link href="/contact">
                    <Button variant="link" className="text-silent hover:text-gray-600 hover:dark:text-white">
                        <FaEnvelope />
                        Contact
                    </Button>
                </Link>
            </div>

            {/* Theme Toggle Button */}
            <Button variant="ghost" onClick={() => { setTheme(theme === "dark" ? "light" : "dark") }}>
                {theme === "light" ? (
                    <Sun className="size-full scale-150 group group-hover:scale-[1.5] duration-300" />
                ) : (
                    <Moon className="size-full scale-150 group group-hover:scale-[1.5] duration-300" />
                )}
            </Button>
        </nav>
    );
}
