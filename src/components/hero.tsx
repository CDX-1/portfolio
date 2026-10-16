import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import IntroList from "./intro-list";

export default function Hero() {
    return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-0 overflow-x-clip">
            <div className="flex flex-col">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tighter font-heading">
                    Hey, I'm Awsaf
                </h1>
                <IntroList />
            </div>

            {/* desktop has Resume in the navbar; phones only get the bottom tab bar */}
            <div className="flex flex-col items-start gap-3 self-start sm:hidden">
                <Link
                    href="/resume.pdf"
                    className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-200"
                    target="_blank"
                >
                    <span className="font-mono tabular-nums text-[10px] text-foreground/40 group-hover:text-foreground/60 transition-colors">
                        PDF
                    </span>
                    <span>View Resume</span>
                    <IconArrowUpRight
                        className="size-3.5 sm:size-4 stroke-[2] text-foreground/50 transition-transform duration-200 ease-out group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:text-foreground"
                        aria-hidden
                    />
                </Link>
            </div>
        </div>
    );
}
