import React from "react";
import CountdownTimer from "./CountdownTimer";
import PrimaryButton from "@/components/PrimaryButton";

export default function Categories({ initialTime }) {
    const categories = [
        {
            name: "Website bouwen",
            image: "https://play.divi.express/wp-content/uploads/2023/09/it-services-4-asx-1.png",
        },
        {
            name: "Software Ontwikkeling",
            image: "https://play.divi.express/wp-content/uploads/2023/09/it-services-4-asx-1.png",
        },
        {
            name: "Vindbaar op Google (SEO)",
            image: "https://play.divi.express/wp-content/uploads/2023/09/it-services-4-asx-1.png",
        },
        {
            name: "Merkidentiteit",
            image: "https://play.divi.express/wp-content/uploads/2023/09/it-services-4-asx-1.png",
        },
    ];

    return (
        <div className="flex flex-row my-6 gap-4">
            <div className="w-1/2 bg-fuchsia-200 rounded-3xl p-4 capitalize text-center relative">
                <h3 className="text-lg font-bold tracking-tight text-red-500 uppercase mt-4">
                    25% korting 
                </h3>
                <h1 className="text-3xl font-bold text-gray-900 ">
                    op de aanbieding van de dag 
                </h1>
                <h3 className="text-2xl font-bold text-gray-900 ">
                    Black Friday
                </h3>
                <CountdownTimer initialTime={initialTime} />
                <PrimaryButton className="my-4">Bestel Nu</PrimaryButton>
                <img
                    className="absolute left-0 top-2/5"
                    src=""
                    alt=""
                />
                <img
                    className=""
                    src=".\images\Freelance portal app.png"
                    alt=""
                />
            </div>
            <div className="w-1/2">
                <div className="grid grid-cols-2 gap-4 border-2 p-4 rounded-3xl ">
                    {categories.map((item, index) => (
                        <CategoryItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryItem({ item }) {
    return (
        <div className="flex flex-col items-center">
            <img
                src={item.image}
                style={{ width: "124px", hight: "220px" }}
                className="max-w-full m-auto"
                alt=""
            />
            <div>
                <h3 className="text-2xl font-bold capitalize text-center">{item.name}</h3>
            </div>
        </div>
    );
}
