import { SocialLink } from '../../types/public-profile';
import { Globe, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaBehance, FaLinkedin } from 'react-icons/fa';

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <FaLinkedin className="w-5 h-5" />,
  github: <FaGithub className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  x: <FaTwitter className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  dribbble: <FaDribbble className="w-5 h-5" />,
  behance: <FaBehance className="w-5 h-5" />,
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
