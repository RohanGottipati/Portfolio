import { projects } from './projects.mjs';

export const recognition = projects.filter((project) => project.impact).map((project) => ({
  project,
  event: project.event ?? project.impact.split(', ').slice(1).join(', '),
  result: project.recognitionResult ?? project.impact.split(', ')[0],
}));

export const recognitionCount = recognition.length;
export const recognitionLabel = `${recognitionCount} hackathon placements & awards`;
