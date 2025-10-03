import AnimatedWrapper from '@/components/AnimatedWrapper';
import SecondaryButton from '@/components/SecondaryButton';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function WebProducts({ services }) {
    return (
        <div>
            <div className="mt-20 mb-10 flex w-full gap-8">
                {/* Promo blok */}
                <AnimatedWrapper
                    className="flex w-1/4 flex-col items-center justify-center rounded-3xl bg-fuchsia-100 bg-auto bg-bottom bg-no-repeat p-4 text-black"
                    style={{
                        backgroundImage: "url('/images/3dimage.png')",
                        backgroundPositionY: '100px',
                    }}
                >
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-red-600">10% Korting</h3>
                        <h1 className="text-3xl leading-tight font-bold capitalize">Op onze nieuwe</h1>
                        <h3 className="text-3xl">Diensten</h3>
                    </div>
                </AnimatedWrapper>

                {/* Meest gekozen diensten */}
                <div className="-mt-10 w-3/4">
                    <h3 className="text-lg capitalize">Meest gekozen diensten</h3>

                    <div className="flex snap-x scroll-pl-6 space-x-6 overflow-x-auto p-4">
                        {services.map((service) => (
                            <AnimatedWrapper
                                direction="left"
                                duration={Math.min(2, 1.2 + service.id * 0.1)}
                                key={service.id}
                                className="relative w-60 flex-shrink-0 snap-start rounded-3xl border-2 bg-white p-4"
                            >
                                <div className="!absolute top-4 left-4">
                                    <span
                                        className={`rounded-full bg-black px-3 py-1 text-white ${
                                            service.discounted_price < service.price ? '' : 'hidden'
                                        }`}
                                    >
                                        Actie
                                    </span>
                                </div>
                                <div className="mt-4 flex h-full flex-col">
                                    <div className="mb-3 flex flex-col items-center justify-between">
                                        <img
                                            src={service.image ? `/storage/${service.image}` : '/images/Dashboard.webp'}
                                            className="rounded-lg"
                                            alt={service.name}
                                        />

                                        <div className="my-2 flex w-full justify-between align-middle">
                                            <div>
                                                <Link href={route('services.show', service)} className="text-blue-gray-900 block text-xl font-bold">
                                                    {service.name}
                                                </Link>
                                                {service.discounted_price < service.price ? (
                                                    <p>
                                                        <span>€{service.discounted_price}</span>
                                                        <span className="ms-1 text-gray-400 line-through">€{service.price}</span>
                                                    </p>
                                                ) : (
                                                    <p>€{service.price}</p>
                                                )}
                                            </div>
                                            <div>
                                                <SecondaryButton>
                                                    <Plus />
                                                </SecondaryButton>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ⭐ Rating altijd onderaan */}
                                    <div className="mx-2 mt-auto">
                                        <p className="text-blue-gray-900 flex items-center gap-1.5 text-base leading-relaxed font-normal antialiased">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="-mt-0.5 h-5 w-5 text-fuchsia-800"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            5.0
                                        </p>
                                    </div>
                                </div>
                            </AnimatedWrapper>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
