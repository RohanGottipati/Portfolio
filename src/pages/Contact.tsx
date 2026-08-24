import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone } from
'lucide-react';
import { Paper } from '../components/Paper';
import { profile } from '../data/profile';
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../data/seo.mjs";

const cards = [
{
  label: 'Email',
  value: profile.contact.email,
  href: `mailto:${profile.contact.email}`,
  Icon: Mail,
  tone: 'bg-tangerine text-paper-2',
  rotate: -2
},
{
  label: 'Phone',
  value: profile.contact.phone,
  href: profile.contact.phoneHref,
  Icon: Phone,
  tone: 'bg-lime',
  rotate: 1.6
},
{
  label: 'GitHub',
  value: 'RohanGottipati',
  href: profile.contact.github,
  Icon: Github,
  tone: 'bg-paper-2',
  rotate: -1.8
},
{
  label: 'LinkedIn',
  value: 'in/rohangottipati',
  href: profile.contact.linkedin,
  Icon: Linkedin,
  tone: 'bg-sky',
  rotate: -1.2
},
{
  label: 'Résumé',
  value: 'PDF, one page',
  href: profile.contact.resume,
  Icon: FileText,
  tone: 'bg-peach',
  rotate: 2
}];


export function Contact() {
  return (
    <section className="grid-paper">
      <Seo {...PAGE_SEO.contact} />
      <div className="mx-auto max-w-[1000px] px-5 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-tangerine">
          Contact
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[1.02] md:text-7xl">
          Say hi - I reply fast.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          I&apos;m open to software engineering internships and new-grad roles,
          hackathon teams, and anything involving AI systems or data platforms.
        </p>

        <ul className="mt-12 grid gap-7 sm:grid-cols-2">
          {cards.map((card) =>
          <li key={card.label}>
              <a
              href={card.href}
              target={card.href.startsWith('http') || card.href.endsWith('.pdf') ? '_blank' : undefined}
              rel="noreferrer"
              className="block transition-transform hover:-translate-y-1">
              
                <Paper rotate={card.rotate} className={`p-6 ${card.tone}`}>
                  <card.Icon size={20} aria-hidden="true" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                    {card.label}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-2xl leading-tight">
                    {card.value}
                    <ArrowUpRight size={16} />
                  </p>
                </Paper>
              </a>
            </li>
          )}
        </ul>

        <p
          className="mt-14 font-hand text-3xl text-ink-soft"
          style={{ transform: 'rotate(-2deg)' }}>
          
          - {profile.shortName}, {profile.location}
        </p>
      </div>
    </section>);

}
