export interface ProductTier {
  id: string;
  name: string;
  monthlyPriceId: string;
  annualPriceId: string;
  monthlyAmount: number;
  annualAmount: number;
  consentsLimit: number | 'unlimited';
  domainsLimit: number | 'unlimited';
  isEnterpriseSales?: boolean;
  features: string[];
}

export const PRODUCTS: Record<string, ProductTier> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    monthlyPriceId: process.env.STRIPE_STARTER_MONTHLY_ID || 'price_starter_m_stub',
    annualPriceId: process.env.STRIPE_STARTER_ANNUAL_ID || 'price_starter_a_stub',
    monthlyAmount: 39,
    annualAmount: 379, // ~20% discount (~$31.50/mo)
    consentsLimit: 10000,
    domainsLimit: 3,
    features: ['10,000 monthly active consents', 'Up to 3 active domains', 'Standard telemetry & audit logs', 'Free 1-year audit log retention (Pre-launch bonus)'],
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    monthlyPriceId: process.env.STRIPE_GROWTH_MONTHLY_ID || 'price_growth_m_stub',
    annualPriceId: process.env.STRIPE_GROWTH_ANNUAL_ID || 'price_growth_a_stub',
    monthlyAmount: 199,
    annualAmount: 1910, // ~20% discount
    consentsLimit: 100000,
    domainsLimit: 'unlimited',
    features: ['100,000 monthly active consents', 'Unlimited active domains', 'Real-time DynamoDB telemetry', 'White-glove data migration included'],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPriceId: process.env.STRIPE_ENTERPRISE_MONTHLY_ID || 'price_enterprise_m_stub',
    annualPriceId: process.env.STRIPE_ENTERPRISE_ANNUAL_ID || 'price_enterprise_a_stub',
    monthlyAmount: 499,
    annualAmount: 4790, // ~20% discount
    consentsLimit: 1000000,
    domainsLimit: 'unlimited',
    features: ['Unlimited consents & high throughput', 'Dedicated AWS infrastructure partition', 'Custom zero-trust security audits', 'Verified Privacy trust badge'],
  },
};
