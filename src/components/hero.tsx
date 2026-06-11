import { IconArrowUpRight, IconCandleFilled, IconClockFilled, IconMapPinFilled } from "@tabler/icons-react"
import LocalClock from "./local-clock";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-6 md:gap-0">
            <div className="flex flex-col">
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight font-bespoke">
                    Hey, I'm Awsaf
                </h1>
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-foreground/50 font-satoshi mt-1">
                    I'm a developer and designer
                </h2>
                <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-foreground/50 font-satoshi mt-0.5">
                    Aspiring Computer Engineer
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:space-x-8 gap-4 md:gap-0 text-foreground/50 mt-6">
                    <div className="flex items-center space-x-2">
                        <IconCandleFilled className="size-5 sm:size-6 text-foreground/65" />
                        <span className="text-base sm:text-lg font-medium">16 years old</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <IconMapPinFilled className="size-5 sm:size-6 text-foreground/65" />
                        <span className="text-base sm:text-lg font-medium">Toronto, ON</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <IconClockFilled className="size-5 sm:size-6 text-foreground/65" />
                        <LocalClock className="text-base sm:text-lg font-medium" />
                    </div>
                </div>
            </div>

            <Link
                href="/resume.pdf"
                className="inline-flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors duration-200 group self-start md:self-auto"
                target="_blank"
            >
                <span className="text-lg sm:text-xl font-medium font-satoshi">
                    View Resume
                </span>
                <IconArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" stroke={1.5} />
            </Link>
        </div>
    );
}