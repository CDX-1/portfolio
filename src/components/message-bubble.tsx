import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    text?: string;
    className?: string;
    textClassName?: string;
}

export default function MessageBubble({ text = "Hello!", className, textClassName }: MessageBubbleProps) {
    return (
        <div className={cn("relative inline-flex filter drop-shadow-2xl", className)}>
            <div
                className={cn(
                    "bg-linear-to-b from-[#2694ff] to-[#0176ff] text-white font-sans text-[16px] font-normal leading-5 px-4 py-2.5 rounded-[20px] rounded-br-[4px] max-w-xs sm:max-w-md select-text wrap-break-word",
                    textClassName
                )}
            >
                {text}
            </div>

            <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 right-[-8px] pointer-events-none"
            >
                <defs>
                    <linearGradient id="bubble-tail-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0b83ff" />
                        <stop offset="100%" stopColor="#0176ff" />
                    </linearGradient>
                </defs>
                <path
                    d="M0 16 C4 16 9 15 11 12 C7 11 3 6 0 0 V16 Z"
                    fill="url(#bubble-tail-grad)"
                />
            </svg>
        </div>
    );
}