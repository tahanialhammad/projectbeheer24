import PrimaryButton from '@/components/PrimaryButton';
import SiteLayout from '@/layouts/site-layout';

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    discount_type?: 'fixed' | 'percentage';
    image: string;
    discounted_price?: number;
};

export default function Show({ service }: { service: Service }) {
    return (
        <SiteLayout title={service.name}>
            <div className="mx-auto max-w-3xl rounded-lg shadow">
                <img
                    src={service.image ? `/storage/${service.image}` : '/images/Dashboard.webp'}
                    className="h-64 w-full rounded-lg object-cover"
                    alt={service.name}
                />

                <div className="p-6">
                    <h1 className="mb-4 text-3xl font-bold">{service.name}</h1>
                    <p className="mb-4 text-neutral-700">{service.description}</p>

                    <p className="text-xl font-semibold text-fuchsia-500">€{service.discounted_price ?? service.price}</p>

                    {service.discounted_price && service.discounted_price < service.price && (
                        <p className="text-sm text-neutral-500 line-through">€{service.price}</p>
                    )}

                    <div className="mt-6">
                        <PrimaryButton href={route('orders.create', { service_id: service.id })}>Order now </PrimaryButton>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
