import HeroSection from '@/components/HeroSection';
import PrimaryButton from '@/components/PrimaryButton';
import SiteLayout from '@/layouts/site-layout';

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export default function Services({ services }: { services: Service[] }) {
    return (
        <SiteLayout title="diensten">
            <HeroSection title="Onze diensten" />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {services.map(({ id, name, description, price }) => (
                    <div key={id} className="rounded-lg border border-gray-200 bg-white p-5 shadow transition-shadow duration-300 hover:shadow-lg">
                        <h2 className="mb-2 text-xl font-bold text-gray-900">{name}</h2>
                        <p className="mb-4 line-clamp-3 text-gray-600">{description}</p>
                        <p className="text-lg font-semibold text-fuchsia-500">€{price}</p>
                        {/* <Link
                            href={route('orders.create', { service_id: id })}
                            className="mt-3 inline-block rounded bg-fuchsia-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            Bestel
                        </Link> */}
                        <PrimaryButton href={route('orders.create', { service_id: id })}>Bestel</PrimaryButton>
                    </div>
                ))}
            </div>
        </SiteLayout>
    );
}
