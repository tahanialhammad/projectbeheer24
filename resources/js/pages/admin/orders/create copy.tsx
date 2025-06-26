import SiteLayout from '@/layouts/site-layout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

type FormField = {
    id: number;
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    required: boolean;
    options?: string | null;
};

type Props = {
    service: {
        id: number;
        name: string;
        form_fields: FormField[];
    };
};

export default function CreateOrder({ service }: Props) {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const { data, setData, post, processing, errors } = useForm({
        service_id: service.id,
        form_data: {},
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData('form_data', {
            ...data.form_data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <SiteLayout title="Bestelling plaatsen">
            <h1 className="mb-6 text-2xl font-bold">Bestel: {service.name}</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {service.form_fields.map((field) => (
                    <div key={field.id}>
                        <label className="block font-medium text-gray-700">{field.label}</label>

                        {field.type === 'text' && (
                            <input
                                type="text"
                                name={field.name}
                                required={field.required}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                        )}

                        {field.type === 'textarea' && (
                            <textarea
                                name={field.name}
                                required={field.required}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                        )}

                        {field.type === 'select' && field.options && (
                            <select
                                name={field.name}
                                required={field.required}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            >
                                <option value="">-- Selecteer --</option>
                                {JSON.parse(field.options).map((option: string, idx: number) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}

                <button type="submit" disabled={processing} className="mt-4 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                    Bestellen
                </button>
            </form>
        </SiteLayout>
    );
}
