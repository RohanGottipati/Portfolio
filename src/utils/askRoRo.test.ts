import { describe, expect, it } from 'vitest';
import { askRoRo } from './askRoRo';

describe('RoRo local fallback boundary', () => {
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
      '2nd Place'
    );
    expect(askRoRo('What did you build at DOUBL?').text).toContain('802 commits');
    expect(askRoRo('What did you build at DOUBL?').text).toContain(
      '4,283 missing analytics rows'
    );
    expect(askRoRo('Tell me about TeachTrack').text).toContain(
      'Cut assessment and reporting effort by 40%'
    );
    expect(askRoRo("What's on your resume?").text).toContain(
      'My résumé PDF covers Intact, DOUBL, OneChart, and AvertoAI'
    );
    expect(askRoRo('Tell me about your research').text).toContain(
      '10K+ labeled sentiment data points'
    );
  });
});
