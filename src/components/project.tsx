import { motion } from "framer-motion";
import React from "react";
import { FaStar, FaAt, FaLink } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface ProjectProps {
    title: string;
    company: string;
    dateRange: string;
    description: string;
    link: string | undefined;
    pinned: boolean;
    current: boolean;
    discontinued: boolean;
    tools: string[];
}

const animation = {
    hide: {
        x: -30,
        opacity: 0
    },
    show: {
        x: 0,
        opacity: 1
    }
};

export const Project: React.FC<ProjectProps> = ({ title, company, dateRange, description, link, pinned, current, discontinued, tools }) => {
    return (
        <motion.div key={company} className="p-10" {...{ initial: animation.hide, animate: animation.show }}>
            <div className="hidden md:flex items-baseline space-x-2">
                {pinned && <FaStar />}
                <h1 className="font-bold text-2xl">{title}</h1>
                <p className="text-silent">at {company}</p>
            </div>
            <div className="block md:hidden">
                <div className="flex items-baseline space-x-2">
                    <FaStar />
                    <h1 className="font-bold text-xl">{title}</h1>
                </div>
                <div className="flex space-x-2 items-baseline">
                    <FaAt />
                    <p className="text-silent">{company}</p>
                    <p className="mb-2 text-silent px-2">{dateRange}</p>
                </div>
            </div>
            <div className="hidden md:flex items-baseline space-x-2">
                <p className="mb-2 text-silent">{dateRange}</p>
                {current && <Badge variant="outline">Current</Badge>}
                {discontinued && <Badge variant="outline">Discontinued</Badge>}
            </div>
            <p className="text-silent mb-3 md:mb-2">{description}</p>
            <div className="space-x-2 flex items-baseline">
                {link &&
                    <Link href={link} target="_blank" className="flex space-x-2 items-baseline hover:underline"><FaLink /><p className="hidden md:block">Learn more</p></Link>
                }
                {link && tools && <p className="hidden md:block">|</p>}
                {tools.map((tool) => (
                    <Badge variant="outline" key={tool}>{tool}</Badge>
                ))}
            </div>
        </motion.div>
    )
}