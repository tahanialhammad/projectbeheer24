import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

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
export default function EditService({ service, form_fields, selected_form_fields }) {
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
        <AppLayout>
            <Head title={`Edit ${service.name}`} />
            <form onSubmit={submit} className="grid grid-cols-1 gap-6 rounded bg-white p-6 shadow md:grid-cols-3">
                <div className="space-y-4 md:col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />

                    <Label htmlFor="description">Description</Label>
                    <Input id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />

                    {/* ✅ Dropdown met checkboxes */}
                    <div className="flex flex-col space-y-2">
                        <Label>Form fields</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded border-2 border-gray-200 px-2 py-1 text-start">
                                Choose form fields ({data.form_fields.length} selected)
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded border-2 border-gray-200 bg-white p-2 shadow">
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

                <div className="space-y-4">
                    <Label htmlFor="price">Price (€)</Label>
                    <Input id="price" type="number" value={data.price} onChange={(e) => setData('price', parseFloat(e.target.value))} />

                    <Label htmlFor="discount">Discount</Label>
                    <Input id="discount" type="number" value={data.discount} onChange={(e) => setData('discount', parseFloat(e.target.value))} />

                    <Label htmlFor="discount_type">Discount Type</Label>
                    <select
                        id="discount_type"
                        value={data.discount_type}
                        onChange={(e) => setData('discount_type', e.target.value)}
                        className="w-full rounded border px-2 py-1"
                    >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                    </select>

                    <Label htmlFor="discount_expires_at">Discount Expires At</Label>
                    <Input
                        id="discount_expires_at"
                        type="date"
                        value={data.discount_expires_at}
                        onChange={(e) => setData('discount_expires_at', e.target.value)}
                    />
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
