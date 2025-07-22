'use client';

import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function About() {
    const router = useRouter();

    const languages = [
        "typescript",
        "java",
        "kotlin",
        "python",
        "rust",
        "c++"
    ]

    const frameworks = [
        {
            name: "react",
            link: "https://react.dev/"
        },
        {
            name: "next.js",
            link: "https://nextjs.org/"
        },
        {
            name: "spigot/paper",
            link: "https://papermc.io/"
        },
        {
            name: "minestom",
            link: "https://minestom.net"
        },
        {
            name: "discord.js",
            link: "https://discord.js.org/"
        },
        {
            name: "pycord",
            link: "https://pycord.dev/"
        },
    ]

    const equipment = [
        {
            name: "Intel Core i7-12700F",
            image: "https://m.media-amazon.com/images/I/51mEsN-NruL._AC_SL1500_.jpg",
            link: "https://www.intel.com/content/www/us/en/products/sku/134592/intel-core-i712700f-processor-25m-cache-up-to-4-90-ghz/specifications.html"
        },
        {
            name: "Deepcool AK620 CPU Cooler",
            image: "https://cdn.deepcool.com/public/ProductFile/DEEPCOOL/Cooling/CPUAirCoolers/AK620/Gallery/800X800/01.jpg?fm=webp&q=60",
            link: "https://www.deepcool.com/products/Cooling/cpuaircoolers/AK620-High-Performance-CPU-Cooler-1700-AM5/2021/13067.shtml"
        },
        {
            name: "MSI PRO B660M-A DDR4 Micro ATX LGA1700 Motherboard",
            image: "https://asset.msi.com/resize/image/global/product/product_16412866848150e8e3fa86eb419993456c944d949b.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
            link: "https://www.msi.com/Motherboard/PRO-B660M-A-DDR4"
        },
        {
            name: "TEAMGROUP T-Force Vulcan Z 32 GB (2 x 16 GB) DDR4-3200 Memory",
            image: "https://m.media-amazon.com/images/I/71QYVWwXVlL._UF894,1000_QL80_.jpg",
            link: "https://www.teamgroupinc.com/en/product-detail/memory/T-FORCE/vulcan-z-ddr4-gray/vulcan-z-ddr4-gray-TLZGD432G3600HC18JDC01/"
        },
        {
            name: "Silicon Power A60 2 TB M.2 NVMe SSD",
            image: "https://m.media-amazon.com/images/I/61tLhffzr2L._UF894,1000_QL80_.jpg",
            link: "https://www.silicon-power.com/web/product-p34a60"
        },
        {
            name: "Asus TUF GAMING OC GeForce RTX 3080 12GB LHR 12 GB Graphics Card",
            image: "https://m.media-amazon.com/images/I/8133xv4pJ7S._UF894,1000_QL80_.jpg",
            link: "https://www.asus.com/ca-en/motherboards-components/graphics-cards/tuf-gaming/tuf-rtx3080-o12g-gaming/"
        },
        {
            name: "Fractal Design Focus 2 ATX Mid Tower Case",
            image: "https://www.fractal-design.com/app/uploads/2020/08/Focus_2_RGB_Black_TGC_1-Left-Front.jpg",
            link: "https://www.fractal-design.com/products/cases/focus/focus-2/rgb-black-tg-clear-tint/"
        },
        {
            name: "Corsair RM850 850 W 80+ Gold Certified Fully Modular ATX PSU",
            image: "https://m.media-amazon.com/images/I/71fiKD2ckCL._UF894,1000_QL80_.jpg",
            link: "https://www.corsair.com/ca/en/p/psu/cp-9020196-na/rm-series-rm850-850-watt-80-plus-gold-certified-fully-modular-psu-cp-9020196-na"
        },
        {
            name: "Pixio PX277\" 2560 x 1440 165 Hz Monitor (2x)",
            image: "https://m.media-amazon.com/images/I/81Fqig7XTZL._UF894,1000_QL80_.jpg",
            link: "https://pixiogaming.com/products/px277-pro"
        },
        {
            name: "Tecware Phantom RGB Wired 87 Key Mechanical Keyboard",
            image: "https://m.media-amazon.com/images/I/71h45LTINwL.jpg",
            link: "https://www.tecware.co/phantom"
        },
        {
            name: "Razer Seiren X USB Microphone",
            image: "https://m.media-amazon.com/images/I/61xQtBsBNgL._UF894,1000_QL80_.jpg",
            link: "https://www.razer.com/mena-en/streaming-microphones/razer-seiren-x"
        },
        {
            name: "Microsoft Windows 11 Home (64 Bit)",
            image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/PT_RGB_Windows11_Home_EN_1555x1555-1",
            link: "https://www.microsoft.com/en-us/software-download/windows11"
        },
        {
            name: "MacBook Pro (12-inch, M1, 2020)",
            image: "https://m.media-amazon.com/images/I/81Aty4Ef1WL.jpg",
            link: "https://www.apple.com/ca/macbook-pro/"
        }
    ]

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-8 lg:pb-0">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 lg:gap-12 xl:gap-16">
                    {/* About Me Section */}
                    <div className="flex-1 max-w-2xl xl:max-w-3xl">
                        <div className="space-y-6 md:space-y-8 text-center xl:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="font-mono font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                            >
                                about me
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                className="font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl"
                            >
                                I&apos;m a full-stack developer from Canada with over five years of experience across various platforms,
                                including websites, desktop applications, Roblox games, Minecraft servers, Discord bots, and AI/ML systems.
                            </motion.p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                                {/* Languages Section */}
                                <div className="space-y-3 md:space-y-4">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                        className="font-mono font-bold text-base sm:text-sm md:text-lg lg:text-xl"
                                    >
                                        Languages I&apos;m proficient in:
                                    </motion.h2>

                                    <ul className="space-y-1.5 md:space-y-2">
                                        {languages.map((language, index) => (
                                            <motion.li
                                                key={language}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                    delay: 0.3 + (index * 0.1)
                                                }}
                                            >
                                                <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg">
                                                    {language}
                                                </p>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Frameworks Section */}
                                <div className="space-y-3 md:space-y-4">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                                        className="font-mono font-bold text-base sm:text-sm md:text-lg lg:text-xl"
                                    >
                                        Frameworks/libraries I&apos;m proficient in:
                                    </motion.h2>

                                    <ul className="space-y-1.5 md:space-y-2">
                                        {frameworks.map((framework, index) => (
                                            <motion.li
                                                key={framework.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                    delay: 0.9 + (index * 0.1)
                                                }}
                                            >
                                                <Link
                                                    href={framework.link}
                                                    target="_blank"
                                                    className="inline-block hover:transform hover:scale-105 transition-transform duration-200"
                                                >
                                                    <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg hover:text-accent transition-colors duration-200">
                                                        {framework.name}
                                                    </p>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-shrink-0 mt-8 xl:mt-0">
                        <motion.div
                            className="relative group"
                            style={{ perspective: 1200 }}
                            whileTap={{ scale: 0.98 }}
                            animate={{ rotateX: 0, rotateY: 0 }}
                            whileHover={{
                                rotateX: 8,
                                rotateY: -8,
                                scale: 1.04
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Ambient glow using blurred image */}
                            <motion.img
                                src="/photography.jpg"
                                alt="Photography Example Ambient Glow"
                                className="rounded-2xl absolute top-0 left-0 w-full h-full object-cover"
                                style={{
                                    zIndex: 0,
                                }}
                                initial={{
                                    filter: 'blur(40px) brightness(2)',
                                    transform: 'scale(0.9)',
                                    opacity: 0.35,
                                }}
                                animate={isHovered ? {
                                    filter: 'blur(48px) brightness(2.3)',
                                    transform: 'scale(0.9)',
                                    opacity: 0.55,
                                } : {
                                    filter: 'blur(40px) brightness(2)',
                                    transform: 'scale(0.9)',
                                    opacity: 0.35,
                                }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                aria-hidden="true"
                                draggable={false}
                            />

                            {/* Main image with responsive sizing */}
                            <Image
                                src="/photography.jpg"
                                alt="Photography Example"
                                width={400}
                                height={600}
                                className="rounded-2xl shadow-lg relative z-10 w-48 h-72 sm:w-56 sm:h-84 md:w-64 md:h-96 lg:w-80 lg:h-[480px] xl:w-96 xl:h-[576px] 2xl:w-[400px] 2xl:h-[600px] object-cover"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* My Equipment Section */}
                <div className="mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                        className="font-mono font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-10"
                    >
                        my equipment
                    </motion.h2>
                </div>

                <div className="grid grid-cols-5">
                    {equipment.map((item) => (
                        <div key={item.name} onClick={() => router.push(item.link)}>
                            <DirectionAwareHover imageUrl={item.image} className="hover:cursor-pointer">
                                <p className="font-bold font-mono">{item.name}</p>
                                <p>Click to view</p>
                            </DirectionAwareHover>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}