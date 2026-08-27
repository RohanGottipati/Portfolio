import { answerPortfolioQuestion } from './roro.mjs';

async function readJson(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 2_000_000) {
      const error = new Error('Request is too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

export function roroDevApi({ apiKey, model }) {
  return {
    name: 'roro-dev-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = request.url?.split('?')[0];
        if (url !== '/api/roro') {
          next();
          return;
        }

        if (request.method !== 'POST') {
          response.setHeader('Allow', 'POST');
          sendJson(response, 405, { error: 'Method not allowed.' });
          return;
        }

        try {
          const payload = await readJson(request);
          const result = await answerPortfolioQuestion(payload, {
            apiKey,
            model
          });
          sendJson(response, 200, result);
        } catch (error) {
          const status = Number.isInteger(error?.statusCode)
            ? error.statusCode
            : 500;
          sendJson(response, status, {
            error:
              status === 503
                ? 'RoRo is not configured yet.'
                : 'RoRo could not answer right now.'
          });
        }
      });
    }
  };
}
