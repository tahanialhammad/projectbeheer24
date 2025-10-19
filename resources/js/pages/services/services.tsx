import HeroSection from '@/components/HeroSection';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import SiteLayout from '@/layouts/site-layout';

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
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {services.data.map(({ id, name, description, price, image, discounted_price }) => (
                    <div
                        key={id}
                        className="relative flex flex-col rounded-lg border border-neutral-200 bg-white shadow transition-shadow duration-300 hover:shadow-lg"
                    >
                        <div className="absolute top-4 left-4">
                            <span className={`rounded-full bg-black px-3 py-1 text-white ${discounted_price < price ? '' : 'hidden'}`}>Actie</span>
                        </div>

                        <img
                            src={image ? `/storage/${image}` : '/images/Dashboard.webp'}
                            className="h-48 w-full rounded-t-lg object-cover"
                            alt={name}
                        />

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
                                <SecondaryButton href={route('services.showService', id)}>More info</SecondaryButton>
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
