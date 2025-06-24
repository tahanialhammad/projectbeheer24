import SiteLayout from '@/layouts/site-layout';
import { Link } from '@inertiajs/react';

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export default function Services({ services }: { services: Service[] }) {
    return (
        <SiteLayout title="Services">
            <h1 className="mb-6 text-2xl font-semibold text-gray-800">Our Services</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {services.map(({ id, name, description, price }) => (
                    <div key={id} className="rounded-lg border border-gray-200 bg-white p-5 shadow transition-shadow duration-300 hover:shadow-lg">
                        <h2 className="mb-2 text-xl font-bold text-gray-900">{name}</h2>
                        <p className="mb-4 line-clamp-3 text-gray-600">{description}</p>
                        <p className="text-lg font-semibold text-green-600">€{price}</p>
                        <Link
                            href={route('orders.create', { service_id: id })}
                            className="mt-3 inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            Bestel
                        </Link>
                    </div>
                ))}
            </div>
        </SiteLayout>
    );
}
