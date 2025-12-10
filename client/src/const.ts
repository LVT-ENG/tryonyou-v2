export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "TRYONYOU — ABVETOS — ULTRA PLUS ULTIMATUM";

export const APP_LOGO = import.meta.env.VITE_APP_LOGO || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='gold' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23FFD700;stop-opacity:1' /><stop offset='100%' style='stop-color:%23D4AF37;stop-opacity:1' /></linearGradient></defs><circle cx='100' cy='100' r='95' fill='%231a1a1a' stroke='url(%23gold)' stroke-width='3'/><text x='100' y='130' font-size='90' font-weight='bold' fill='url(%23gold)' text-anchor='middle' font-family='Playfair Display'>T</text></svg>";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
