export interface UserProfile {
  userId: string;
  email: string;
  tier: 'free' | 'starter' | 'growth' | 'enterprise';
  billingCycle: 'monthly' | 'annual' | 'none';
  stripeSubscriptionId?: string;
  activeDomains: string[];
}

export interface UsageLedger {
  PK: string;
  consentCount: number;
  lastEventTimestamp: string;
}
