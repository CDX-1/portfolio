import React from 'react';

type ExperienceProps = {
    title: string;
    company: string;
    dateRange: string;
    description: string;
    link?: string;
    discontinued?: boolean
};

const Experience: React.FC<ExperienceProps> = ({
    title,
    company,
    dateRange,
    description,
    link,
    discontinued
}) => {
    return (
        <div className="bg-transparent p-6 mb-4 rounded-xl shadow-md hover:bg-container transition-all duration-300">
            <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <span className="text-lg text-gray-400">• {company}</span>
            </div>
            <p className="text-gray-400 italic">{dateRange}{discontinued && (
                <span className="pl-3">(Discontinued)</span>
            )}</p>
            <p className="text-lg mt-4">{description}</p>
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 mt-2 inline-block"
                >
                    Learn More
                </a>
            )}
        </div>
    );
};


export default Experience;