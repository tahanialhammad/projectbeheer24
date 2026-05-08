import PrimaryButton from './PrimaryButton';

function PricingPlans() {
    const plans = [
        {
            name: 'Basic',
            price: '€29/mo',
            features: ['Perfect for simple websites and startups', 'Mobile-friendly website', 'Basic SEO optimization', 'Easy content management'],
        },
        {
            name: 'Standard',
            price: '€49/mo',
            features: ['Ideal for professional business websites', 'Premium design templates', 'Advanced SEO optimization', 'Security & spam protection'],
        },
        {
            name: 'Premium',
            price: '€79/mo',
            features: ['Best for eCommerce or advanced functionality', 'WooCommerce online store', 'Payment gateway integration', 'Product & order management'],
        },
    ];

    return (
        <div>
            <div className="mx-auto my-8 flex w-2/3 flex-col gap-2 text-center">
                <h1 className="text-fuchsia-500 text-3xl font-bold capitalize">Flexible Pricing for Every Business</h1>
                <h2 className="text-xl font-bold">Whether you need a simple website or a custom web application, we offer solutions tailored to your needs.</h2>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 md:grid-cols-3">
                {plans.map((plan, index) => (
                    <div key={index} className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-md hover:bg-fuchsia-100">
                        <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                        <p className="mb-4 text-3xl font-semibold">{plan.price}</p>
                        <ul className="mb-6 space-y-2">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="text-gray-600">
                                    ✔  {feature}
                                </li>
                            ))}
                        </ul>
                        <PrimaryButton>Choose Plan</PrimaryButton>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default PricingPlans;
