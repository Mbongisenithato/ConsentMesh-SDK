export interface ProductTier {
  id: string;
  name: string;
  monthlyPriceId: string;
  annualPriceId: string;
  monthlyAmount: number;
  annualAmount: number;
  amount: number; // legacy alias for UI compatibility
  priceId: string; // legacy alias for UI compatibility
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
    annualAmount: 379,
    amount: 39,
    priceId: process.env.STRIPE_STARTER_MONTHLY_ID || 'price_starter_m_stub',
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
    annualAmount: 1910,
    amount: 199,
    priceId: process.env.STRIPE_GROWTH_MONTHLY_ID || 'price_growth_m_stub',
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
    annualAmount: 4790,
    amount: 499,
    priceId: process.env.STRIPE_ENTERPRISE_MONTHLY_ID || 'price_enterprise_m_stub',
    consentsLimit: 1000000,
    domainsLimit: 'unlimited',
    features: ['Unlimited consents & high throughput', 'Dedicated AWS infrastructure partition', 'Custom zero-trust security audits', 'Verified Privacy trust badge'],
  },
  scale: {
    id: 'scale',
    name: 'Scale Tier',
    monthlyPriceId: process.env.STRIPE_SCALE_PRICE_ID || 'price_scale_stub',
    annualPriceId: process.env.STRIPE_SCALE_PRICE_ID || 'price_scale_stub',
    monthlyAmount: 1499,
    annualAmount: 14990,
    amount: 1499,
    priceId: process.env.STRIPE_SCALE_PRICE_ID || 'price_scale_stub',
    consentsLimit: 5000000,
    domainsLimit: 'unlimited',
    isEnterpriseSales: true,
    features: ['Up to 5M monthly active consents', 'Advanced webhook routing & global sync', 'Automated POPIA & GDPR DSAR handlers', 'Dedicated account manager'],
  },
  sovereign: {
    id: 'sovereign',
    name: 'Sovereign Enterprise',
    monthlyPriceId: process.env.STRIPE_SOVEREIGN_PRICE_ID || 'price_sovereign_stub',
    annualPriceId: process.env.STRIPE_SOVEREIGN_PRICE_ID || 'price_sovereign_stub',
    monthlyAmount: 3999,
    annualAmount: 39990,
    amount: 3999,
    priceId: process.env.STRIPE_SOVEREIGN_PRICE_ID || 'price_sovereign_stub',
    consentsLimit: 25000000,
    domainsLimit: 'unlimited',
    isEnterpriseSales: true,
    features: ['Up to 25M monthly active consents', 'Isolated AWS VPC partitions', 'Custom data residency & AWS KMS encryption', 'Cryptographic audit ledgers'],
  },
  government: {
    id: 'government',
    name: 'Critical Infrastructure & Gov',
    monthlyPriceId: process.env.STRIPE_GOV_PRICE_ID || 'price_gov_stub',
    annualPriceId: process.env.STRIPE_GOV_PRICE_ID || 'price_gov_stub',
    monthlyAmount: 10000,
    annualAmount: 100000,
    amount: 10000,
    priceId: process.env.STRIPE_GOV_PRICE_ID || 'price_gov_stub',
    consentsLimit: 'unlimited',
    domainsLimit: 'unlimited',
    isEnterpriseSales: true,
    features: ['Air-gapped deployment options', 'Zero-trust cryptographic verification', 'Custom SLA & 24/7 engineering support', 'Dedicated compliance officers'],
  },
};
