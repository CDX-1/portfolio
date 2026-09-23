type SvgProps = React.SVGProps<SVGSVGElement>;

/** Wavy hand-drawn underline. */
export function Squiggle(props: SvgProps) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
        <svg
            viewBox="0 0 120 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden
            {...props}
        >
            <path d="M2 6 C 15 1, 25 9, 40 4 S 65 9, 80 4 T 118 6" />
        </svg>
    );
}

/** Tiny sketched heart. */
export function Heart(props: SvgProps) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
        <svg
            viewBox="0 0 24 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            {...props}
        >
            <path d="M12 20 C 3 14, 1 8, 5 4 C 9 1, 11 4, 12 7 C 13 4, 15 1, 19 4 C 23 8, 21 14, 12 20 Z" />
        </svg>
    );
}

/** Little curly arrow to point at things. */
export function CurlyArrow(props: SvgProps) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
        <svg
            viewBox="0 0 60 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            {...props}
        >
            <path d="M4 8 C 10 2, 32 2, 40 12 C 46 20, 30 24, 22 20" />
            <path d="M22 20 L 28 14" />
            <path d="M22 20 L 30 22" />
        </svg>
    );
}

/** Little sparkle. */
export function Sparkle(props: SvgProps) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
            <path d="M10 1 L 11.4 8.6 L 19 10 L 11.4 11.4 L 10 19 L 8.6 11.4 L 1 10 L 8.6 8.6 Z" />
        </svg>
    );
}

/** Star doodle. */
export function StarDoodle(props: SvgProps) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            {...props}
        >
            <path d="M10 2 L 12.4 7.6 L 18 8.4 L 14 12.4 L 15.2 18 L 10 15.2 L 4.8 18 L 6 12.4 L 2 8.4 L 7.6 7.6 Z" />
        </svg>
    );
}
