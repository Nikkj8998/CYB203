import React from 'react';

interface SocialIconProps {
    icon: {
        title: string;
        hex: string;
        path: string;
    };
    url: string;
    className?: string;
    size?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
    icon,
    url,
    className = '',
    size = 24
}) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
            aria-label={icon.title}
        >
            <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill={`#${icon.hex}`}
                className="transition-all duration-300"
            >
                <title>{icon.title}</title>
                <path d={icon.path} />
            </svg>
        </a>
    );
};

export default SocialIcon;
