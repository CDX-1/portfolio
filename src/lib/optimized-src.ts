import { getImageProps } from "next/image";

// SVG <image> can't use next/image, so build the optimizer URL directly.
export function optimizedSrc(src: string, width: number, quality = 75) {
    if (!src.startsWith("/") || src.endsWith(".gif") || src.endsWith(".svg")) {
        return src;
    }
    return getImageProps({ src, alt: "", width, height: width, quality }).props
        .src;
}
