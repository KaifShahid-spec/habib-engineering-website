/**
 * Captcha Verification Utility.
 * Uses Cloudflare Turnstile.
 * 
 * Frontend par widget lagane ke liye:
 * <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
 * 
 * Env vars required in production:
 * - NEXT_PUBLIC_TURNSTILE_SITE_KEY (frontend)
 * - TURNSTILE_SECRET_KEY (backend)
 */

export async function verifyCaptcha(token?: string): Promise<{ ok: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // 1. Skip validation in development if no secret key is configured
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[captcha] TURNSTILE_SECRET_KEY missing. Bypassing captcha in dev mode.");
      return { ok: true };
    }
    console.error("[captcha] TURNSTILE_SECRET_KEY missing in production!");
    return { ok: false, error: "Server misconfiguration." };
  }

  // 2. Token missing from frontend
  if (!token) {
    return { ok: false, error: "Captcha token missing." };
  }

  // 3. Verify with Cloudflare API
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }).toString(),
    });

    const data = await response.json();

    if (!data.success) {
      return { ok: false, error: "Captcha verification failed." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[captcha] Verification request failed:", error);
    return { ok: false, error: "Captcha verification error." };
  }
}