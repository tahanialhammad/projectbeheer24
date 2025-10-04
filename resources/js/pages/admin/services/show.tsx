import SiteLayout from '@/layouts/site-layout';
import PrimaryButton from '@/components/PrimaryButton';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show service',
        href: '/services/show',
    },
];

export default function Show({ service }: { service: Service }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>

             <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Role: {service.name}</h2>
                <Link href="/roles" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all service
                </Link>
            </div>

                        <div className="max-w-xl rounded-md bg-white p-6 shadow">

        <img
          src={service.image ? `/storage/${service.image}` : '/images/Dashboard.webp'}
          className="w-full h-64 object-cover rounded-lg"
          alt={service.name}
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          <p className="text-gray-700 mb-4">{service.description}</p>

          <p className="text-xl font-semibold text-fuchsia-500">
            €{service.discounted_price ?? service.price}
          </p>

          {service.discounted_price && service.discounted_price < service.price && (
            <p className="text-sm text-gray-500 line-through">€{service.price}</p>
          )}

          <div className="mt-6">
            <PrimaryButton href={route('orders.create', { service_id: service.id })}>
              Bestel nu
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
