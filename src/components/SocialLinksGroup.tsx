import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Github, Twitter, Linkedin, Facebook, Instagram, Youtube, LucideProps } from 'lucide-react'; // Import common icons

// Define a type for the icon mapping
type IconName = 'Github' | 'Twitter' | 'Linkedin' | 'Facebook' | 'Instagram' | 'Youtube';

// Map string names to actual Lucide icon components
const iconComponents: Record<IconName, React.FC<LucideProps>> = {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
};

export interface SocialLink {
  name: string;
  url: string;
  icon: IconName; // Use predefined icon names for type safety
  ariaLabel?: string;
}

interface SocialLinksGroupProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
}

const SocialLinksGroup: React.FC<SocialLinksGroupProps> = ({
  links,
  className = "flex justify-center space-x-3 md:space-x-4 py-4",
  iconSize = 20,
}) => {
  console.log("Rendering SocialLinksGroup with links:", links.length);

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className={className}>
        {links.map((link) => {
          const IconComponent = iconComponents[link.icon];
          if (!IconComponent) {
            console.warn(`Icon component not found for: ${link.icon}`);
            return null; // Or a default icon/placeholder
          }
          return (
            <Tooltip key={link.name} delayDuration={100}>
              <TooltipTrigger asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel || `Visit our ${link.name} page`}
                >
                  <Button variant="outline" size="icon" className="rounded-full">
                    <IconComponent size={iconSize} aria-hidden="true" />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SocialLinksGroup;