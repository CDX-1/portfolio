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
    async redirects() {
        return [
            {
                source: '/resume',
                destination: '/resume.pdf',
                permanent: true
            },
            {
                source: '/instagram',
                destination: 'https://www.instagram.com/awsf__/',
                permanent: true
            },
            {
                source: '/github',
                destination: 'https://github.com/CDX-1',
                permanent: true
            },
            {
                source: '/linkedin',
                destination: 'https://www.linkedin.com/in/awsaf-syed/',
                permanent: true
            },
            {
                source: '/cosmos',
                destination: 'https://www.cosmos.so/aw.sf',
                permanent: true
            },
            {
                source: '/youtube',
                destination: 'https://www.youtube.com/@rarecdx',
                permanent: true
            },
            {
                source: '/mail',
                destination: 'mailto:contact@awsaf.dev',
                permanent: true
            }
        ];
    }
};

export default nextConfig;
