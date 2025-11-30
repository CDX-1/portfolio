'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Blinker } from '@/components/blinker';
import { TypewriterText } from '@/components/typewriter-text';

interface NavItem {
    title: string;
    icon: ReactNode;
    href: string;
}

export default function Navbar({ items }: { items: NavItem[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const [paths, setPaths] = useState<string[]>([]);
    const [exitingPaths, setExitingPaths] = useState<string[]>([]);
    const [exitingStart, setExitingStart] = useState<number | null>(null);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [sliderStyle, setSliderStyle] = useState<{
        width: number;
        left: number;
    }>({ width: 0, left: 0 });
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const updateSliderPosition = (index: number) => {
        const element = itemRefs.current[index];
        if (element) {
            const parent = element.parentElement;
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                const isThemeToggle = index === items.length;
                const extraWidth = isThemeToggle && theme === 'light' ? 2 : 0;
                setSliderStyle({
                    width: elementRect.width + extraWidth,
                    left: elementRect.left - parentRect.left,
                });
            }
        }
    };

    useEffect(() => {
        if (hoveredIndex !== null) {
            updateSliderPosition(hoveredIndex);
        }
    }, [hoveredIndex, theme]);

    const commonPrefixLength = (a: string[], b: string[]) => {
        const n = Math.min(a.length, b.length);
        let i = 0;
        for (; i < n; i++) {
            if (a[i] !== b[i]) break;
        }
        return i;
    };

    useEffect(() => {
        const newPaths = pathname.split('/').filter((s) => s !== '');
        if (paths.length === 0) {
            setPaths(newPaths);
            return;
        }

        const common = commonPrefixLength(paths, newPaths);

        if (newPaths.length < paths.length) {
            const trailing = paths.slice(common);
            setExitingStart(common);
            setExitingPaths(trailing);

            const delayMs = trailing.length * 50 + 300;
            setTimeout(() => {
                setPaths(newPaths);
                setExitingPaths([]);
                setExitingStart(null);
            }, delayMs);
        } else {
            setPaths(newPaths);
        }
    }, [pathname]);

    const lastIndex = exitingStart !== null
        ? exitingStart + (exitingPaths.length - 1)
        : paths.length - 1;

    return (
        <div className="fixed left-0 right-0 backdrop-blur-xs w-11/12 flex items-center justify-between font-mono mx-auto mt-6 z-10">
            <h1 className="flex">
                <span>/</span>
                <span
                    className="cursor-pointer hover:text-accent font-bold duration-100 ease-in-out"
                    onClick={() => router.push('/')}
                >
                    cdx
                </span>
                <span>/</span>

                <AnimatePresence>
                    {(() => {
                        const commonCount =
                            exitingStart !== null ? exitingStart : paths.length;
                        const commonSource =
                            exitingStart !== null
                                ? pathname.split('/').filter((s) => s !== '')
                                : paths;

                        const commonPrefix = commonSource.slice(0, commonCount);

                        return (
                            <>
                                {commonPrefix.map((segment, i) => {
                                    const href = '/' + commonSource.slice(0, i + 1).join('/');
                                    const showSlash = i < lastIndex;
                                    return (
                                        <motion.div
                                            key={href}
                                            initial={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span
                                                className="cursor-pointer hover:text-accent transition-colors duration-100 ease-in-out"
                                                onClick={() => {
                                                    if (href === pathname) return;
                                                    router.push(href);
                                                }}
                                            >
                                                <TypewriterText
                                                    text={segment}
                                                    delay={i * 50}
                                                    isExiting={false}
                                                />
                                            </span>
                                            {showSlash && (
                                                <span className="cursor-pointer hover:text-accent transition-colors duration-100 ease-in-out">
                                                    /
                                                </span>
                                            )}
                                        </motion.div>
                                    );
                                })}

                                {exitingStart !== null &&
                                    exitingPaths.map((segment, j) => {
                                        const idx = exitingStart + j;
                                        const href = '/' + paths.slice(0, idx + 1).join('/');
                                        const isLast = idx === lastIndex;
                                        return (
                                            <motion.div
                                                key={href}
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{
                                                    duration: 0.2,
                                                    // stagger exit so tail disappears last-first
                                                    delay: (exitingPaths.length - j - 1) * 0.05,
                                                }}
                                            >
                                                <span
                                                    className="cursor-pointer hover:text-accent transition-colors duration-100 ease-in-out"
                                                    onClick={() => {
                                                        if (href === pathname) return;
                                                        router.push(href);
                                                    }}
                                                >
                                                    <TypewriterText
                                                        text={segment}
                                                        delay={idx * 50}
                                                        isExiting={true}
                                                    />
                                                </span>
                                                {!isLast && (
                                                    <span className="cursor-pointer hover:text-accent transition-colors duration-100 ease-in-out">
                                                        /
                                                    </span>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                            </>
                        );
                    })()}
                </AnimatePresence>

                <Blinker />
            </h1>

            <div className="relative flex items-center space-x-4">
                <div
                    className="absolute h-full bg-secondary rounded-xl transition-all duration-300 ease-in-out pointer-events-none"
                    style={{
                        width: `${sliderStyle.width}px`,
                        left: `${sliderStyle.left}px`,
                        opacity: hoveredIndex !== null ? 1 : 0,
                    }}
                />

                {items.map((item, index) => (
                    <Button
                        key={item.title}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        variant="link"
                        className="flex items-center gap-2 hover:no-underline group relative z-10 text-secondary-foreground"
                        onClick={() => router.push(item.href)}
                        onMouseEnter={() => {
                            setHoveredIndex(index);
                            updateSliderPosition(index);
                        }}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <span className="transition-all duration-300 ease-in-out translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                            {item.icon}
                        </span>
                        <span>{item.title}</span>
                    </Button>
                ))}

                <Button
                    ref={(el) => {
                        itemRefs.current[items.length] = el;
                    }}
                    variant="link"
                    className="flex items-center gap-2 ml-4 hover:no-underline group relative z-10"
                    onMouseEnter={() => {
                        const moonIndex = items.length;
                        setHoveredIndex(moonIndex);
                        updateSliderPosition(moonIndex);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                        if (theme === 'light') {
                            setTheme('dark');
                        } else {
                            setTheme('light');
                        }
                    }}
                >
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                    <span className="transition-all duration-300 ease-in-out translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 capitalize">
                        {theme || 'light'}
                    </span>
                </Button>
            </div>
        </div>
    );
}
