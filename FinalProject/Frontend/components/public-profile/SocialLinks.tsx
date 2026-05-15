import { SocialLink } from '../../types/public-profile';
import { Globe, Mail } from 'lucide-react';

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap: Record<string, React.ReactNode> = {
  // linkedin: <Linkedin className="w-5 h-5" />,
  // github: <Github className="w-5 h-5" />,
  // twitter: <Twitter className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-white/10 text-text-muted hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
          aria-label={link.platform}
        >
          {iconMap[link.iconName] || <Globe className="w-5 h-5" />}
        </a>
      ))}
    </div>
  );
}
