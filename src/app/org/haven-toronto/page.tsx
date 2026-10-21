import {
    IconArrowUpRight,
    IconCalendarEvent,
    IconPizza,
    IconTrophy,
    IconUsersGroup,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SIGNUP_URL = "https://haven.hackclub.com/toronto";

export const metadata: Metadata = {
    title: "Haven Toronto — awsaf.dev",
    description:
        "A Hack Club game jam in Toronto for 150+ high schoolers, starting November 14.",
    openGraph: {
        title: "Haven Toronto",
        description:
            "A Hack Club game jam in Toronto for 150+ high schoolers, starting November 14.",
        url: "https://awsaf.dev/org/haven-toronto",
        siteName: "Awsaf's Portfolio",
        images: [{ url: "https://awsaf.dev/org/haven-toronto.jpg" }],
        type: "website",
    },
};

const FACTS = [
    { label: "Starts", value: "November 14", icon: IconCalendarEvent },
    { label: "Hackers", value: "150+ high schoolers", icon: IconUsersGroup },
    { label: "Prizes", value: "Yes, plenty", icon: IconTrophy },
    { label: "Food", value: "Free, all day", icon: IconPizza },
];

export default function HavenTorontoPage() {
    return (
        <main className="min-h-screen pt-14 sm:pt-24 md:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative">
            <article className="mx-auto max-w-6xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-border/60 sm:aspect-[16/9] md:aspect-[2/1]">
                    <Image
                        src="/org/haven-toronto.jpg"
                        alt="Hack Club Haven Toronto: a hedgehog watching the Toronto skyline at sunset"
                        fill
                        priority
                        sizes="(max-width: 1152px) 100vw, 1152px"
                        className="object-cover object-[50%_70%]"
                    />
                </div>

                <header className="mt-10 md:mt-14">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        Hack Club · Game jam
                    </p>
                    <h1 className="mt-3 font-heading text-3xl font-semibold leading-[1.1] tracking-tighter text-balance md:text-5xl">
                        Haven Toronto
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/55 md:text-xl">
                        A game jam for high schoolers in Toronto. Come make a
                        game with 150+ other teens, win prizes, and eat free
                        food.
                    </p>
                </header>

                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4">
                    {FACTS.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex flex-col gap-1 border-t border-border/40 pt-3"
                        >
                            <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                                <Icon className="size-3" aria-hidden />
                                {label}
                            </dt>
                            <dd className="text-[15px] leading-snug tracking-tight text-foreground/85 md:text-base">
                                {value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-foreground/75 md:mt-16 md:text-lg">
                    <p>
                        Haven is Hack Club's series of in-person game jams,
                        happening in cities all over. The Toronto edition kicks
                        off on{" "}
                        <strong className="font-medium text-foreground">
                            November 14
                        </strong>
                        .
                    </p>
                    <p>
                        You don't need to have made a game before. Show up solo
                        or with friends, team up, build something fun from
                        scratch, and demo it at the end. There'll be prizes for
                        the best games and free food to keep you going.
                    </p>
                </div>

                <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                    <Link
                        href={SIGNUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium tracking-tight text-background transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        Sign up
                        <IconArrowUpRight
                            className="size-4 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                            aria-hidden
                        />
                    </Link>
                    <span className="font-mono text-xs text-foreground/50">
                        haven.hackclub.com/toronto
                    </span>
                </div>
            </article>
        </main>
    );
}
