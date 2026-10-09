import React from 'react';
import { Link } from 'react-router-dom';

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  /** Grey link that darkens on hover. */
  muted?: boolean;
  /** Underline always visible (strengthens on hover) instead of drawing in. */
  underline?: boolean;
  /** No underline treatment at all. */
  plain?: boolean;
  className?: string;
};

export function TextLink({
  href,
  children,
  muted = false,
  underline = false,
  plain = false,
  className = ''
}: TextLinkProps) {
  const variant = plain ? 'link-plain' : underline ? 'link-static' : 'link-anim';
  const classes = `link ${variant} ${muted ? 'link-muted' : 'link-ink'} ${className}`;

  if (href.startsWith('/') && !href.endsWith('.pdf')) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>);

  }

  const isExternal = href.startsWith('http') || href.endsWith('.pdf');
  return (
    <a
      href={href}
      className={classes}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}>

      {children}
    </a>);

}
