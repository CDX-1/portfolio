import { DOODLE_VIEWBOX } from "@/content/notes";
import { cn } from "@/lib/utils";

export default function DoodleRender({
    paths,
    ink,
    className,
}: {
    paths: string[];
    ink: string;
    className?: string;
}) {
    if (!paths || paths.length === 0) return null;
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative doodle
        <svg
            viewBox={`0 0 ${DOODLE_VIEWBOX.w} ${DOODLE_VIEWBOX.h}`}
            className={cn("block h-auto w-full", ink, className)}
            aria-hidden
        >
            {paths.map((d, i) => (
                <path
                    // biome-ignore lint/suspicious/noArrayIndexKey: static
                    key={i}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ))}
        </svg>
    );
}
