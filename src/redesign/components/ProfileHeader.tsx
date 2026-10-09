import { TextLink } from './TextLink';
import { Reveal } from './Reveal';
import { profile, socialLinks } from '../data/profile';

type ProfileHeaderProps = {
  showBack?: boolean;
};

export function ProfileHeader({ showBack = false }: ProfileHeaderProps) {
  return (
    <header>
      <Reveal persistent delay={0.05}>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.01em] text-ink">
          <TextLink href="/" plain>
            {profile.name}
          </TextLink>
        </h1>
        <p className="mt-1.5 text-[15.5px] text-ink">
          <span data-anchor="tagline" className="border-b border-dotted border-faint/70 pb-px">
            {profile.tagline}
          </span>
        </p>
      </Reveal>
      <Reveal persistent delay={0.12}>
        <nav aria-label="Social links" className="mt-4 flex flex-nowrap gap-x-3 whitespace-nowrap">
          {socialLinks.map((link) =>
          <TextLink key={link.label} href={link.href} className="social-link">
              {link.label}
            </TextLink>
          )}
        </nav>
      </Reveal>
      {showBack &&
      <Reveal delay={0.1}>
          <TextLink href="/" plain className="mt-4 inline-flex items-baseline gap-1 text-[15.5px] font-normal text-ink">
            <span aria-hidden="true" className="link-arrow-back text-[13px]">
              ←
            </span>
            <span className="border-b border-dotted border-faint/70 pb-px">back</span>
          </TextLink>
        </Reveal>
      }
    </header>);

}
