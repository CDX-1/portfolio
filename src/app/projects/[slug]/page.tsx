import { getAllProjects, getProjectBySlug, MDXComponents } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import Image from "next/image";

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
                    url: `https://awsaf.dev/projects/assets/${meta.images?.[0]}`,
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

const collageStyles = [
    "-rotate-6 hover:rotate-0 z-10",
    "rotate-3 hover:rotate-0 z-20 -ml-12 md:-ml-24 mt-8 md:mt-12",
    "-rotate-3 hover:rotate-0 z-30 -ml-12 md:-ml-24 -mt-6 md:-mt-10",
    "rotate-6 hover:rotate-0 z-40 -ml-12 md:-ml-24 mt-4 md:mt-8",
    "-rotate-12 hover:rotate-0 z-50 -ml-12 md:-ml-24",
];

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { content, meta } = getProjectBySlug(slug);

    return (
        <main className="min-h-screen pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                
                {/* Collage Header Section */}
                {meta.images && meta.images.length > 0 && (
                    <div className="flex flex-row justify-center items-center py-10 md:py-16 mb-8 overflow-visible">
                        {meta.images.map((image, i) => (
                            <div
                                key={image}
                                className={`
                                    relative w-32 sm:w-48 md:w-64 shrink-0
                                    transition-all duration-300 ease-in-out hover:scale-110 hover:z-[60]
                                    shadow-xl hover:shadow-2xl rounded-xl md:rounded-2xl 
                                    border-4 border-white/10 bg-background overflow-hidden
                                    ${collageStyles[i % collageStyles.length]}
                                `}
                            >
                                <Image 
                                    src={image} 
                                    alt={`${meta.title} screenshot ${i + 1}`} 
                                    width={0}
                                    height={0}
                                    className="w-full h-auto"
                                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Title & Description */}
                <div className="flex flex-col gap-4 text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-semibold font-bespoke tracking-tight">
                        {meta.title}
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                        {meta.description}
                    </p>
                </div>

                {/* MDX Article */}
                <div className="mx-auto max-w-4xl">
                    <MDXRemote source={content} components={MDXComponents} />
                </div>
                
            </article>
        </main>
    );
}