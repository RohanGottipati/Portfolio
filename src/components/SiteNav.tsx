import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Sparkle, X } from 'lucide-react';
import { profile } from '../data/profile';
import { useAskBot } from '../contexts/AskBotContext';

const links = [
{ to: '/about', label: 'About' },
{ to: '/work', label: 'Projects' },
{ to: '/experience', label: 'Experience' },
{ to: '/recognition', label: 'Recognition' }];


export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { open: isBotOpen, toggleBot } = useAskBot();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header data-site-nav className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:px-10">
        
        <Link
          to="/"
          className="group flex items-baseline gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em]">
          
          <span className="inline-block h-2.5 w-2.5 bg-tangerine transition-transform group-hover:rotate-45" />
          {profile.name}
        </Link>

        <ul className={`hidden items-center gap-4 xl:gap-6 ${isBotOpen ? '' : 'lg:flex'}`}>
          {links.map((link) =>
          <li key={link.to}>
              <NavLink
              to={link.to}
              className={({ isActive }) =>
              `relative font-mono text-[10px] uppercase tracking-[0.12em] lg:tracking-[0.18em] transition-colors ${
              isActive ?
              'text-ink marker-underline' :
              'text-ink-soft hover:text-ink'}`

              }>
              
                {link.label}
              </NavLink>
            </li>
          )}
          <li>
            <a
              href={profile.contact.resume}
              target="_blank"
              rel="noreferrer"
              className="border border-ink/25 bg-ink px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-2 transition-colors hover:bg-tangerine">
              
              Résumé
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={toggleBot}
              aria-expanded={isBotOpen}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft hover:text-tangerine">
              
              <Sparkle size={12} aria-hidden="true" />
              RoRo
            </button>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`h-10 w-10 items-center justify-center ${isBotOpen ? 'inline-flex' : 'inline-flex lg:hidden'}`}>
          
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open &&
      <ul
        id="mobile-navigation"
        className={`border-t border-ink/10 bg-paper-2 px-5 py-3 ${isBotOpen ? '' : 'lg:hidden'}`}>
          {links.map((link) =>
        <li key={link.to} className="border-b border-ink/10 last:border-0">
              <Link
            to={link.to}
            onClick={() => setOpen(false)}
            className={`block py-3 font-mono text-xs uppercase tracking-[0.2em] ${
            pathname.startsWith(link.to) ? 'text-tangerine' : 'text-ink'}`
            }>
            
                {link.label}
              </Link>
            </li>
        )}
          <li className="border-b border-ink/10">
            <a
            href={profile.contact.resume}
            target="_blank"
            rel="noreferrer"
            className="block w-full py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink">
            
              Résumé
            </a>
          </li>
          <li>
            <button
            type="button"
            onClick={() => {
              setOpen(false);
              toggleBot();
            }}
            aria-expanded={isBotOpen}
            className="flex w-full items-center gap-1.5 py-3 text-left font-mono text-xs uppercase tracking-[0.2em] text-ink">
            
              <Sparkle size={12} aria-hidden="true" />
              RoRo
            </button>
          </li>
        </ul>
      }
    </header>);

}
