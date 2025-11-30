'use client';

import { Button } from '@/components/ui/button';
import { FaGithub, FaYoutube } from 'react-icons/fa6';
import Link from 'next/link';
import { TbBrandFiverr } from 'react-icons/tb';
import { motion } from 'motion/react';

export default function Statement() {
    const items = [
        {
            label: 'github',
            icon: <FaGithub />,
            href: 'https://github.com/CDX-1',
        },
        {
            label: 'youtube',
            icon: <FaYoutube />,
            href: 'https://www.youtube.com/@rarecdx',
        },
        {
            label: 'fiverr',
            icon: <TbBrandFiverr />,
            href: 'https://www.fiverr.com/cdxdev_',
        },
    ];

    return (
        <div className="space-y-6 font-mono">
            <h1 className="text-5xl font-semibold">
                Heyo! I&apos;m{' '}
                <span className="text-6xl font-bold text-accent">CDX</span>
            </h1>

            <p className="text-xl max-w-4/7 leading-8">
                I’m a{' '}
                <span className="text-accent font-semibold">16-year-old</span>,
                fully self-taught{' '}
                <span className="text-accent font-semibold">full-stack</span>{' '}
                developer from{' '}
                <span className="text-accent font-semibold">
                    Ontario, Canada
                </span>
                . I prioritize beautiful{' '}
                <span className="text-accent font-semibold">design</span>{' '}
                balanced with{' '}
                <span className="text-accent font-semibold">clean</span> and{' '}
                <span className="text-accent font-semibold">efficient</span>{' '}
                code.
            </p>

            <div className="flex justify-between max-w-4/7">
                <div className="flex items-center divide-x divide-foreground/10">
                    {items.map((item) => (
                        <Link
                            href={item.href}
                            key={item.label}
                            target="_blank"
                            className="px-4 first:pl-0 last:pr-0"
                        >
                            <Button
                                className="!px-0 text-foreground hover:text-accent duration-150"
                                variant="link"
                                size="sm"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>

                <div className="relative flex items-center space-x-4">
                    <span className="relative flex h-4 w-4">
                        {' '}
                        <motion.span
                            className="absolute inline-flex h-full w-full rounded-full bg-green-500"
                            style={{ willChange: 'transform, opacity' }}
                            animate={{
                                scale: [1, 1.5, 2.3],
                                opacity: [0.8, 0.4, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        />{' '}
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />{' '}
                    </span>

                    <p className="text-lg font-bold">Open to work</p>
                </div>
            </div>
        </div>
    );
}
