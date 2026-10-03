import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: ["sharp", "ffmpeg-static"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.simpleicons.org",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "opwhslnusvtxailbyxiu.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
    reactCompiler: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), geolocation=(), microphone=(), payment=()",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/resume",
                destination: "/resume.pdf",
                permanent: true,
            },
            {
                source: "/instagram",
                destination: "https://www.instagram.com/awsf__/",
                permanent: true,
            },
            {
                source: "/github",
                destination: "https://github.com/CDX-1",
                permanent: true,
            },
            {
                source: "/linkedin",
                destination: "https://www.linkedin.com/in/awsaf-syed/",
                permanent: true,
            },
            {
                source: "/cosmos",
                destination: "https://www.cosmos.so/aw.sf",
                permanent: true,
            },
            {
                source: "/youtube",
                destination: "https://www.youtube.com/@rarecdx",
                permanent: true,
            },
            {
                source: "/mail",
                destination: "mailto:contact@awsaf.dev",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
