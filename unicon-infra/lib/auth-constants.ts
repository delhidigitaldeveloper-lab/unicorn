// Kept in its own file (no bcrypt/jose imports) so that middleware.ts,
// which runs on the Edge runtime, doesn't accidentally bundle Node-only
// dependencies just by importing this constant from lib/auth.ts.
export const SESSION_COOKIE = "unicon_admin_session";
