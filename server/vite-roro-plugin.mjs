import { answerPortfolioQuestion } from './roro.mjs';

async function readJson(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 24_000) {
      const error = new Error('Request is too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export function roroDevApi({ apiKey, model }) {
  return {
    name: 'roro-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/roro', async (request, response) => {
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-store');

        if (request.method !== 'POST') {
          response.statusCode = 405;
          response.setHeader('Allow', 'POST');
          response.end(JSON.stringify({ error: 'Method not allowed.' }));
          return;
        }

        try {
          const payload = await readJson(request);
          const result = await answerPortfolioQuestion(payload, {
            apiKey,
            model
          });
          response.statusCode = 200;
          response.end(JSON.stringify(result));
        } catch (error) {
          response.statusCode = Number.isInteger(error?.statusCode)
            ? error.statusCode
            : 500;
          response.end(
            JSON.stringify({
              error:
                response.statusCode === 503
                  ? 'RoRo is not configured yet.'
                  : 'RoRo could not answer right now.'
            })
          );
        }
      });
    }
  };
}
