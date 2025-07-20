'use client';

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconArrowRight, IconBrain, IconFolderHeart, IconHammer, IconHome, IconMail, IconMoon, IconSun } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function Navbar() {
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();
    const [showProjects, setShowProjects] = useState(false);
    const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const directory = [
        {
            label: "home",
            icon: <IconHome />,
            path: "/"
        },
        {
            label: "about",
            icon: <IconBrain />,
            path: "/about"
        },
        {
            label: "projects",
            icon: <IconHammer />
        },
        {
            label: "contact",
            icon: <IconMail />,
            path: "/contact"
        }
    ];

    const projects = [
        {
            name: "Loft",
            description: "A spotlight search utility for Windows that prioritizes efficiency and design.",
            path: "/projects/loft",
            visit: "https://loft.cdx.rip"
        },
        {
            name: "The Card Game",
            description: "A fun gacha-inspired game revolving around collecting virtual Pokemon cards.",
            path: "/projects/cards",
            visit: "https://cards.cdx.rip"
        }
    ];

    const swapTheme = () => {
        if (resolvedTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    const handleProjectsMouseEnter = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setShowProjects(true);
    };

    const handleProjectsMouseLeave = () => {
        hideTimeoutRef.current = setTimeout(() => {
            if (!isHoveringDropdown) {
                setShowProjects(false);
            }
        }, 150);
    };

    const handleDropdownMouseEnter = () => {
        setIsHoveringDropdown(true);
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    };

    const handleDropdownMouseLeave = () => {
        setIsHoveringDropdown(false);
        setShowProjects(false);
    };

    return (
        <div className="absolute left-0 top-4 md:top-8 w-full flex justify-center z-50 px-4">
            <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-10 py-2 md:py-4">
                {directory.map((d) => (
                    <Button key={d.label} variant="ghost" className="hover:bg-transparent hover:text-accent hover:cursor-pointer dark:hover:bg-transparent dark:hover:text-accent dark:hover:cursor-pointer px-2 md:px-3"
                        onClick={() => { if (d.path !== null) router.push(d.path as string) }}
                        onMouseEnter={() => {
                            if (d.label === "projects") handleProjectsMouseEnter()
                        }}
                        onMouseLeave={() => {
                            if (d.label === "projects") handleProjectsMouseLeave()
                        }}
                    >
                        <span className="font-mono text-xs md:text-sm lg:text-md hidden sm:block">{d.label}</span>
                        <span className="font-mono text-xs sm:hidden">{d.icon}</span>
                    </Button>
                ))}
                <Button variant="ghost" size="icon" onClick={swapTheme} className="hover:bg-transparent hover:text-accent hover:cursor-pointer dark:hover:bg-transparent dark:hover:text-accent dark:hover:cursor-pointer">
                    {resolvedTheme === "dark" ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
                </Button>
            </div>

            {/* Projects Dropdown - positioned outside the flex container */}
            {showProjects && (
                <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-120 bg-card p-2 rounded-2xl z-50 shadow-xs"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                >
                    <div className="grid grid-cols-2 gap-3">
                        {projects.map((project) => (
                            <div key={project.name} className="flex flex-col space-y-2 px-4 py-3 rounded-md hover:bg-background hover:cursor-pointer hover:shadow-xs">
                                <div className="flex items-center justify-between w-full" onClick={() => router.push(project.path)}>
                                    <h3 className="font-mono font-bold text-sm">
                                        {project.name}
                                    </h3>
                                    <Button className="p-0! hover:text-accent hover:cursor-pointer" variant="link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(project.visit);
                                        }}
                                    ><IconArrowRight /></Button>
                                </div>
                                <p className="text-xs">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}