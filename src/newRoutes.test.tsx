import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { App } from './App';
import { recognition, recognitionCount, recognitionLabel } from './data/recognition.mjs';
import { projects, featuredProjects, quickViewProjects } from './data/projects.mjs';
import { PAGE_SEO } from './data/seo.mjs';
import { shouldUseLenis } from './components/SmoothScroll';
import { askRoRo } from './utils/askRoRo';
import { profile } from './data/profile';

function open(path: string) {
  window.history.replaceState({}, '', path);
  return render(<App paperGrain={false}/>);
}

describe('new portfolio routes', () => {
  beforeEach(() => vi.clearAllMocks());

  it('loads Quick View directly without the intro and with concise contact and experience', async () => {
    open('/brief');
    expect(screen.queryByRole('dialog', {name: 'Portfolio introduction'})).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Rohan Gottipati'})).toBeInTheDocument();
    expect(screen.getByText(profile.intro)).toBeInTheDocument();
    expect(document.querySelector('[data-quick-view] header')).toHaveClass('items-center', 'justify-center', 'text-center');
    expect(screen.getAllByText(/Wilfrid Laurier University/).length).toBeGreaterThan(0);
    expect(screen.getByText(recognitionLabel)).toBeInTheDocument();
    expect(document.querySelector('[data-quick-view]')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', {name: 'Primary'})).not.toBeInTheDocument();
    expect(quickViewProjects).toHaveLength(6);
    expect(screen.getByRole('link', {name: /Molecule/})).toHaveAttribute('href', '/work/molecule');
    expect(screen.queryByText(/recovered 4,283 missing analytics rows/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: /View all projects/})).toHaveAttribute('href', '/work');
    await waitFor(() => expect(document.title).toBe(PAGE_SEO.brief.title));
  });

  it('derives recognition count from project results and links each result', () => {
    expect(recognitionCount).toBe(recognition.length);
    expect(recognitionCount).toBe(9);
    open('/recognition');
    expect(screen.getByRole('heading', {name: 'Recognition'})).toBeInTheDocument();
    expect(screen.getByText(recognitionLabel)).toBeInTheDocument();
    expect(screen.queryByText(/Each card links to the project behind the result/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: /1st Overall.*GreenLens AI/})).toHaveTextContent('Laurier Analytics Society x Sun Life Hackathon');
    expect(screen.getByRole('link', {name: /Best Use of MongoDB Atlas/})).toHaveAttribute('href', '/work/techto');
  });

  it('renders the extended featured cases and the generic fallback', async () => {
    expect(featuredProjects).toHaveLength(5);
    expect(featuredProjects.every(project => project.caseStudy)).toBe(true);
    open('/work/techto');
    expect(await screen.findByRole('heading', {name: /The system/})).toBeInTheDocument();
    expect(screen.getByText('100K+')).toBeInTheDocument();
  });

  it('keeps unextended projects and unknown routes usable', async () => {
    expect(projects.find(project => project.slug === 'molecule')?.caseStudy).toBeUndefined();
    const view = open('/work/molecule');
    expect(await screen.findByRole('heading', {name: 'How it works'})).toBeInTheDocument();
    expect(screen.queryByRole('img', {name: /Preview of my Molecule project/})).not.toBeInTheDocument();
    view.unmount();
    open('/unknown-route');
    expect(screen.getByRole('heading', {name: "I couldn't find that page."})).toBeInTheDocument();
  });

  it('does not leave a dead Build Wall route behind', () => {
    open('/wall');
    expect(screen.getByRole('heading', {name: "I couldn't find that page."})).toBeInTheDocument();
  });

  it('moves through project, experience, and Quick View pages without replaying the intro', async () => {
    const user = userEvent.setup();
    open('/work');
    await user.click(screen.getByRole('link', {name: /GreenLens AI/}));
    expect(await screen.findByRole('heading', {name: 'GreenLens AI'})).toBeInTheDocument();
    await user.click(screen.getByRole('link', {name: 'All projects'}));
    expect(await screen.findByRole('heading', {name: `${projects.length} projects. Pick one.`})).toBeInTheDocument();
    await user.click(within(screen.getByRole('navigation', {name: 'Primary'})).getByRole('link', {name: 'Experience'}));
    expect(await screen.findByRole('heading', {name: "Where I've worked and what I did."})).toBeInTheDocument();
    await user.click(within(screen.getByRole('contentinfo')).getByRole('link', {name: /Quick View/}));
    expect(await screen.findByRole('heading', {name: 'Rohan Gottipati'})).toBeInTheDocument();
    expect(screen.queryByRole('navigation', {name: 'Primary'})).not.toBeInTheDocument();
    await user.click(screen.getByRole('link', {name: /Back to full portfolio/}));
    expect(await screen.findByRole('navigation', {name: 'Primary'})).toBeInTheDocument();
    expect(screen.queryByRole('dialog', {name: 'Portfolio introduction'})).not.toBeInTheDocument();
    expect(document.querySelectorAll('main')).toHaveLength(1);
  });

  it('shows the intro once on a home visit, not again when returning from another page', async () => {
    const user = userEvent.setup();
    open('/');
    await user.click(screen.getByRole('button', {name: /click anywhere to skip/i}));
    await waitFor(() => expect(screen.queryByRole('dialog', {name: 'Portfolio introduction'})).not.toBeInTheDocument());
    await user.click(within(screen.getByRole('navigation', {name: 'Primary'})).getByRole('link', {name: 'Projects'}));
    expect(await screen.findByRole('heading', {name: `${projects.length} projects. Pick one.`})).toBeInTheDocument();
    await user.click(within(screen.getByRole('navigation', {name: 'Primary'})).getByRole('link', {name: 'Rohan Gottipati'}));
    expect(await screen.findByRole('heading', {name: /I'm Rohan, a software engineer/})).toBeInTheDocument();
    expect(screen.queryByRole('dialog', {name: 'Portfolio introduction'})).not.toBeInTheDocument();
  });

  it('exposes new navigation, SEO and RoRo destinations', () => {
    open('/');
    const nav = screen.getByRole('navigation', {name: 'Primary'});
    expect(nav.querySelector('a[href="/brief"]')).not.toBeInTheDocument();
    expect(nav.querySelector('a[href="/recognition"]')).toBeInTheDocument();
    expect(within(screen.getByRole('main')).getByRole('link', {name: /Quick View/})).toHaveAttribute('href', '/brief');
    for (const key of ['brief', 'recognition'] as const) expect(PAGE_SEO[key].path).toBe(`/${key}`);
    expect(askRoRo('What is the quick version of his experience?').links?.[0].to).toBe('/brief');
    expect(askRoRo('Where can I see his awards?').links?.[0].to).toBe('/recognition');
  });

  it('does not initialize inertia when reduced motion or coarse pointer is requested', () => {
    expect(shouldUseLenis(query => query.includes('prefers-reduced-motion'))).toBe(false);
    expect(shouldUseLenis(query => query.includes('pointer: coarse'))).toBe(false);
    expect(shouldUseLenis(() => false)).toBe(true);
    open('/brief');
    expect(document.documentElement).not.toHaveClass('lenis');
    expect(document.querySelector('[data-scroll-progress]')).not.toBeInTheDocument();
  });
});
