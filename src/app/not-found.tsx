import { IconArrowUpRight, IconMapPinOff } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center min-h-[70vh] px-4 md:px-0 max-w-2xl mx-auto w-full">
            <span className="text-sm font-mono tracking-widest uppercase text-foreground/40 mb-2 block">
                Error 404
            </span>

            <h1 className="text-5xl font-medium tracking-tight font-bespoke mb-3">
                Page Not Found
            </h1>
            
            <h2 className="text-3xl font-medium tracking-tight text-foreground/50 font-satoshi max-w-xl leading-snug">
                Looks like you've wandered off the grid. The page you're looking for doesn't exist.
            </h2>

            <div className="flex items-center space-x-2 text-foreground/40 mt-6">
                <IconMapPinOff className="w-5 h-5" stroke={1.5} />
                <span className="text-base font-medium font-satoshi">Lost in Toronto</span>
            </div>

            <hr className="border-foreground/10 my-8 w-full" />

            <div>
                <Link 
                    href="/" 
                    className="inline-flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors duration-200 group"
                >
                    <span className="text-xl font-medium font-satoshi">
                        Go Back Home
                    </span>
                    <IconArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" stroke={1.5} />
                </Link>
            </div>
        </div>
    );
}