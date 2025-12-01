import { Header } from '@/components/header';
import { FaCube } from 'react-icons/fa6';
import ProjectList from '@/components/project-list';

export default function ProjectsPage() {
    return (
        <div className="mt-24 mx-4 md:mt-40 md:mx-40 space-y-8">
            <Header>
                <FaCube className="text-accent" />
                <span>Projects</span>
            </Header>
            <ProjectList />
        </div>
    );
}
