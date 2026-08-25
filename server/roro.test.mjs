import { describe, expect, it, vi } from 'vitest';
import {
  answerPortfolioQuestion,
  isPortfolioQuestion,
  roroReplies
} from './roro.mjs';

describe('RoRo portfolio boundary', () => {
  it('rejects unrelated questions without calling Gemini', async () => {
    const fetchImpl = vi.fn();
    const result = await answerPortfolioQuestion(
      { question: 'What is the capital of France?' },
      { apiKey: 'test-key', fetchImpl }
    );

    expect(result.answer).toBe(roroReplies.offTopic);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('allows portfolio questions and highlighted portfolio text', () => {
    expect(isPortfolioQuestion('What did you build at DOUBL?')).toBe(true);
    expect(isPortfolioQuestion('Tell me about ScotiaCheck.')).toBe(true);
    expect(isPortfolioQuestion('What React projects have you built?')).toBe(true);
    expect(isPortfolioQuestion('How can I reach you?')).toBe(true);
    expect(isPortfolioQuestion('How do I get in touch?')).toBe(true);
    expect(isPortfolioQuestion('Do you know Python?')).toBe(true);
    expect(
      isPortfolioQuestion('Is this accurate?', "I'm Rohan, a software engineer.")
    ).toBe(true);
    expect(isPortfolioQuestion('Give me a pasta recipe.')).toBe(false);
    expect(isPortfolioQuestion('Write me a Java sorting algorithm.')).toBe(false);
    expect(isPortfolioQuestion('How does Kubernetes work?')).toBe(false);
    expect(
      isPortfolioQuestion('What is the capital of France?', '', [
        { role: 'assistant', text: 'I built GreenLens AI.' }
      ])
    ).toBe(false);
    expect(
      isPortfolioQuestion('Tell me more', '', [
        { role: 'assistant', text: 'I built GreenLens AI.' }
      ])
    ).toBe(true);
    expect(
      isPortfolioQuestion('Tell me more', '', [
        { role: 'assistant', text: roroReplies.offTopic }
      ])
    ).toBe(false);
  });

  it('sends an adaptive, server-side portfolio prompt to Gemini', async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        steps: [
          {
            type: 'model_output',
            content: [
              {
                type: 'text',
                text: "Yes, that's correct \u2014 I'm a software engineer."
              }
            ]
          }
        ]
      })
    }));

    const result = await answerPortfolioQuestion(
      {
        question: 'Tell me about this selection.',
        selection: "I'm Rohan, a software engineer."
      },
      { apiKey: 'test-key', model: 'test-model', fetchImpl }
    );

    expect(result.answer).toBe("Yes, that's correct - I'm a software engineer.");
    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [, options] = fetchImpl.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body).toMatchObject({
      model: 'test-model',
      store: false,
      generation_config: {
        thinking_level: 'low'
      }
    });
    expect(body.system_instruction).toContain(
      'Answer only questions about Rohan'
    );
    expect(body.system_instruction).toContain('Most answers should be 2 to 4');
    expect(body.system_instruction).toContain(
      'A generic question about coding, technology, a company, current events, or an unrelated topic is not a portfolio question'
    );
    expect(body.system_instruction).toContain(
      'each item on its own line beginning with "• "'
    );
    expect(body.input).toContain("I'm Rohan, a software engineer.");
  });
});
