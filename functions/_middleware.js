// Google Search Console verification — serve the token file directly at its
// exact .html URL (Cloudflare Pages would otherwise 308 it to the
// extensionless path, and Google's file verification does not follow redirects).
const TOKEN_PATH = "/googleb7b2b92fa06c76d4.html";
const TOKEN_BODY = "google-site-verification: googleb7b2b92fa06c76d4.html\n";

export function onRequest(context) {
  const { request } = context;
  if (new URL(request.url).pathname === TOKEN_PATH) {
    return new Response(TOKEN_BODY, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  return context.next();
}
