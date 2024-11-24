"use client";

import { useEffect } from "react";

const Glow = () => {
    useEffect(() => {
        const glow = document.getElementById("glow");

        document.body.onpointermove = (event) => {
            const { clientX, clientY } = event;
        
            if (glow) {
                glow.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, 3000)
            }
        };
        
    });

    return (
        <div className="pointer-events-none">
            <div id="glow" className="bg-transparent dark:bg-gradient-to-r from-white to-gray-500 h-[300px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.8] rounded-full aspect-square animate-rotate blur-[200px] z-[-2]"></div>
        </div>
    )
}

export default Glow;