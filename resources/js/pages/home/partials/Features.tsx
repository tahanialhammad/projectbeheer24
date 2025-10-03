import React from "react";
import { BadgePercent, Headset, Presentation, RefreshCcw } from "lucide-react";


export default function Features() {
    const features = [
        {
            name: "Website Beheer Training",
            description: "Zelf eenvoudig je site beheren.",
            icon: <Presentation fontSize="large"/>,
        },
        {
            name: "Online support 24/7",
            description: "Altijd snelle hulp online.",
            icon: <Headset fontSize="large"/>,
        },
        {
            name: "Geld-Terug-Garantie",
            description: "Tot 7 dagen zekerheid.",
            icon: <RefreshCcw fontSize="large"/>,
        },
        {
            name: "Ledenkorting",
            description: "Korting vanaf €400.",
            icon: <BadgePercent fontSize="large"/>,
        },
    ];
    return (
        <div className="flex flex-row gap-4 my-10  justify-around w-full">
            {features.map((item, index) => (
                <FeaturesItem key={index} item={item} />
            ))}
        </div>
    );
}

function FeaturesItem({ item }) {
    return (
        <div className="flex">
            <div className="text-fuchsia-600 me-4">{item.icon}</div>
            <div>
                <h4 className="text-2xl font-bold">{item.name}</h4>
                <p>{item.description}</p>
            </div>
        </div>
    );
}
