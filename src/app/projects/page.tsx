import AnimatedProjectsGrid from "@/components/animated-projects-grid";
import { ProjectSummary } from "@/components/project-summary";
import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="dark bg-background text-foreground min-h-screen flex flex-col items-center py-20 px-10 gap-10">
            <div className="text-center space-y-2">
                <h1 className="font-bold font-foss text-6xl">Projects</h1>
                <p className="text-muted-foreground">
                    A collection of all my notable projects.
                </p>
            </div>

            <AnimatedProjectsGrid>
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="block h-full rounded-xl transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring focus-visible:ring-primary/40"
                        aria-label={`Open project ${project.meta.title}`}
                    >
                        <ProjectSummary
                            title={project.meta.title}
                            description={project.meta.description || ""}
                            tags={project.meta.tags}
                            author={project.meta.author.map((a) => a.name).join(", ")}
                            date={project.meta.date}
                            image={project.meta.image}
                            location={project.meta.location}
                            github={project.meta.github}
                        />
                    </Link>
                ))}
            </AnimatedProjectsGrid>
        </div>
    );
}
