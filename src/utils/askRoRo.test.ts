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
      'My team and I won'
    );
  });
});
