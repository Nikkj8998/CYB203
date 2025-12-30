import React from 'react';
import { SocialIcon } from '@/components/SocialIcon';
import { socialLinks } from '@/config/socialLinks';

interface SocialIconsProps {
    className?: string;
    iconClassName?: string;
    iconSize?: number;
    variant?: 'default' | 'footer' | 'contact';
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
    className = '',
    iconClassName = '',
    iconSize = 24,
    variant = 'default'
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'footer':
                return 'w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl text-gray-900 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-white/20';
            case 'contact':
                return 'w-12 h-12 bg-gray-800 hover:bg-primary/20 backdrop-blur-sm border border-gray-700 hover:border-primary/40 rounded-xl text-white hover:scale-110 hover:shadow-lg hover:shadow-primary/30';
            default:
                return 'w-10 h-10 bg-gray-800 hover:bg-primary/20 border border-gray-700 hover:border-primary/40 rounded-lg text-white hover:scale-105 hover:shadow-md';
        }
    };

    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            {socialLinks.map((social, index) => (
                <SocialIcon
                    key={index}
                    icon={social.icon}
                    url={social.url}
                    size={iconSize}
                    className={`${getVariantClasses()} ${iconClassName}`}
                />
            ))}
        </div>
    );
};

export default SocialIcons;
