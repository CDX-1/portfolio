import { IconArrowUpRight, IconCandleFilled, IconClockFilled, IconMapPinFilled } from "@tabler/icons-react"
import LocalClock from "./local-clock";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <h1 className="text-5xl font-medium tracking-tight font-bespoke">
                    Hey, I'm Awsaf
                </h1>
                <h2 className="text-4xl font-medium tracking-tight text-foreground/50 font-satoshi">
                    I'm a developer and designer
                </h2>
                <h2 className="text-3xl font-medium tracking-tight text-foreground/50 font-satoshi">
                    Aspiring Computer Engineer
                </h2>

                <div className="flex space-x-8 text-foreground/50 mt-6">
                    <div className="flex items-center space-x-2">
                        <IconCandleFilled className="size-6 text-foreground/65" />
                        <span className="text-lg font-medium">16 years old</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <IconMapPinFilled className="size-6 text-foreground/65" />
                        <span className="text-lg font-medium">Toronto, ON</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <IconClockFilled className="size-6 text-foreground/65" />
                        <LocalClock className="text-lg font-medium" />
                    </div>
                </div>
            </div>
            <Link href="/resume.pdf" target="_blank" className="my-6 flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors duration-200">
                <span className="text-xl font-medium">
                    View Resume
                </span>

                <IconArrowUpRight className="size-7" />
            </Link>
        </div>
    );
}