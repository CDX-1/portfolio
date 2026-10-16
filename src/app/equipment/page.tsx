import { IconArrowUpRight, IconCpu } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { equipment, pcBuild } from "@/content/equipment";

export const metadata: Metadata = {
    title: "Equipment — awsaf.dev",
    description: "The gear, PC build, and tools I use day-to-day.",
};

export default function EquipmentPage() {
    return (
        <main className="min-h-screen pt-14 sm:pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative">
            <article className="mx-auto max-w-6xl">
                <header className="mb-16 md:mb-24">
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter font-heading">
                        Gear & Setup
                    </h1>
                    <p className="text-base md:text-lg text-foreground/55 max-w-2xl mt-4 leading-relaxed">
                        What's on my desk and in my bag.
                    </p>
                </header>

                <section
                    aria-labelledby="pc-build-heading"
                    className="mb-20 md:mb-28"
                >
                    <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        <IconCpu
                            className="size-3 text-foreground/40"
                            aria-hidden
                        />
                        <span>PC · Build</span>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-muted/25 backdrop-blur-[2px] overflow-hidden">
                        {pcBuild.image && (
                            <div className="relative w-full aspect-[2/1] md:aspect-[5/2] border-b border-border/40 bg-muted/40">
                                <Image
                                    src={pcBuild.image}
                                    alt={`${pcBuild.name} — photo`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 1152px"
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6 md:mb-8">
                                <h2
                                    id="pc-build-heading"
                                    className="font-heading text-2xl md:text-3xl tracking-tight"
                                >
                                    {pcBuild.name}
                                </h2>
                                {pcBuild.tagline && (
                                    <p className="text-sm md:text-base text-foreground/55 max-w-md">
                                        {pcBuild.tagline}
                                    </p>
                                )}
                            </div>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                                {pcBuild.specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="flex flex-col gap-1 border-t border-border/40 pt-3"
                                    >
                                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                                            {spec.label}
                                        </dt>
                                        <dd className="text-[15px] md:text-base text-foreground/85 leading-snug tracking-tight">
                                            {spec.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section aria-label="Other equipment">
                    <div className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        <span>Everything else</span>
                        <span
                            className="h-px flex-1 bg-foreground/10"
                            aria-hidden
                        />
                    </div>

                    <div className="flex flex-col divide-y divide-border/40">
                        {equipment.map((category) => (
                            <section
                                key={category.id}
                                className="py-8 md:py-10 first:pt-0"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,10rem)_1fr] gap-4 md:gap-10">
                                    <div>
                                        <h3 className="font-heading text-xl md:text-2xl tracking-tight">
                                            {category.title}
                                        </h3>
                                        {category.description && (
                                            <p className="mt-2 text-sm text-foreground/55 leading-relaxed">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>

                                    <ul className="flex flex-col divide-y divide-border/30">
                                        {category.items.map((item, i) => {
                                            const content = (
                                                <div className="flex items-center gap-4">
                                                    <div className="relative size-14 md:size-16 shrink-0 overflow-hidden rounded-lg border border-border/40 bg-muted/30">
                                                        {item.image ? (
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                sizes="64px"
                                                                className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <span
                                                                className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-foreground/40 tabular-nums"
                                                                aria-hidden
                                                            >
                                                                {String(
                                                                    i + 1,
                                                                ).padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-baseline gap-2">
                                                                <span
                                                                    className="font-mono tabular-nums text-[10px] text-foreground/35 shrink-0"
                                                                    aria-hidden
                                                                >
                                                                    {String(
                                                                        i + 1,
                                                                    ).padStart(
                                                                        2,
                                                                        "0",
                                                                    )}
                                                                </span>
                                                                <span className="text-[15px] md:text-base font-medium tracking-tight text-foreground/90 truncate">
                                                                    {item.name}
                                                                </span>
                                                                {item.link && (
                                                                    <IconArrowUpRight
                                                                        className="size-3.5 text-foreground/35 group-hover:text-foreground group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-all duration-200 shrink-0"
                                                                        aria-hidden
                                                                    />
                                                                )}
                                                            </div>
                                                            {item.note && (
                                                                <p className="mt-1 ml-5 text-xs md:text-sm text-foreground/50 leading-relaxed">
                                                                    {item.note}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {item.detail && (
                                                            <span className="ml-5 sm:ml-0 text-xs md:text-sm text-foreground/55 font-mono tracking-tight tabular-nums shrink-0">
                                                                {item.detail}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );

                                            return (
                                                <li
                                                    key={`${item.name}-${i}`}
                                                    className="py-3 first:pt-0 last:pb-0"
                                                >
                                                    {item.link ? (
                                                        <Link
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group block hover:text-foreground transition-colors"
                                                        >
                                                            {content}
                                                        </Link>
                                                    ) : (
                                                        <div className="group">
                                                            {content}
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </article>
        </main>
    );
}
