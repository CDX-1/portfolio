import Statement from '@/components/statement';
import { FaArrowRight, FaHandshakeAngle, FaStar } from 'react-icons/fa6';
import ProjectList from '@/components/project-list';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactBar } from '@/components/contact-bar';

export default function Home() {
    return (
        <div className="flex flex-col mt-40 mx-40 space-y-40">
            <Statement />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Header>
                        <FaStar className="text-accent" />
                        <span>Featured Projects</span>
                    </Header>

                    <Link href="/projects/">
                        <Button
                            variant="link"
                            className="hover:text-accent-foreground"
                        >
                            <span className="font-mono text-lg">View All</span>
                            <FaArrowRight className="!size-4" />
                        </Button>
                    </Link>
                </div>
                <ProjectList featured={true} />
            </div>

            <div className="space-y-16 mb-20">
                <Header>
                    <FaHandshakeAngle className="text-accent" />
                    <span>Like What You See?</span>
                </Header>

                <p className="font-mono text-4xl w-3/5">
                    I&apos;m open to freelance projects. Feel free to email me
                    so we can start collaborating.
                </p>

                <ContactBar />
            </div>
        </div>
    );
}
