'use client';
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Link
            href={href}
            className="font-semibold text-2xl drop-shadow-md font-foss relative flex items-center text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <motion.span
                className="absolute -left-4"
                initial={{ opacity: 0, x: 4 }}
                animate={{
                    opacity: isHovered ? 0.75 : 0,
                    x: isHovered ? 0 : 4
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                (
            </motion.span>
            
            <motion.span
                initial={{ opacity: 1}}
                animate={{
                    opacity: isHovered ? 0.75 : 1
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {label}
            </motion.span>
            <motion.span
                className="absolute -right-4"
                initial={{ opacity: 0, x: -4 }}
                animate={{
                    opacity: isHovered ? 0.75 : 0,
                    x: isHovered ? 0 : -4
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                )
            </motion.span>
        </Link>
    );
};

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const tabs = [
        {
            label: "home",
            href: "/"
        },
        {
            label: "projects",
            href: "/projects"
        }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <motion.button
                className="dark fixed top-6 right-6 z-50 w-12 h-12 bg-background/90 rounded-xl flex flex-col items-center justify-center gap-1.5 pointer-events-auto"
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.span
                    className="w-6 h-0.5 bg-white rounded-full"
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 4 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-white rounded-full"
                    animate={{
                        opacity: isOpen ? 0 : 1,
                        x: isOpen ? -10 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-white rounded-full"
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -4 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeMenu}
                        />

                        <motion.div
                            className="dark fixed top-20 right-6 w-64 bg-background/95 backdrop-blur-md z-40 pointer-events-auto shadow-2xl rounded-2xl"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        >
                            <nav className="flex flex-col items-start py-8 px-10 gap-6">
                                {tabs.map((tab, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ 
                                            duration: 0.3, 
                                            delay: i * 0.1 + 0.1,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <NavLink 
                                            href={tab.href} 
                                            label={tab.label}
                                            onClick={closeMenu}
                                        />
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};