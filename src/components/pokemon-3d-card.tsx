import React, { useState, useRef } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const Pokemon3DCard = ({
    frontImage = "https://images.pokemontcg.io/swsh9/154_hires.png",
    backImage = "https://images.pokemontcg.io/swsh9/154_back_hires.png",
    cardName = "Charizard",
    width = 245,
    height = 342
}) => {
    // Responsive card dimensions
    const getCardDimensions = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) { // sm
                return { width: 180, height: 252 };
            } else if (window.innerWidth < 768) { // md
                return { width: 200, height: 280 };
            } else if (window.innerWidth < 1024) { // lg
                return { width: 220, height: 308 };
            }
        }
        return { width, height };
    };

    const cardDimensions = getCardDimensions();
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [hasFlipped, setHasFlipped] = useState<boolean>(false);
    const [rotateX, setRotateX] = useState<number>(0);
    const [rotateY, setRotateY] = useState<number>(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;

        const rotateXValue = (mouseY / (rect.height / 2)) * -15;
        const rotateYValue = (mouseX / (rect.width / 2)) * 15;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        setHasFlipped(true);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative perspective-1000">
                    <div
                        ref={cardRef}
                        className="relative preserve-3d transition-all duration-500 ease-out cursor-pointer hover:scale-105"
                        style={{
                            width: `${cardDimensions.width}px`,
                            height: `${cardDimensions.height}px`,
                            transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
                            transformStyle: 'preserve-3d'
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                    >
                        {/* Front of card */}
                        <div
                            className="absolute inset-0 backface-hidden rounded-xl shadow-2xl overflow-hidden"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(0deg)'
                            }}
                        >
                            <img
                                src={frontImage}
                                alt={`${cardName} front`}
                                className="w-full h-full object-cover rounded-xl"
                                draggable={false}
                            />
                            {/* Holographic overlay effect */}
                            <div
                                className="absolute inset-0 opacity-20 rounded-xl"
                                style={{
                                    background: `linear-gradient(${(rotateX + rotateY) * 2}deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`
                                }}
                            />
                        </div>

                        {/* Back of card */}
                        <div
                            className="absolute inset-0 backface-hidden rounded-xl shadow-2xl overflow-hidden"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                            }}
                        >
                            <img
                                src={backImage}
                                alt={`${cardName} back`}
                                className="w-full h-full object-cover rounded-xl"
                                draggable={false}
                            />
                            {/* Holographic overlay effect for back */}
                            <div
                                className="absolute inset-0 opacity-20 rounded-xl"
                                style={{
                                    background: `linear-gradient(${(rotateX + rotateY) * -2}deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`
                                }}
                            />
                        </div>

                        {/* Glow effect */}
                        <div
                            className="absolute -inset-2 rounded-xl opacity-25 blur-lg"
                            style={{
                                background: `conic-gradient(from ${(rotateX + rotateY) * 4}deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffd93d, #ff6b6b )`
                            }}
                        />
                    </div>
                </div>
            </TooltipTrigger>

            {!hasFlipped && (
                <TooltipContent>
                    Click to flip
                </TooltipContent>
            )}

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
            `}</style>
        </Tooltip>
    );
};
