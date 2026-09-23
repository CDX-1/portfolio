import {
    IconArrowUpRight,
    IconCandleFilled,
    IconClockFilled,
    IconMapPinFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import BrandStar from "./brand-star";
import LocalClock from "./local-clock";

export default function Hero() {
    return (
        <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-6 md:gap-0">
            <div className="flex flex-col">
                <span className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="tabular-nums text-foreground/55">00</span>
                    <span className="h-px w-6 bg-foreground/15" aria-hidden />
                    Introduction
                    <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
                </span>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight font-bespoke">
                    Hey, I'm Awsaf
                </h1>
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-foreground/55 font-satoshi mt-1">
                    I'm a developer and designer
                </h2>
                <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-foreground/40 font-satoshi mt-0.5">
                    Aspiring Computer Engineer
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:space-x-8 gap-4 md:gap-0 text-foreground/70 mt-6">
                    <div className="flex items-center space-x-2">
                        <IconCandleFilled className="size-5 sm:size-6 text-foreground/45" />
                        <span className="text-base sm:text-lg font-medium tabular-nums">
                            16 years old
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <IconMapPinFilled className="size-5 sm:size-6 text-foreground/45" />
                        <span className="text-base sm:text-lg font-medium">
                            Toronto, ON
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <IconClockFilled className="size-5 sm:size-6 text-foreground/45" />
                        <LocalClock className="text-base sm:text-lg font-medium tabular-nums" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 self-start md:self-auto">
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
