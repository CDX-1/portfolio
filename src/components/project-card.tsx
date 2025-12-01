'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { MotionImage } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa6';
import Link from 'next/link';

interface Links {
    github?: string;
}

interface ProjectProps {
    id: string;
    title: string;
    description: string;
    tags: string[];
    links?: Links;
    image: string;
    backdrop: string;
}

export const ProjectCard = ({
    id,
    title,
    description,
    tags,
    links = {},
    image,
    backdrop,
}: ProjectProps) => {
    return (
        <motion.div
            className="flex flex-col space-y-2 hover:cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover="hover"
        >
            <Link href={`/projects/${id}`}>
                <motion.div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                    <MotionImage
                        src={backdrop}
                        alt={`${title} backdrop`}
                        variants={{
                            hover: {
                                scale: 1.02,
                                transition: {
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        className="object-cover brightness-50"
                        fill
                    />

                    <motion.div
                        variants={{
                            hover: {
                                y: -10,
                                transition: {
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={image}
                            alt={`${title} main`}
                            fill
                            className="object-cover rounded-lg scale-[85%]"
                        />
                    </motion.div>
                </motion.div>
            </Link>

            <div className="flex flex-col px-4 py-4 space-y-4">
                <Link href={`/projects/${id}`}>
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                        <h1 className="font-bold text-lg text-left">{title}</h1>
                        <p className="font-mono text-sm text-muted-foreground text-left md:text-right">
                            {description}
                        </p>
                    </div>
                </Link>

                <div className="flex flex-row justify-between items-center gap-4">
                    <Link href={`/projects/${id}`} className="flex-1 min-w-0">
                        <div className="flex flex-nowrap gap-2 items-center overflow-hidden mask-linear-fade">
                            {tags.map((tag, i) => {
                                const bg = [
                                    'bg-chart-1/20',
                                    'bg-chart-2/20',
                                    'bg-chart-3/20',
                                    'bg-chart-4/20',
                                    'bg-chart-5/20',
                                ][i % 5];

                                return (
                                    <span
                                        key={tag}
                                        className={`inline-block ${bg} text-accent text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap`}
                                    >
                                        {tag.toLowerCase()}
                                    </span>
                                );
                            })}
                        </div>
                    </Link>

                    <div className="shrink-0">
                        {links.github && (
                            <a
                                href={links.github}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button
                                    variant="link"
                                    className="!px-0 !py-0 h-auto"
                                >
                                    <FaGithub />
                                    <span className="hidden md:block">
                                        github
                                    </span>
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
