'use client';

export default function PricingPage() {
  const userId = "user_12345";

  async function handleCheckout(priceId: string, userId: string) {
    try {
      const response = await fetch('/api/v1/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>
      <button 
        onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!, userId)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upgrade to Starter (/mo)
      </button>
    </div>
  );
}
