import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormField = {
    id: number;
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    required: boolean;
    options?: string | null;
};

interface ServicesData {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: 0;
    discount_type: 'fixed';
    discount_expires_at: '';
    form_fields: FormField[];
}

// Verwacht een 'service' prop via de pagina
export default function EditService({
    service,
    form_fields,
    selected_form_fields,
}: {
    service: ServicesData;
    form_fields: FormField[];
    selected_form_fields: number[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        discount: service.discount ?? 0,
        discount_type: service.discount_type ?? 'fixed',
        discount_expires_at: service.discount_expires_at ?? '',
        form_fields: selected_form_fields || [],
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

    function handleCheckBoxChanges(fieldId, checked) {
        if (checked) {
            setData('form_fields', [...data.form_fields, fieldId]);
        } else {
            setData(
                'form_fields',
                data.form_fields.filter((id) => id !== fieldId),
            );
        }
    }

    const submit = (e) => {
        e.preventDefault();
        put(route('services.update', service.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${service.name}`} />
            <div className="mb-6 flex items-center justify-between">
                <Heading title="Edit service" description="" />

                <Link href="/services" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all services
                </Link>
            </div>
            <form onSubmit={submit} className="">
                <div className="grid grid-cols-1 gap-6 rounded bg-neutral-100 dark:bg-neutral-800 p-6 shadow-md md:grid-cols-3">
                    {/* Linker kolom: 2/3 van de breedte */}
                    <div className="space-y-4 border-b border-neutral-300 p-2 md:col-span-2 md:border-r-2 md:border-b-0 ">
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

                        {/* ✅ Dropdown met checkboxes */}
                        <div className="flex flex-col space-y-2">
                            <Label>Form fields</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="rounded border-2 px-2 py-1 text-start">
                                    Choose form fields ({data.form_fields.length} selected)
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="rounded border-2 border-neutral-50 bg-neutral-100 dark:bg-neutral-700 p-2 shadow">
                                    {form_fields.map((field) => (
                                        <label key={field.id} className="flex gap-2 py-1">
                                            <input
                                                type="checkbox"
                                                checked={data.form_fields.includes(field.id)}
                                                onChange={(e) => handleCheckBoxChanges(field.id, e.target.checked)}
                                            />
                                            <span>{field.label}</span>
                                        </label>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {/* Rechter kolom: 1/3 van de breedte */}
                    <div className="space-y-4">
                        <div className="space-y-4">
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
                        </div>
                    </div>
                </div>

                <div className="flex justify-end md:col-span-3">
                    <button type="submit" disabled={processing} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                        Update
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
