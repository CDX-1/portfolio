"use client";

import { useEffect } from "react";

const Glow = () => {
    useEffect(() => {
        const glow = document.getElementById("glow");

        document.body.onpointermove = event => {
            const { pageX, pageY } = event;

            if (glow) {
                glow.animate({
                    left: `${pageX - window.scrollX}px`,
                    top: `${pageY - window.scrollY}px`
                }, { duration: 2000, fill: 'forwards' });
            }
        }; 
    });

    return (
        <div className="pointer-events-none">
            <div id="glow" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.8] rounded-full aspect-square absolute animate-rotate blur-[200px] z-[-2]"></div>
        </div>
    )
}

export default Glow;