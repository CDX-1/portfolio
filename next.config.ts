import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
    reactCompiler: true,
};

export default nextConfig;
