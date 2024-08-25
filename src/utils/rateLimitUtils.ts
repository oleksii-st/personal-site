const rateLimitMaps = new Map<string, Map<string, RateLimitData>>();
const defaultLimit = 5;
const defaultWindowMs = 5 * 60 * 1000;

interface RateLimitData {
  count: number;
  lastReset: number;
}

export function checkRateLimit(
  routeId: string,
  ip: string,
  limit = defaultLimit,
  windowMs = defaultWindowMs,
): boolean {
  if (!rateLimitMaps.has(routeId)) {
    rateLimitMaps.set(routeId, new Map());
  }

  const routeRateLimitMap = rateLimitMaps.get(routeId) as Map<string, RateLimitData>;

  if (!routeRateLimitMap.has(ip)) {
    routeRateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = routeRateLimitMap.get(ip) as RateLimitData;

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return false;
  }

  ipData.count += 1;
  return true;
}
