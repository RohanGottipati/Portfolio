import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';

const socials = [
{ label: 'Email', href: `mailto:${profile.contact.email}` },
{ label: profile.contact.phone, href: profile.contact.phoneHref },
{ label: 'GitHub', href: profile.contact.github },
{ label: 'LinkedIn', href: profile.contact.linkedin },
{ label: 'Résumé', href: profile.contact.resume }];


export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-3xl italic leading-none">
            Let&apos;s build something.
          </p>
          <a
            href={`mailto:${profile.contact.email}`}
            className="mt-3 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-tangerine hover:underline">
            
            {profile.contact.email}
            <ArrowUpRight size={13} />
          </a>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {socials.map((s) =>
          <li key={s.label}>
              <a
              href={s.href}
              target={s.href.startsWith('http') || s.href.endsWith('.pdf') ? '_blank' : undefined}
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
              
                {s.label}
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="border-t border-ink/10 px-5 py-4 md:px-10">
        <p className="mx-auto max-w-[1240px] font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft/70">
          I cut, taped and shipped this in Toronto · {new Date().getFullYear()}
        </p>
      </div>
    </footer>);

}
