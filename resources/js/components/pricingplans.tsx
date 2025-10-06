import PrimaryButton from "./PrimaryButton";

function PricingPlans() {
  const plans = [
    {
      name: "Basic",
      price: "$10/mo",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Standard",
      price: "$20/mo",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      name: "Premium",
      price: "$30/mo",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:bg-fuchsia-100"
        >
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          <p className="text-3xl font-semibold mb-4">{plan.price}</p>
          <ul className="mb-6 space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="text-gray-600">{feature}</li>
            ))}
          </ul>
          <PrimaryButton>
            Choose Plan
          </PrimaryButton>
        </div>
      ))}
    </div>
  );
}

export default PricingPlans;
