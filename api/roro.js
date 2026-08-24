import { answerPortfolioQuestion } from '../server/roro.mjs';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const payload =
      typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const result = await answerPortfolioQuestion(payload);
    return response.status(200).json(result);
  } catch (error) {
    const status = Number.isInteger(error?.statusCode)
      ? error.statusCode
      : 500;
    const message =
      status === 503
        ? 'RoRo is not configured yet.'
        : 'RoRo could not answer right now.';
    return response.status(status).json({ error: message });
  }
}
