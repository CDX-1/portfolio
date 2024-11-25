"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaBriefcase, FaDiscord, FaEnvelope, FaGithub, FaHouse, FaWandMagicSparkles, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function Footer() {
    const { theme } = useTheme();

    const links = [
        {
            name: "Home",
            icon: <FaHouse />,
            href: "/"
        },
        {
            name: "Projects",
            icon: <FaBriefcase />,
            href: "/projects"
        },
        {
            name: "Showcase",
            icon: <FaWandMagicSparkles />,
            href: "/showcase"
        },
        {
            name: "Contact",
            icon: <FaEnvelope />,
            href: "/contact"
        }
    ];

    const socials = [
        {
            name: "GitHub",
            icon: <FaGithub />,
            href: "https://github.com/CDX-1"
        },
        {
            name: "YouTube",
            icon: <FaYoutube />,
            href: "https://www.youtube.com/@rarecdx"
        },
        {
            name: "Twitter",
            icon: <FaXTwitter />,
            href: "https://www.youtube.com/@rarecdx"
        },
        {
            name: "Discord",
            icon: <FaDiscord />,
            href: "https://discord.gg/invite/W8ssCC5QBC"
        }
    ];

    return (
        <footer className="bg-background py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        {
                            theme == "light" &&
                            <Image
                                src="/logo-black.png" height={150} width={150} alt="Logo"
                            />
                        }
                        {
                            theme == "dark" &&
                            <Image
                                src="/logo-white.png" height={150} width={150} alt="Logo"
                            />
                        }
                    </div>

                    <div className="hidden sm:flex flex-col">
                        {links.map((item) => (
                            <Link href={item.href} key={item.name}>
                                <Button variant="link">
                                    {item.icon}
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden sm:flex flex-col">
                        {socials.map((item) => (
                            <Link href={item.href} key={item.name}>
                                <Button variant="link">
                                    {item.icon}
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <div className="flex sm:hidden">
                        <div>
                            {links.map((item) => (
                                <Link href={item.href} key={item.name}>
                                    <Button variant="link">
                                        {item.icon}
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                        <div>
                            {socials.map((item) => (
                                <Link href={item.href} key={item.name}>
                                    <Button variant="link">
                                        {item.icon}
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} CDX. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
