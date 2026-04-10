// Cloudflare Pages Functions middleware — CORS + shared headers

const ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:8788'];

function getCorsOrigin(request: Request, env: Record<string, string>): string {
  const origin = request.headers.get('Origin') || '';
  // In production, allow the configured frontend URL
  if (env.FRONTEND_URL && origin === env.FRONTEND_URL) return origin;
  // In development, allow localhost origins
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // Fallback: same-origin requests have no Origin header
  return '';
}

export const onRequest: PagesFunction<Record<string, string>> = async (context) => {
  const { request, env } = context;
  const corsOrigin = getCorsOrigin(request, env);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Run the actual function
  const response = await context.next();

  // Attach CORS headers to the response
  const headers = new Headers(response.headers);
  if (corsOrigin) {
    headers.set('Access-Control-Allow-Origin', corsOrigin);
  }
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
