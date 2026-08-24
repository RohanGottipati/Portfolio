import type { AccentColor } from '../types/portfolio';

interface AccentStyle {
  bg: string;
  text: string;
  hex: string;
}

const map: Record<AccentColor, AccentStyle> = {
  tangerine: { bg: 'bg-tangerine', text: 'text-paper-2', hex: '#E8471A' },
  lime: { bg: 'bg-lime', text: 'text-ink', hex: '#C7DD52' },
  sky: { bg: 'bg-sky', text: 'text-ink', hex: '#A6C9EC' },
  peach: { bg: 'bg-peach', text: 'text-ink', hex: '#FFC6A6' },
  blush: { bg: 'bg-blush', text: 'text-ink', hex: '#F3A0B8' }
};

export function accent(color: AccentColor): AccentStyle {
  return map[color];
}

export const accentCycle: AccentColor[] = [
'tangerine',
'lime',
'sky',
'peach',
'blush'];
