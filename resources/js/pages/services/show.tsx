import SiteLayout from '@/layouts/site-layout';
import PrimaryButton from '@/components/PrimaryButton';

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
      <div className="max-w-3xl mx-auto shadow rounded-lg ">
        <img
          src={service.image ? `/storage/${service.image}` : '/images/Dashboard.webp'}
          className="w-full h-64 object-cover rounded-lg"
          alt={service.name}
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          <p className="text-neutral-700 mb-4">{service.description}</p>

          <p className="text-xl font-semibold text-fuchsia-500">
            €{service.discounted_price ?? service.price}
          </p>

          {service.discounted_price && service.discounted_price < service.price && (
            <p className="text-sm text-neutral-500 line-through">€{service.price}</p>
          )}

          <div className="mt-6">
            <PrimaryButton href={route('orders.create', { service_id: service.id })}>
              Bestel nu
            </PrimaryButton>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
