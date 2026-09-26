import { describe, expect, it } from 'vitest';
import { askRoRo } from './askRoRo';

describe('RoRo local fallback boundary', () => {
  it('reflects current campus leadership, Quick View, and toolkit', () => {
    expect(askRoRo('What do you do as VP of Tech at LAS?').text).toContain('end-to-end analytics project each semester');
    expect(askRoRo('Tell me about LCS').text).toContain('annual budget');
    expect(askRoRo('What do you lead at Laurier?').text).toContain('open source program');
    expect(askRoRo('Show me the quick view of your portfolio').text).toContain('starting with Molecule');
    expect(askRoRo('What tools do you use in your projects?').text).toContain('Linear');
    expect(askRoRo('What awards has your portfolio earned?').links?.[0].to).toBe('/recognition');
    expect(askRoRo('Tell me about A.U.R.A.').text).toContain('2x Sponsor Award Winner');
  });

  it('rejects unrelated and generic requests', () => {
    expect(askRoRo('What is the capital of France?').text).toContain(
      'I can only help with questions about my portfolio'
    );
    expect(askRoRo('Write me a Java sorting algorithm.').text).toContain(
      'I can only help with questions about my portfolio'
    );
  });

  it('answers questions tied to the portfolio', () => {
    expect(askRoRo('What experience do you have?').text).toContain(
      "I've held"
    );
    expect(askRoRo('Tell me about GreenLens AI').text).toContain(
      'Our six-agent pipeline'
    );
    expect(askRoRo('Tell me about GreenLens AI').text).toContain(
      'It earned'
    );
    expect(askRoRo('Tell me about ScotiaCheck').text).toContain(
      'without reducing nuanced advice'
    );
    expect(askRoRo('Tell me about ScotiaCheck').text).toContain(
      '2nd Overall'
    );
    expect(askRoRo('What did you build at DOUBL?').text).toContain('800+ commits');
    expect(askRoRo('What did you build at DOUBL?').text).toContain(
      '4,283 missing analytics rows'
    );
    expect(askRoRo('Tell me about TeachTrack').text).toContain(
      'Cut assessment and reporting effort by 40%'
    );
    expect(askRoRo('Tell me about Molecule').text).toContain('CP-SAT-certified graphs');
    expect(askRoRo("What's on your resume?").text).toContain(
      'My résumé PDF covers Intact, DOUBL, OneChart, and AvertoAI'
    );
    expect(askRoRo('Tell me about your research').text).toContain(
      '10K+ labeled sentiment data points'
    );
  });
});
