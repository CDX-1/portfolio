export default function Stats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full my-12 sm:my-16">
            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight">20+</h3>
                <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/70">Shipped Projects</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight">6+</h3>
                <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/70">Years of experience</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight">100%</h3>
                <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/70">Self-Taught</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-4xl sm:text-5xl tracking-tight">$1K+</h3>
                <h4 className="font-satoshi text-sm sm:text-base tracking-tight text-foreground/70">Earned via Code</h4>
            </div>
        </div>
    );
}