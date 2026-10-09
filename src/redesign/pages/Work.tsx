import { SubpageLayout } from '../components/SubpageLayout';
import { EntryList } from '../components/EntryList';
import { experience, leadership } from '../data/experience';
import type { Entry, Role } from '../types/portfolio';

export function Work() {
  return (
    <SubpageLayout>
      <EntryList title="work" headingLevel="h1" entries={experience.map(toEntry)} delay={0.08} />
      <EntryList title="leadership" entries={leadership.map(toEntry)} singleLine delay={0.22} />
    </SubpageLayout>);

}

function toEntry(role: Role): Entry {
  return { key: role.slug, primary: role.organization, secondary: role.role, meta: role.dates, href: role.href };
}
