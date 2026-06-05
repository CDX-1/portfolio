import { getAllProjects, getProjectBySlug, MDXComponents } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = getProjectBySlug(slug);

    return {
        title: meta.title,
        description: meta.description,

        openGraph: {
            title: meta.title,
            description: meta.description,
            url: "https://awsaf.dev",
            siteName: "Awsaf's Portfolio",
            images: [
                {
                    url:
                        `https://awsaf.dev/projects/assets/${meta.images?.[0]}`,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "article",
        },
    };
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { content, meta } = getProjectBySlug(slug);

    return (
        <main className="min-h-screen pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32">
            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                <MDXRemote source={content} components={MDXComponents} />
            </article>
        </main>
    );
}