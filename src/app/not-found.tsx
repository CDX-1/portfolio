import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-[70vh] pt-14 sm:pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    404
                </span>
                <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tighter font-heading">
                    Nothing here.
                </h1>
                <p className="text-base md:text-lg text-foreground/55 max-w-2xl mt-4 leading-relaxed">
                    This page doesn&rsquo;t exist, or I moved it.{" "}
                    <Link
                        href="/"
                        className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground transition-colors"
                    >
                        Back to home
                    </Link>
                    .
                </p>
            </div>
        </main>
    );
}
