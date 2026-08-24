import type { SkillGroup } from '../types/portfolio';

export const skills: SkillGroup[] = [
{
  key: 'languages',
  label: 'Languages',
  summary: 'Programming and markup languages.',
  items: [
  'TypeScript',
  'Python',
  'JavaScript',
  'SQL',
  'Java',
  'C++',
  'C',
  'R',
  'HTML',
  'CSS']

},
{
  key: 'frameworks',
  label: 'Frameworks & Technologies',
  summary: 'How the products get built.',
  items: [
  'React',
  'Next.js',
  'Node.js',
  'FastAPI',
  'Express',
  'Three.js',
  'WebSockets',
  'Tailwind CSS']

},
{
  key: 'cloud',
  label: 'Cloud & Databases',
  summary: 'Where applications run and data lives.',
  items: [
  'Google Cloud Platform',
  'AWS',
  'PostgreSQL',
  'Firebase',
  'MongoDB Atlas',
  'BigQuery',
  'Supabase']

},
{
  key: 'devtools',
  label: 'Developer Tools',
  summary: 'Day-to-day workflow.',
  items: [
  'Git',
  'Docker',
  'GitHub Actions',
  'Claude Code',
  'Codex',
  'Jira',
  'Linear']

},
{
  key: 'ai-data',
  label: 'AI APIs & Data',
  summary: 'Models, pipelines and analysis tools.',
  items: [
  'OpenAI API',
  'Gemini API',
  'pandas',
  'NumPy',
  'scikit-learn',
  'statsmodels',
  'ggplot2']

}];
