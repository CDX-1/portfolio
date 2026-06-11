export default function Stats() {
    return (
        <div className="flex justify-between w-full my-16">
            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">20+</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Shipped Projects</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">6+</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Years of experience</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">100%</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Self-Taught</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">$1K+</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Earned via Code</h4>
            </div>
        </div>
    );
}