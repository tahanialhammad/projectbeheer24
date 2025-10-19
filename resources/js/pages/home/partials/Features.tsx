import { BadgePercent, Headset, Presentation, RefreshCcw } from 'lucide-react';

export default function Features() {
    const features = [
        {
            name: 'Website Management Training',
            description: 'Easily manage your site yourself.',
            icon: <Presentation fontSize="large" />,
        },
        {
            name: 'Online support 24/7',
            description: 'Always fast help online.',
            icon: <Headset fontSize="large" />,
        },
        {
            name: 'Money Back Guarantee',
            description: 'Up to 7 days of certainty.',
            icon: <RefreshCcw fontSize="large" />,
        },
        {
            name: 'Member discount',
            description: 'Discount from €300.',
            icon: <BadgePercent fontSize="large" />,
        },
    ];
    return (
        <div className="my-10 flex w-full flex-row justify-around gap-4">
            {features.map((item, index) => (
                <FeaturesItem key={index} item={item} />
            ))}
        </div>
    );
}

function FeaturesItem({ item }) {
    return (
        <div className="flex">
            <div className="me-4 text-fuchsia-600">{item.icon}</div>
            <div>
                <h4 className="text-2xl font-bold">{item.name}</h4>
                <p>{item.description}</p>
            </div>
        </div>
    );
}
