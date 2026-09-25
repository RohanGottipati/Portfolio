import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { generateRouteHtml } from '../scripts/generate-route-html.mjs';
import { PAGE_SEO, SITE_URL } from './data/seo.mjs';

it('generates indexable route shells with canonical and social metadata', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-seo-'));
  try {
    await writeFile(join(directory, 'index.html'), await readFile(join(process.cwd(), 'index.html')));
    await generateRouteHtml(directory);
    for (const key of ['brief', 'recognition']) {
      const seo = PAGE_SEO[key];
      const html = await readFile(join(directory, key, 'index.html'), 'utf8');
      expect(html).toContain(`<title>${seo.title}</title>`);
      expect(html).toContain(`href="${SITE_URL}/${key}"`);
      expect(html).toContain(`property="og:url" content="${SITE_URL}/${key}"`);
      expect(html).toContain('content="index, follow');
    }
    const molecule = await readFile(join(directory, 'work', 'molecule', 'index.html'), 'utf8');
    expect(molecule).toContain('<title>Molecule | Rohan Gottipati</title>');
    expect(molecule).toContain(`href="${SITE_URL}/work/molecule"`);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
