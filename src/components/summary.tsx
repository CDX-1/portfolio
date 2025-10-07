import Image from 'next/image';
import MusicPlayer from './music-player';

interface Skill {
    name: string;
    icon: string;
    invert?: boolean;
    wordmark?: boolean;
}

// TODO: When clicking a skill, go to the projects section and filter by matching projects
export default function Summary() {
    const SKILLS: Record<string, Skill[]> = {
        languages: [
            {
                name: 'TypeScript',
                icon: 'typescript',
            },
            {
                name: 'Java',
                icon: 'java',
            },
            {
                name: 'Kotlin',
                icon: 'kotlin',
            },
            {
                name: 'Python',
                icon: 'python',
            },
            {
                name: 'Rust',
                icon: 'rust',
                invert: true,
            },
            {
                name: 'Go',
                icon: 'go',
                wordmark: true,
            },
        ],
        frameworks: [
            {
                name: 'Next.js',
                icon: 'nextjs',
            },
            {
                name: 'React Native',
                icon: 'reactnative',
            },
            {
                name: 'Expo',
                icon: 'expo',
                invert: true,
            },
            {
                name: 'Tauri',
                icon: 'tauri',
            },
        ],
        tools: [
            {
                name: 'Tailwind',
                icon: 'tailwindcss',
            },
            {
                name: 'Framer Motion',
                icon: 'framermotion',
                invert: true,
            },
            {
                name: 'gRPC',
                icon: 'grpc',
            },
        ],
        databases: [
            {
                name: 'PostgreSQL',
                icon: 'postgresql',
            },
            {
                name: 'MongoDB',
                icon: 'mongodb',
            },
            {
                name: 'Redis',
                icon: 'redis',
            },
        ],
        cloud: [
            {
                name: 'Vercel',
                icon: 'vercel',
                invert: true,
            },
            {
                name: 'Supabase',
                icon: 'supabase',
            },
            {
                name: 'Appwrite',
                icon: 'appwrite',
            },
            {
                name: 'Cloudflare',
                icon: 'cloudflare',
            },
        ],
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h2 className="text-4xl">Learn more about me!</h2>

            <div className="grid grid-cols-3 gap-4 w-1/2">
                <div className="p-4 border rounded-lg space-y-2">
                    <h2 className="text-lg font-semibold">About me</h2>

                    <p className="text-wrap leading-6">
                        Hey! I'm a high school developer from Canada who's been
                        coding since I was 10. I love exploring the intricate
                        world of programming and have a strong interest in{' '}
                        <b>UI/UX design</b>, <b>hardware</b>, and{' '}
                        <b>software development</b>. I plan to pursue Computer
                        Engineering in post-secondary to keep continue
                        developing my skills and learning more.
                    </p>
                </div>

                <div className="flex flex-col space-y-2 p-4 border rounded-lg col-span-2 row-span-2 justify-between">
                    <div className="flex flex-col">
                        <h2 className="w-full text-left font-bold">
                            Technologies I work with
                        </h2>
                        <p className="text-sm">
                            Click to view related projects
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Languages */}
                        <div className="font-semibold">Languages</div>
                        <div className="flex gap-x-4 col-span-2" role="button">
                            {SKILLS.languages.map((skill) => (
                                <div
                                    className="flex items-center space-x-2 px-4 py-2 border-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-secondary"
                                    role="button"
                                    key={skill.name}
                                >
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original${skill.wordmark ? '-wordmark' : ''}.svg`}
                                        width={30}
                                        height={30}
                                        alt={skill.name}
                                        className={
                                            skill.invert
                                                ? 'invert brightness-0'
                                                : ''
                                        }
                                    />

                                    <p>{skill.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Frameworks */}
                        <div className="font-semibold">Frameworks</div>
                        <div className="flex gap-x-4 col-span-2">
                            {SKILLS.frameworks.map((skill) => (
                                <div
                                    className="flex items-center space-x-2 px-4 py-2 border-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-secondary"
                                    role="button"
                                    key={skill.name}
                                >
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original${skill.wordmark ? '-wordmark' : ''}.svg`}
                                        width={30}
                                        height={30}
                                        alt={skill.name}
                                        className={
                                            skill.invert
                                                ? 'invert brightness-0'
                                                : ''
                                        }
                                    />

                                    <p>{skill.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tools */}
                        <div className="font-semibold">Tools</div>
                        <div className="flex gap-x-4 col-span-2">
                            {SKILLS.tools.map((skill) => (
                                <div
                                    className="flex items-center space-x-2 px-4 py-2 border-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-secondary"
                                    role="button"
                                    key={skill.name}
                                >
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original${skill.wordmark ? '-wordmark' : ''}.svg`}
                                        width={30}
                                        height={30}
                                        alt={skill.name}
                                        className={
                                            skill.invert
                                                ? 'invert brightness-0'
                                                : ''
                                        }
                                    />

                                    <p>{skill.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Databases */}
                        <div className="font-semibold">Databases</div>
                        <div className="flex gap-x-4 col-span-2">
                            {SKILLS.databases.map((skill) => (
                                <div
                                    className="flex items-center space-x-2 px-4 py-2 border-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-secondary"
                                    role="button"
                                    key={skill.name}
                                >
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original${skill.wordmark ? '-wordmark' : ''}.svg`}
                                        width={30}
                                        height={30}
                                        alt={skill.name}
                                        className={
                                            skill.invert
                                                ? 'invert brightness-0'
                                                : ''
                                        }
                                    />

                                    <p>{skill.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cloud */}
                        <div className="font-semibold">Cloud</div>
                        <div className="flex gap-x-4 col-span-2">
                            {SKILLS.cloud.map((skill) => (
                                <div
                                    className="flex items-center space-x-2 px-4 py-2 border-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-secondary"
                                    role="button"
                                    key={skill.name}
                                >
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original${skill.wordmark ? '-wordmark' : ''}.svg`}
                                        width={30}
                                        height={30}
                                        alt={skill.name}
                                        className={
                                            skill.invert
                                                ? 'invert brightness-0'
                                                : ''
                                        }
                                    />

                                    <p>{skill.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-sm">
                        I'm familiar with a wide range of technologies even if
                        they are not listed here
                    </p>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                    <MusicPlayer />
                </div>
            </div>
        </div>
    );
}
