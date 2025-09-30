import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Winner from "./Winner";
import AnimatedText from "@/Components/AnimatedText";
import Winner2 from "./Winner2";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function HeroSection() {
    return (
        <section>
            {/* hero section*/}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 900 }}
                        transition={{
                            duration: 7.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></motion.div>
                </div>

                <div className="flex w-full gap-8">
                    <div className="w-2/5 bg-lime-200 rounded-3xl p-4 relative">
                        <img
                            src="https://demo.phlox.pro/shop-baby/wp-content/uploads/sites/319/2021/06/Cute-Baby-1194x813-1.png"
                            alt=""
                            className="rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-lime-200 via-transparent mb-4"></div>
                        <div className="absolute top-1/2 text-center w-full">
                            <h4 className="text-xl text-red-500 uppercase font-bold">
                                HUGE SALE
                            </h4>
                            <h1 className="text-3xl capitalize font-black">
                                summer surprises
                            </h1>
                            <h3 className="text-2xl  capitalize">
                                All Kids Clothing
                            </h3>
                            <PrimaryButton className="mt-4">Shop Now</PrimaryButton>
                        </div>
                    </div>

                    <div className="w-3/5 flex flex-col gap-8">
                        <div className="rounded-3xl relative">
                            <img
                                className="rounded-3xl"
                                src="https://demo.phlox.pro/shop-baby/wp-content/uploads/sites/319/2021/06/Mask-Group-10.jpg"
                                alt=""
                            />
                            <div className="absolute top-1/3 right-4 m-4">
                                <h4 className="text-xl text-indigo-500 uppercase font-bold">
                                    {" "}
                                    50% off{" "}
                                </h4>
                                <h1 className="text-3xl capitalize font-black">
                                    happy babies
                                </h1>
                                <h3 className="text-2xl  capitalize">
                                    with cute walk
                                </h3>
                                <PrimaryButton className="mt-4">Shop Now</PrimaryButton>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                className="rounded-3xl"
                                src="https://demo.phlox.pro/shop-baby/wp-content/uploads/sites/319/2021/06/Mask_Group_9.png"
                                alt=""
                            />
                            <div className="absolute top-1/3 left-4 m-4">
                                <h4 className="text-xl text-indigo-500 uppercase font-bold">
                                    HUGE SALE
                                </h4>
                                <h1 className="text-3xl capitalize font-black">
                                    trend style
                                </h1>
                                <h3 className="text-2xl  capitalize">
                                    fashion on fleek
                                </h3>
                                <SecondaryButton className="mt-4">Shop Now</SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
