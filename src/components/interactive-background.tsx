import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

interface InteractiveBackgroundProps {
    imageUrl?: string;
    defaultScale?: number;
    minScale?: number;
    maxScale?: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
    imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=1200&fit=crop",
    defaultScale = 1.2,
    minScale = 0.8,
    maxScale = 2.0
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(defaultScale);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Use refs to store current values to avoid dependency issues
    const positionRef = useRef(position);
    const scaleRef = useRef(scale);
    const mousePositionRef = useRef(mousePosition);

    // Update refs when state changes
    useEffect(() => {
        positionRef.current = position;
        scaleRef.current = scale;
        mousePositionRef.current = mousePosition;
    }, [position, scale, mousePosition]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Calculate normalized mouse position (-1 to 1)
        const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
        
        // Update mouse position
        setMousePosition({ x: normalizedX, y: normalizedY });
        
        // Calculate pan offset based on mouse position
        const panSensitivity = 50; // Adjust this value to control pan intensity
        const newPosition = {
            x: normalizedX * panSensitivity,
            y: normalizedY * panSensitivity
        };
        
        setPosition(newPosition);
    }, []);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(minScale, Math.min(maxScale, scaleRef.current * delta));
        
        // Calculate mouse position relative to image
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate zoom center
        const zoomCenterX = (mouseX - positionRef.current.x) / scaleRef.current;
        const zoomCenterY = (mouseY - positionRef.current.y) / scaleRef.current;
        
        // Update position to keep zoom center under mouse
        const newPosition = {
            x: mouseX - zoomCenterX * newScale,
            y: mouseY - zoomCenterY * newScale
        };
        
        setScale(newScale);
        setPosition(newPosition);
    }, [minScale, maxScale]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            
            // Calculate normalized touch position (-1 to 1)
            const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (touch.clientY / window.innerHeight) * 2 - 1;
            
            // Update mouse position
            setMousePosition({ x: normalizedX, y: normalizedY });
            
            // Calculate pan offset based on touch position
            const panSensitivity = 50;
            const newPosition = {
                x: normalizedX * panSensitivity,
                y: normalizedY * panSensitivity
            };
            
            setPosition(newPosition);
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        
        if (!container || !image) return;

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchmove', handleTouchMove);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handleMouseMove, handleWheel, handleTouchMove]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden select-none"
            style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)'
            }}
        >
            <Image
                ref={imageRef}
                src={imageUrl}
                alt="Interactive background"
                className="absolute w-full h-full object-cover transition-transform duration-100 ease-out blur-xs"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    willChange: 'transform'
                }}
                draggable={false}
                fill
            />
            
            {/* Optional overlay for better text readability */}
            <div 
                className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"
                style={{ pointerEvents: 'none' }}
            />
        </div>
    );
};
