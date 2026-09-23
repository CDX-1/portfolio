import type { SVGProps } from "react";

/** The orange star from the site's favicon. */
export default function BrandStar(props: SVGProps<SVGSVGElement>) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
        <svg viewBox="0 0 144 144" fill="currentColor" aria-hidden {...props}>
            <path d="M72 6 L96 39 L135 47 L103 66 L120 126 L72 85 L15 132 L45 79 L7 47 L48 39 Z" />
        </svg>
    );
}
