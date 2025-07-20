export default function CameraViewfinder() {
    const cornerStyles: Record<string, string> = {
        "top-left": `top-4 md:top-10 left-4 md:left-10 border-t-2 border-l-2`,
        "top-right": `top-4 md:top-10 right-4 md:right-10 border-t-2 border-r-2`,
        "bottom-left": `bottom-4 md:bottom-10 left-4 md:left-10 border-b-2 border-l-2`,
        "bottom-right": `bottom-4 md:bottom-10 right-4 md:right-10 border-b-2 border-r-2`,
    };

    return (
        <>
            <div className="absolute inset-0 pointer-events-none z-50">
                {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
                    <div
                        key={corner}
                        className={`
                            absolute w-16 h-16 md:w-30 md:h-30 
                            border-black dark:border-white
                            ${cornerStyles[corner]}
                        `}
                    />
                ))}
            </div>
        </>
    );
}