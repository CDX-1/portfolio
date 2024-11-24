import React from 'react';

type ExperienceProps = {
  title: string;
  company: string;
  dateRange: string;
  description: string;
  link?: string;
  discontinued?: boolean;
};

const Experience: React.FC<ExperienceProps> = ({
  title,
  company,
  dateRange,
  description,
  link,
  discontinued,
}) => {
  return (
    <div className="bg-transparent p-4 sm:p-6 mb-4 rounded-xl shadow-md hover:bg-container transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <h3 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">{title}</h3>
        <span className="text-base sm:text-lg text-gray-400 text-center sm:text-left">
          • {company}
        </span>
      </div>
      <p className="text-sm sm:text-base text-gray-400 italic text-center sm:text-left">
        {dateRange}
        {discontinued && <span className="pl-3">(Discontinued)</span>}
      </p>
      <p className="text-base sm:text-lg mt-4 text-center sm:text-left">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-500 mt-2 inline-block text-center sm:text-left"
        >
          Learn More
        </a>
      )}
    </div>
  );
};

export default Experience;
