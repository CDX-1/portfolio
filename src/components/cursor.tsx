'use client';

import { useEffect, useRef } from 'react';

export function Cursor() {
    const blobRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    const pos = useRef({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    });
    const target = useRef({ x: pos.current.x, y: pos.current.y });
    const visual = useRef({ scaleX: 1, scaleY: 1, angleDeg: 0 });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        pos.current.x = window.innerWidth / 2;
        pos.current.y = window.innerHeight / 2;
        target.current.x = pos.current.x;
        target.current.y = pos.current.y;

        const blob = blobRef.current!;

        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            blob.style.opacity = '1';
        };

        const render = () => {
            const ease = 0.12;

            const dx = target.current.x - pos.current.x;
            const dy = target.current.y - pos.current.y;
            const speed = Math.hypot(dx, dy);
            const desiredAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            pos.current.x += dx * ease;
            pos.current.y += dy * ease;

            const maxStretch = 1.1;
            const stretch = Math.min(speed / 120, maxStretch);
            const desiredScaleX = 1 + stretch;
            const desiredScaleY = 1 - Math.min(stretch * 0.7, 0.45);

            const follow = 0.28;
            visual.current.scaleX +=
                (desiredScaleX - visual.current.scaleX) * follow;
            visual.current.scaleY +=
                (desiredScaleY - visual.current.scaleY) * follow;

            const current = visual.current.angleDeg;
            let delta = desiredAngle - current;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;
            visual.current.angleDeg = current + delta * follow;

            blob.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${visual.current.angleDeg}deg) scale(${visual.current.scaleX}, ${visual.current.scaleY})`;
            rafRef.current = requestAnimationFrame(render);
        };

        const onLeave = () => {
            blob.style.opacity = '0';
        };
        const onEnter = () => {
            blob.style.opacity = '1';
        };

        document.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);
        window.addEventListener('mouseenter', onEnter);

        rafRef.current = requestAnimationFrame(render);

        return () => {
            document.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
            window.removeEventListener('mouseenter', onEnter);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const interactiveSelector =
            'a, button, input, textarea, select, [role="button"]';

        const onMouseEnter = () =>
            document.body.classList.add('show-native-cursor');
        const onMouseLeave = () =>
            document.body.classList.remove('show-native-cursor');

        document.querySelectorAll(interactiveSelector).forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        return () => {
            document.querySelectorAll(interactiveSelector).forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <div
            ref={blobRef}
            aria-hidden
            className="custom-cursor-blob pointer-events-none fixed z-[9999] left-0 top-0 w-8 h-8 rounded-full bg-white mix-blend-difference opacity-0 transition-opacity duration-300"
            style={{
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
                filter: 'blur(0.2px)',
                transformOrigin: '50% 50%',
            }}
        />
    );
}
