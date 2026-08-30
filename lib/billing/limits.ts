export const TIER_LIMITS = {
  free: { maxDomains: 1, maxEvents: 1000 },
  starter: { maxDomains: 1, maxEvents: 10000 },
  growth: { maxDomains: 5, maxEvents: 100000 },
  enterprise: { maxDomains: Infinity, maxEvents: Infinity },
};

export function checkTierLimit(tier: keyof typeof TIER_LIMITS, currentEvents: number, domainCount: number) {
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  
  if (domainCount > limits.maxDomains) {
    return { allowed: false, reason: 'Domain limit reached for current tier. Please upgrade.' };
  }
  if (currentEvents >= limits.maxEvents) {
    return { allowed: false, reason: 'Monthly consent event quota exceeded. Overage charges or tier upgrade required.' };
  }

  return { allowed: true };
}
