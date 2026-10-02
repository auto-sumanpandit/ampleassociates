/**
 * Edge entry for the static site (Cloudflare Workers static assets).
 * One canonical form for every URL: https, without "www". Anything else gets a
 * permanent redirect that keeps the path and query; all other requests are served
 * from the static build (dist/), where _headers and _redirects still apply.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let redirect = false;

    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      redirect = true;
    }
    if (url.protocol === "http:") {
      url.protocol = "https:";
      redirect = true;
    }
    if (redirect) return Response.redirect(url.toString(), 301);

    return env.ASSETS.fetch(request);
  },
};
