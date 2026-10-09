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
    for (const key of ['work', 'projects']) {
      const seo = PAGE_SEO[key];
      const html = await readFile(join(directory, key, 'index.html'), 'utf8');
      expect(html).toContain(`<title>${seo.title}</title>`);
      expect(html).toContain(`href="${SITE_URL}/${key}"`);
      expect(html).toContain(`property="og:url" content="${SITE_URL}/${key}"`);
      expect(html).toContain(`property="og:image:alt" content="${seo.imageAlt}"`);
      expect(html).toContain('content="index, follow');
    }
    const home = await readFile(join(directory, 'index.html'), 'utf8');
    expect(home).toContain(PAGE_SEO.home.image);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
