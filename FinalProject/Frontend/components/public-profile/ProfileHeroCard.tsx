import Image from 'next/image';
import { PublicProfile } from '../../types/public-profile';

interface ProfileHeroCardProps {
  profile: PublicProfile;
}

export function ProfileHeroCard({ profile }: ProfileHeroCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-card border border-white/10 p-6 md:p-8 shadow-[0_0_40px_-15px_rgba(35,103,162,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 ring-4 ring-background">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-brand-blue to-electric-blue flex items-center justify-center text-white text-3xl font-bold">
              {profile.name.charAt(0)}
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {profile.name}
        </h1>
        <p className="text-electric-blue font-medium mb-3">
          {profile.role}
        </p>
        <p className="text-text-muted text-sm md:text-base max-w-sm">
          {profile.slogan}
        </p>
      </div>
    </div>
  );
}
