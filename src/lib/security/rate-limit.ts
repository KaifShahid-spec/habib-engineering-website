/**
 * Rate Limiting Utility.
 * 
 * ⚠️ NOTE: This uses an in-memory Map which resets when the server restarts.
 * For production on Vercel/Serverless, replace the `memoryStore` logic with Upstash Redis:
 * https://github.com/upstash/ratelimit
 */

type RateLimitOptions = {
  key: string;      // e.g., "contact:192.168.1.1"
  limit: number;    // e.g., 5 requests
  window: string;   // e.g., "1 h", "10 m"
};

// In-memory store: key -> { count, resetAt }
const memoryStore = new Map<string, { count: number; resetAt: number }>();

// Helper to parse "1 h", "10 m" into milliseconds
function parseWindow(window: string): number {
  const match = window.match(/^(\d+)\s*(s|m|h|d)$/);
  if (!match) return 60 * 60 * 1000; // default 1 hour

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    case "d": return value * 24 * 60 * 60 * 1000;
    default: return 60 * 60 * 1000;
  }
}

export async function rateLimit(options: RateLimitOptions): Promise<{ ok: boolean }> {
  const { key, limit, window } = options;
  const now = Date.now();
  const windowMs = parseWindow(window);

  // Cleanup expired entries to prevent memory leaks
  if (memoryStore.size > 1000) {
    for (const [k, v] of memoryStore.entries()) {
      if (now > v.resetAt) memoryStore.delete(k);
    }
  }

  const record = memoryStore.get(key);

  // First request or window expired
  if (!record || now > record.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  // Within window
  if (record.count >= limit) {
    return { ok: false }; // Rate limited
  }

  // Increment
  record.count += 1;
  return { ok: true };
}