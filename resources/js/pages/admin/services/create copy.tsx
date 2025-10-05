import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create services',
        href: '/services/create',
    },
];

interface ServicesData {
    name: string;
    description: string;
    price: number;
}

export default function CreateService() {
    const { data, setData, post, processing, errors, reset } = useForm<ServicesData>({
        name: '',
        description: '',
        price: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('services.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create service" />
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Create services</h2>
                <Link href="/services" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all services
                </Link>
            </div>

            <form className="max-w-xl space-y-6 rounded bg-white p-6 shadow-md" onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        tabIndex={1}
                        autoFocus
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Role name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="description">description</Label>
                    <Input
                        id="description"
                        type="text"
                        tabIndex={1}
                        autoFocus
                        autoComplete="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={processing}
                        placeholder="Service description"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="price">price</Label>
                    <Input
                        id="price"
                        type="number"
                        tabIndex={1}
                        autoFocus
                        autoComplete="price"
                        value={data.price}
                        onChange={(e) => setData('price', parseFloat(e.target.value))}
                        disabled={processing}
                        placeholder="Service price"
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <button
                    type="submit"
                    tabIndex={5}
                    disabled={processing}
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
                >
                    Create
                </button>
            </form>
        </AppLayout>
    );
}
