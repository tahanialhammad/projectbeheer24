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
    image: File | null;
    discount: number;
    discount_type: 'fixed' | 'percentage';
    discount_expires_at: string;
}

export default function CreateService() {
    const { data, setData, post, processing, errors, reset } = useForm<ServicesData>({
        name: '',
        description: '',
        price: 0,
        image: null,
        discount: 0,
        discount_type: 'fixed',
        discount_expires_at: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('services.store'), {
            onSuccess: () => reset(),
            forceFormData: true, // belangrijk om file upload via multipart/form-data te sturen
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
                {/* Name */}
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

                {/* Description */}
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

                {/* Price */}
                <div>
                    <Label htmlFor="price">Price</Label>
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

                {/* Image Upload */}
                <div>
                    <Label htmlFor="image">Service Image</Label>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                        disabled={processing}
                    />
                    <InputError message={errors.image} className="mt-2" />
                </div>

                {/* Discount */}
                <div>
                    <Label htmlFor="discount">Discount</Label>
                    <Input
                        id="discount"
                        type="number"
                        value={data.discount}
                        onChange={(e) => setData('discount', parseFloat(e.target.value))}
                        disabled={processing}
                        placeholder="Discount amount"
                    />
                    <InputError message={errors.discount} className="mt-2" />
                </div>

                {/* Discount Type */}
                <div>
                    <Label htmlFor="discount_type">Discount Type</Label>
                    <select
                        id="discount_type"
                        value={data.discount_type}
                        onChange={(e) => setData('discount_type', e.target.value as 'fixed' | 'percentage')}
                        disabled={processing}
                        className="w-full rounded border px-2 py-1"
                    >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                    </select>
                    <InputError message={errors.discount_type} className="mt-2" />
                </div>

                {/* Discount Expiry */}
                <div>
                    <Label htmlFor="discount_expires_at">Discount Expires At</Label>
                    <Input
                        id="discount_expires_at"
                        type="date"
                        value={data.discount_expires_at}
                        onChange={(e) => setData('discount_expires_at', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.discount_expires_at} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
                >
                    Create
                </button>
            </form>
        </AppLayout>
    );
}
