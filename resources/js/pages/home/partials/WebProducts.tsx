import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";
import { Link } from "@inertiajs/react";
import { ShoppingBag , HeartPlus } from "lucide-react";

export default function WebProducts({ products }) {
    return (
        <div>
            <div className="flex w-full gap-8 mb-10 mt-20">
                <div
                    className="w-1/4 bg-auto bg-bottom bg-no-repeat text-black flex flex-col items-center justify-centertt rounded-3xl p-4"
                    style={{
                     backgroundImage: "url('/images/webdesign-tahanina-home.webp')",
                        backgroundColor: "pink",
                        backgroundPositionY: "100px",
                    }}
                >
                    <div className="text-center">
                        <h3 className="text-red-600 font-bold text-lg">
                         10% Korting
                        </h3>
                        <h1 className="text-3xl font-bold leading-tight capitalize">
                            Op onze nieuwe  
                        </h1>
                        <h3 className="text-3xl">Diensten</h3>
                    </div>
                </div>

                <div className="w-3/4 -mt-10">
                    <h3 className="text-lg capitalize">
Meest gekozen diensten                    </h3>
                    <h1 className="text-3xl font-black leading-tight capitalize">
                      Ontdek de oplossingen die onze klanten het vaakst vertrouwen
                    </h1>

                    <div className="overflow-x-auto scroll-pl-6 snap-x flex space-x-6 p-4">
                  products list
                    </div>
                </div>
            </div>
        </div>
    );
}
