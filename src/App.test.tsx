import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

function open(path: string) {
  window.history.replaceState({}, '', path);
  return render(<App />);
}

describe('portfolio redesign', () => {
  it('shows a complete mobile description without arrows', async () => {
    open('/');
    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
    });

    const arrows = document.querySelector('svg[aria-hidden="true"]');
    expect(screen.getByText('Currently at Wilfrid Laurier University.')).toHaveClass('md:hidden');
    expect(arrows).toHaveClass('hidden');
    expect(arrows?.querySelectorAll('g')).toHaveLength(0);
  });

  it('shows the supplied home content and navigates to both lists', async () => {
    const user = userEvent.setup();
    open('/');

    expect(screen.getByRole('img', { name: /Toronto skyline/ })).toHaveAttribute(
      'src', '/b8e2024f-be86-4bcd-95d3-e3775abd17d4.jpg',
    );
    expect(screen.getByRole('heading', { name: 'Rohan Gottipati' })).toBeInTheDocument();
    expect(within(screen.getByRole('navigation', { name: 'Social links' })).getByRole('link', { name: 'resume' }))
      .toHaveAttribute('href', '/Rohan_Gottipati_Resume.pdf');
    expect(within(screen.getByRole('navigation', { name: 'Social links' })).getByRole('link', { name: 'resume' }))
      .toHaveAttribute('target', '_blank');
    expect(within(screen.getByRole('navigation', { name: 'Social links' })).getByRole('link', { name: 'x' }))
      .toHaveAttribute('href', 'https://x.com/RohanSGottipati');
    expect(screen.queryByRole('heading', { name: 'leadership' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'hackathons' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'education' })).toBeInTheDocument();
    expect(document.querySelector('[data-anchor="education"]')).toHaveTextContent('education');
    expect(screen.getByText('computer science, big data')).toHaveClass('text-ink');
    expect(screen.getByText('Currently')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'experience' })).toHaveClass('font-normal', 'text-ink');
    expect(screen.queryByText('1st overall, Sun Life Hackathon')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Molecule' })).toHaveAttribute('href', 'https://github.com/RohanGottipati/Molecule');
    expect(screen.getByRole('link', { name: 'TechTO' })).toHaveAttribute('href', 'https://github.com/RohanGottipati/TechTO');
    expect(screen.getByRole('link', { name: 'A.U.R.A.' })).toHaveAttribute('href', 'https://github.com/RohanGottipati/A.U.R.A');

    await user.click(screen.getByRole('link', { name: 'experience' }));
    expect(screen.getByRole('img', { name: /Toronto skyline/ })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Rohan Gottipati' })).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Social links' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'leadership' })).toBeInTheDocument();
    expect(screen.getByText('Intact Financial')).toBeInTheDocument();
    expect(screen.getByText('Google Developers Group, WLU')).toBeInTheDocument();
    expect(screen.getByText('finance executive')).toBeInTheDocument();
    expect(screen.getByText('Laurier Analytics Society')).toBeInTheDocument();
    expect(screen.getByText('vice president of technology')).toBeInTheDocument();
    expect(screen.getByText('Laurier Computing Society')).toBeInTheDocument();
    expect(screen.getByText('vice president of finance')).toBeInTheDocument();
    expect(screen.getByText('software architecture intern, software engineering & integrations')).toBeInTheDocument();
    expect(document.title).toBe('Work | Rohan Gottipati');

    await user.click(screen.getByRole('link', { name: 'back' }));
    await user.click(screen.getByRole('link', { name: 'projects' }));
    expect(screen.getByRole('img', { name: /Toronto skyline/ })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Social links' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GreenLens AI on GitHub' })).toHaveAttribute(
      'href', 'https://github.com/RohanGottipati/Greenlens',
    );
    expect(screen.getByRole('link', { name: 'Visit TechTO live site' })).toHaveAttribute(
      'href', 'https://tech-to.vercel.app',
    );
  });

  it('loads the work and projects pages directly', () => {
    const work = open('/work');
    expect(screen.getByRole('heading', { name: 'leadership' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'education' })).not.toBeInTheDocument();
    work.unmount();

    open('/projects');
    expect(screen.getByText('Molecule')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Molecule on GitHub' })).toHaveAttribute(
      'href', 'https://github.com/RohanGottipati/Molecule',
    );
    expect(screen.getByText('GitHub Universe finalist, Hack the North 2026')).toBeInTheDocument();
    expect(screen.getByText('Best Use of MongoDB, Hack the 6ix')).toBeInTheDocument();
    expect(screen.getByText('3rd overall, SummerHacks')).toBeInTheDocument();
    expect(screen.getByText('Best Use of Solana, uOttaHack')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Visit This Portfolio live site' })).toHaveAttribute('href', 'https://rohangottipati.com');
  });
});
