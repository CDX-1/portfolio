import { cn } from "@/lib/utils";

type AboutMeProps = {
    className?: string;
};

export const AboutMe = ({ className = "" }: AboutMeProps) => {
    return (
        <section className={cn(className, "bg-background text-foreground py-20")}>
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold font-foss mb-12">
                    About Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                            Heyo, my name is Awsaf, and I&apos;m a self-taught 16-year-old high school student
                            based in Canada. I&apos;ve been into programming since I was ten and have
                            explored a wide range of technologies along the way.
                        </p>

                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                            Currently, I aspire to pursue a career in computer engineering. I&apos;m
                            particularly passionate about UI/UX design, edge AI, and embedded systems.
                            Looking ahead, I&apos;m also interested in exploring research in quantum
                            computing.
                        </p>

                        <h3 className="text-xl font-semibold font-foss mb-2">Interested in working with me?</h3>
                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                            Feel free to reach out to me at <a className="font-semibold" href="mailto:contact@awsaf.dev">contact@awsaf.dev</a>
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold font-foss mb-2">What I do</h3>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                <li>Web & application development</li>
                                <li>System administration</li>
                                <li>UI/UX design</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold font-foss mb-2">Technologies</h3>
                            <p className="text-muted-foreground">
                                TypeScript, Next.js, Tailwind CSS, Node.js, Python, Java/Kotlin, Rust
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold font-foss mb-2">Mindset</h3>
                            <p className="text-muted-foreground">
                                I value writing clean, maintainable, and efficient code. Whenever I approach a problem, I first make sure I fully understand it, then work on a solution that is both effective and sustainable, refining it iteratively along the way.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
