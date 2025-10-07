import PrimaryButton from './PrimaryButton';

function PricingPlans() {
    const plans = [
        {
            name: 'Basic',
            price: '€10/mo',
            features: ['Gratis WP-thema', 'Mobielvriendelijk', 'SEO-optimalisatie'],
        },
        {
            name: 'Standard',
            price: '€20/mo',
            features: ['Premium Divi-thema', 'Professionele templates', 'SEO-optimalisatie', 'reCAPTCHA beveiliging'],
        },
        {
            name: 'Premium',
            price: '€30/mo',
            features: ['Webshop met Divi', 'WooCommerce integratie', 'iDEAL & PayPal', 'Voorraadbeheer', 'Kortingscodes & filters'],
        },
    ];

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 md:grid-cols-3">
            {plans.map((plan, index) => (
                <div key={index} className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-md hover:bg-fuchsia-100">
                    <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                    <p className="mb-4 text-3xl font-semibold">{plan.price}</p>
                    <ul className="mb-6 space-y-2">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="text-gray-600">
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <PrimaryButton>Choose Plan</PrimaryButton>
                </div>
            ))}
        </div>
    );
}

export default PricingPlans;
