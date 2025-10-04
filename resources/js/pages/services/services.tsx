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
        <SiteLayout title="diensten">
            <HeroSection title="Onze diensten" />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {services.data.map(({ id, name, description, price, image, discounted_price }) => (
                    <div
                        key={id}
                        className="relative rounded-lg border border-gray-200 bg-white shadow transition-shadow duration-300 hover:shadow-lg"
                    >
                        <div className="absolute top-4 left-4">
                            <span className={`rounded-full bg-black px-3 py-1 text-white ${discounted_price < price ? '' : 'hidden'}`}>Actie</span>
                        </div>
                        <img
                            src={image ? `/storage/${image}` : '/images/Dashboard.webp'}
                            className="h-48 w-full rounded-lg object-cover"
                            alt={name}
                        />
                        <div className="p-4">
                            <h2 className="mb-2 text-xl font-bold text-gray-900">{name}</h2>
                            <p className="mb-4 line-clamp-3 text-gray-600">{description}</p>
                            <p className="text-lg font-semibold text-fuchsia-500">€{price}</p>

                            <div className="flex justify-between">
                                <PrimaryButton href={route('orders.create', { service_id: id })}>Bestel</PrimaryButton>
                                <SecondaryButton href={route('services.showService', id)}>Meer info</SecondaryButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagina navigatie */}
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
        </SiteLayout>
    );
}
