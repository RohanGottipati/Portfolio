import React from 'react';
import { PaperPage } from './PaperPage';
import { Banner } from './Banner';
import { TextLink } from './TextLink';

type SubpageLayoutProps = {
  children: React.ReactNode;
};

export function SubpageLayout({ children }: SubpageLayoutProps) {
  return (
    <PaperPage>
      <Banner />
      <div className="mt-9 text-[15.5px] leading-[1.5]">
        <TextLink href="/" plain className="inline-flex items-baseline gap-1 text-[15.5px] font-normal text-ink">
          <span aria-hidden="true" className="link-arrow-back text-[13px]">←</span>
          <span className="border-b border-dotted border-faint/70 pb-px">back</span>
        </TextLink>
        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </PaperPage>);

}
