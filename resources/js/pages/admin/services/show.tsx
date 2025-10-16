import PrimaryButton from '@/components/PrimaryButton';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

type FormField = {
    id: number;
    label: string;
    name: string;
    type: string;
    required: boolean;
    options?: string[] | null;
};

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    discount_type?: 'fixed' | 'percentage';
    image: string;
    discounted_price?: number;
    form_fields: FormField[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show service',
        href: '/services/show',
    },
];

function formatOptions(options: string | null) {
    if (!options) return '—';
    try {
        const arr = JSON.parse(options);
        return Array.isArray(arr) ? arr.join(', ') : String(options);
    } catch {
        return String(options);
    }
}

export default function Show({ service }: { service: Service }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Service: {service.name}</h2>
                <Link href="/services" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all service
                </Link>
            </div>

            <div className="max-w-xl rounded-md bg-white p-6 shadow">
                <img
                    src={service.image ? `/storage/${service.image}` : '/images/Dashboard.webp'}
                    className="h-64 w-full rounded-lg object-cover"
                    alt={service.name}
                />

                <div className="p-6">
                    <h1 className="mb-4 text-3xl font-bold">{service.name}</h1>
                    <p className="mb-4 text-gray-700">{service.description}</p>

                    <p className="text-xl font-semibold text-fuchsia-500">€{service.discounted_price ?? service.price}</p>

                    {service.discounted_price && service.discounted_price < service.price && (
                        <p className="text-sm text-gray-500 line-through">€{service.price}</p>
                    )}

                    {service.form_fields.map((field) => (
                        <div key={field.id}>
                            {field.name}: {field.label}
                            {field.type}
                            {field.options}
                            {field.required}
                        </div>
                    ))}
                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Label
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Type
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Required
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {service.form_fields.map((field) => (
                                    <tr key={field.id}>
                                        <td className="p-2">{field.label}</td>

                                        <td className="p-2">{field.name}</td>

                                        <td className="p-2"> {field.type}</td>
                                        <td className="p-2">
                                            {field.required ? (
                                                <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Ja</span>
                                            ) : (
                                                <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">Nee</span>
                                            )}
                                        </td>
                                        {/* <td className="p-2"> {field.options}</td> */}

                                        {/* <td className="p-2">
  {(() => {
    if (!field.options) return <span className="italic text-gray-400">—</span>;
    try {
      const opts = JSON.parse(field.options);
      return Array.isArray(opts) ? opts.join(', ') : String(field.options);
    } catch {
      return String(field.options);
    }
  })()}
</td> */}

                                        <td className="p-2 text-sm text-gray-700">{formatOptions(field.options)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <PrimaryButton href={route('orders.create', { service_id: service.id })}>Bestel nu</PrimaryButton>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
