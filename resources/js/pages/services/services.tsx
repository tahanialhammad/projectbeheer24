import HeroSection from '@/components/HeroSection';
import PrimaryButton from '@/components/PrimaryButton';
import SiteLayout from '@/layouts/site-layout';
import { Link } from '@inertiajs/react';

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    discount_type?: 'fixed' | 'percentage';
    image: string;
};

type ServicesProps = {
    services: {
        data: Service[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
};

export default function Services({ services }: ServicesProps) {
    return (
        <SiteLayout title="services">
            <HeroSection title="Our services" />
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-neutral-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {services.data.map(({ id, name, description, price, image, discounted_price }) => (
                    <div
                        key={id}
                        className="relative flex flex-col rounded-lg border border-neutral-200 bg-white shadow transition-shadow duration-300 hover:shadow-lg"
                    >
                        <div className="absolute top-4 left-4">
                            <span className={`rounded-full bg-black px-3 py-1 text-white ${discounted_price < price ? '' : 'hidden'}`}>Actie</span>
                        </div>

                        <img src={image ? `/storage/${image}` : '/images/Dashboard.webp'} className="h-64 w-100 rounded-lg object-cover" alt={name} />

                        <div className="flex flex-1 flex-col p-4">
                            <div className="flex-1">
                                <h2 className="mb-2 text-xl font-bold text-neutral-900">{name}</h2>
                                <p className="mb-4 line-clamp-2 text-neutral-600">{description}</p>

                                {discounted_price < price ? (
                                    <p>
                                        <span className="text-lg font-semibold text-fuchsia-500">€{discounted_price}</span>
                                        <span className="ms-1 text-neutral-400 line-through">€{price}</span>
                                    </p>
                                ) : (
                                    <p className="text-lg font-semibold text-fuchsia-500">€{price}</p>
                                )}
                            </div>

                            <div className="mt-4 flex justify-between">
                                <PrimaryButton href={route('orders.create', { service_id: id })}>Order now</PrimaryButton>
                                <Link href={route('services.showService', id)} className="mt-auto text-sm text-blue-600 underline">
                                    More info →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagina navigatie */}
            {services.total > services.per_page && (
                <div className="mt-6 flex justify-center space-x-2">
                    {services.links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url || '#'}
                            className={`rounded border px-3 py-1 ${link.active ? 'bg-fuchsia-500 text-white' : 'bg-white text-fuchsia-500'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </SiteLayout>
    );
}
