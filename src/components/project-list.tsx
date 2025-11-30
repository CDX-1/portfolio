import { getAllProjects } from '@/lib/cms';
import { ProjectCard } from '@/components/project-card';

interface ProjectProps {
    featured?: boolean;
}

export default function ProjectList({ featured = false }: ProjectProps) {
    let projects = getAllProjects();
    if (featured) {
        projects = projects.filter((p) => p.frontmatter.featured === true);
    }

    return (
        <div className="grid grid-cols-3 gap-10">
            {projects.map((project) => (
                <ProjectCard
                    key={project.slug}
                    id={project.slug}
                    title={project.frontmatter.title}
                    description={project.frontmatter.description}
                    tags={project.frontmatter.tags}
                    image={project.frontmatter.image}
                    backdrop={project.frontmatter.backdrop}
                    links={{
                        github: project.frontmatter.github,
                    }}
                />
            ))}
        </div>
    );
}
