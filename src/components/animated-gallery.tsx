"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

type GalleryImage = {
    path: string;
    caption?: string;
    aspectRatio?: string;
};

export function AnimatedGallery({ gallery, title }: { gallery: GalleryImage[]; title: string }) {
    return (
        <motion.div 
            className="lg:col-span-1 lg:mt-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
            <h3 className="text-xl md:text-2xl font-bold font-foss text-foreground mb-6 lg:hidden">
                Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8 lg:sticky lg:top-32">
                {gallery.map((image, index) => (
                    <motion.div 
                        key={index} 
                        className="flex flex-col gap-3 group"
                        variants={fadeInUp}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div
                            className={cn(
                                "relative w-full rounded-xl overflow-hidden border border-border bg-muted/20",
                                !image.aspectRatio && "aspect-video"
                            )}
                            style={image.aspectRatio ? { aspectRatio: image.aspectRatio } : undefined}
                        >
                            <Image
                                src={`/projects/assets/${image.path}`}
                                alt={image.caption || `${title} gallery image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {image.caption && (
                            <motion.p 
                                className="text-xs text-muted-foreground font-mono leading-tight"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {image.caption}
                                <sub className="ml-2 align-center opacity-70">
                                    [{index + 1}]
                                </sub>
                            </motion.p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}