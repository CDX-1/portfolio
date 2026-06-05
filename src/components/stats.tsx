export default function Stats() {
    return (
        <div className="flex justify-between w-full my-8">
            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">20+</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Projects</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">5+</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Years of experience</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">1</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Hackathon Award</h4>
            </div>

            <div className="space-y-1">
                <h3 className="font-bespoke font-medium text-5xl tracking-tight">$80</h3>
                <h4 className="font-satoshi text-base tracking-tight text-foreground/70">Total Hackathon Prizes</h4>
            </div>
        </div>
    );
}