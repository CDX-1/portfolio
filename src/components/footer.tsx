"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaBriefcase, FaDiscord, FaEnvelope, FaGithub, FaHouse, FaWandMagicSparkles, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function Footer() {
    const { theme } = useTheme();

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


                    <div className="flex flex-col">
                        <Link href="/">
                            <Button variant="link">
                                <FaHouse />
                                Home
                            </Button>
                        </Link>

                        <Link href="/projects">
                            <Button variant="link">
                                <FaBriefcase />
                                Projects
                            </Button>
                        </Link>

                        <Link href="/showcase">
                            <Button variant="link">
                                <FaWandMagicSparkles />
                                Showcase
                            </Button>
                        </Link>

                        <Link href="/contact">
                            <Button variant="link">
                                <FaEnvelope />
                                Contact
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-col">
                        <Link href="https://github.com/CDX-1">
                            <Button variant="link">
                                <FaGithub />
                                GitHub
                            </Button>
                        </Link>

                        <Link href="https://www.youtube.com/@rarecdx">
                            <Button variant="link">
                                <FaYoutube />
                                YouTube
                            </Button>
                        </Link>

                        <Link href="https://x.com/cdxdev">
                            <Button variant="link">
                                <FaXTwitter />
                                Twitter
                            </Button>
                        </Link>

                        <Link href="https://discord.gg/invite/W8ssCC5QBC">
                            <Button variant="link">
                                <FaDiscord />
                                Discord
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} CDX. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
