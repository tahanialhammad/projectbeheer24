import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

interface ServicesData {
    id: number;
    name: string;
    description: string;
    price: number;
}

// 👇 Verwacht een 'service' prop via de pagina
export default function EditService({ service }: { service: ServicesData }) {
    const { data, setData, put, processing, errors } = useForm<ServicesData>({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Services',
            href: '/services',
        },
        {
            title: `Edit: ${service.name}`,
            href: `/services/${service.id}/edit`,
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('services.update', service.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${service.name}`} />
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Edit Service</h2>
                <Link
                    href="/services"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                >
                    Back to all services
                </Link>
            </div>

            <form className="max-w-xl space-y-6 rounded bg-white p-6 shadow-md" onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Service name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={processing}
                        placeholder="Service description"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="price">Price (€)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', parseFloat(e.target.value))}
                        disabled={processing}
                        placeholder="Service price"
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
                >
                    Update
                </button>
            </form>
        </AppLayout>
    );
}
