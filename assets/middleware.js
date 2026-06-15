// Edge middleware: HTTP Basic Auth gate for the whole deck.
// Plan-agnostic (works on Hobby), real server-side auth (not view-source bypassable).
// Change USER / PASS below to rotate credentials, then redeploy.
export const config = { matcher: '/:path*' };

const USER = 'CHANGE_ME';
const PASS = 'CHANGE_ME';

export default function middleware(request) {
  const auth = request.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const i = decoded.indexOf(':');
      const u = decoded.slice(0, i);
      const p = decoded.slice(i + 1);
      if (u === USER && p === PASS) return; // authorised → serve
    }
  }
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Deck", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
