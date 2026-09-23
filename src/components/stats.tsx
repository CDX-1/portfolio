import BrandStar from "./brand-star";

export default function Stats() {
    return (
        <section className="my-12 sm:my-16">
            <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                <span className="tabular-nums text-foreground/55">01</span>
                <span className="h-px w-6 bg-foreground/15" aria-hidden />
                Stats
                <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full">
                <div className="space-y-1">
                    <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight tabular-nums">
                        20+
                    </h3>
                    <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/55">
                        Shipped Projects
                    </h4>
                </div>

                <div className="space-y-1">
                    <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight tabular-nums">
                        6+
                    </h3>
                    <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/55">
                        Years of experience
                    </h4>
                </div>

                <div className="space-y-1">
                    <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight tabular-nums">
                        100%
                    </h3>
                    <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/55">
                        Self-Taught
                    </h4>
                </div>

                <div className="space-y-1">
                    <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight tabular-nums">
                        $3K+
                    </h3>
                    <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/55">
                        Earned via Code
                    </h4>
                </div>
            </div>
        </section>
    );
}
