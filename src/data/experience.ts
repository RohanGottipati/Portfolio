import type { Role } from '../types/portfolio';
import {
  clubs as clubEntries,
  education as educationEntry,
  experience as experienceEntries
} from './experience.mjs';

export const experience: Role[] = experienceEntries;
export const education = educationEntry;
export const clubs: Role[] = clubEntries;
