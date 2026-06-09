'use client';

import { IconZoomInFilled } from '@tabler/icons-react';
import { useState } from 'react';

interface ImageCarouselProps {
    images: string[];
    height?: string;
}

export function ImageCarousel({ images, height = 'h-80' }: ImageCarouselProps) {
    const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);

    if (!images.length) {
        return (
            <div
                className={`w-full bg-muted rounded-2xl flex items-center justify-center text-muted-foreground text-sm ${height}`}
            >
                No images to display
            </div>
        );
    }

    return (
        <>
            <div className={`relative w-full overflow-hidden rounded-2xl bg-background ${height}`}>
                <div className="flex h-full overflow-x-auto snap-x snap-mandatory gap-4">
                    {images.map((src, index) => (
                        <div
                            key={src + index}
                            onClick={() => setEnlargedIndex(index)}
                            className="snap-center shrink-0 h-full flex items-center cursor-zoom-in"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setEnlargedIndex(index);
                                }
                            }}
                        >
                            <img
                                src={src}
                                alt={`Screenshot ${index + 1}`}
                                className="h-full w-auto rounded-xl shadow-sm select-none pointer-events-none"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {enlargedIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setEnlargedIndex(null)}
                >
                    <button
                        onClick={() => setEnlargedIndex(null)}
                        className="absolute top-4 right-4 z-10 rounded-full bg-background/20 hover:bg-background/40 text-white p-2 transition-colors"
                        aria-label="Close enlarged image"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <img
                        src={images[enlargedIndex]}
                        alt={`Enlarged screenshot ${enlargedIndex + 1}`}
                        className="max-w-full max-h-full object-contain rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            <div className="flex items-center gap-2 mt-4">
                <IconZoomInFilled className="text-muted-foreground w-4 h-4" />
                <p className="text-sm text-foreground/70 tracking-tight font-medium">Click to zoom in</p>
            </div>
        </>
    );
}