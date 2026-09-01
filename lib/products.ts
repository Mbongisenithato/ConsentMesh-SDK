export interface ProductTier {
  id: string;
  name: string;
  priceId: string;
  amount: number;
  interval: 'month' | 'year';
  consentsLimit: number;
  domainsLimit: number | 'unlimited';
  features: string[];
}

export const PRODUCTS: Record<string, ProductTier> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    priceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter_stub',
    amount: 39,
    interval: 'month',
    consentsLimit: 10000,
    domainsLimit: 3,
    features: ['10,000 monthly active consents', 'Up to 3 active domains', 'Standard telemetry & audit logs', 'Community support channel'],
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || 'price_growth_stub',
    amount: 199,
    interval: 'month',
    consentsLimit: 100000,
    domainsLimit: 'unlimited',
    features: ['100,000 monthly active consents', 'Unlimited active domains', 'Real-time DynamoDB telemetry', 'Priority webhook routing'],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_stub',
    amount: 499,
    interval: 'month',
    consentsLimit: 1000000,
    domainsLimit: 'unlimited',
    features: ['Unlimited consents & high throughput', 'Dedicated AWS infrastructure partition', 'Custom zero-trust security audits', '24/7 dedicated support manager'],
  },
};
