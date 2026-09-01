export interface ProductTier {
  id: string;
  name: string;
  priceId: string;
  amount: number;
  interval: 'month' | 'year';
  consentsLimit: number | 'unlimited';
  domainsLimit: number | 'unlimited';
  isEnterpriseSales?: boolean;
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
  scale: {
    id: 'scale',
    name: 'Scale Tier',
    priceId: process.env.STRIPE_SCALE_PRICE_ID || 'price_scale_stub',
    amount: 1499,
    interval: 'month',
    consentsLimit: 5000000,
    domainsLimit: 'unlimited',
    isEnterpriseSales: true,
    features: ['Up to 5M monthly active consents', 'Advanced webhook routing & global sync', 'Automated POPIA & GDPR DSAR handlers', 'Dedicated account manager'],
  },
  sovereign: {
    id: 'sovereign',
    name: 'Sovereign Enterprise',
    priceId: process.env.STRIPE_SOVEREIGN_PRICE_ID || 'price_sovereign_stub',
    amount: 3999,
    interval: 'month',
    consentsLimit: 25000000,
    domainsLimit: 'unlimited',
    isEnterpriseSales: true,
    features: ['Up to 25M monthly active consents', 'Isolated AWS VPC partitions', 'Custom data residency & AWS KMS encryption', 'Cryptographic audit ledgers'],
  },
  government: {
    id: 'government',
    name: 'Critical Infrastructure & Gov',
    priceId: process.env.STRIPE_GOV_PRICE_ID || 'price_gov_stub',
    amount: 10000,
    interval: 'month',
    consentsLimit: 'unlimited',
    domainsLimit: 'unlimited',
    isEnterpriseSales: true,
    features: ['Air-gapped deployment options', 'Zero-trust cryptographic verification', 'Custom SLA & 24/7 engineering support', 'Dedicated compliance officers'],
  },
};
