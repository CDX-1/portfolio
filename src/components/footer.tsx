import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaRocket, FaSquare } from "react-icons/fa6";

export const Footer = () => {
    const socials = [
        {
            name: "linkedin",
            url: "https://www.linkedin.com/in/awsaf-syed/",
            icon: <FaLinkedin />
        },
        {
            name: "instagram",
            url: "https://www.instagram.com/awsf__/",
            icon: <FaInstagram />
        },
        {
            name: "github",
            url: "https://github.com/CDX-1",
            icon: <FaGithub />
        },
        {
            name: "cosmos",
            url: "https://www.cosmos.so/aw.sf",
            icon: <FaRocket />
        }
    ]
    return (
        <footer className="flex items-center py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-16 lg:px-24 bg-linear-to-b from-muted-foreground/10 to-background">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
                <div className="text-center lg:text-left">
                    <div className="flex flex-col">
                        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold font-foss tracking-tighter">awsaf</p>
                        <p className="font-mono text-sm sm:text-base text-foreground/95 uppercase tracking-wider">contact@awsaf.dev</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
                    {socials.map((social, i) => (
                        <div key={social.name} className="flex items-center gap-3 sm:gap-4 md:gap-6">
                            <Link 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-foreground/95 hover:text-muted-foreground transition-colors duration-300 ease-in-out"
                            >
                                <span className="text-lg sm:text-xl">{social.icon}</span>
                                <span className="font-mono text-sm sm:text-base">{social.name}</span>
                            </Link>
                            {i !== socials.length - 1 && (
                                <FaSquare className="hidden sm:block text-foreground/80" size={8} />
                            )}
                        </div>
                    ))}
                </div>
                
                <p className="text-3xl sm:text-4xl lg:text-[3vw] font-bold font-foss tracking-tighter">
                    © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};