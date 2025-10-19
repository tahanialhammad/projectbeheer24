import DynamicFormField from '@/components/DynamicFormField';
import SiteLayout from '@/layouts/site-layout';
import { useForm } from '@inertiajs/react';

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

    // const { data, setData, post, processing, errors } = useForm({
    //     service_id: service.id,
    //     form_data: {},
    // });
    const { data, setData, post, processing, errors } = useForm<{
        service_id: number;
        form_data: Record<string, string>;
    }>({
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
            <h1 className="mb-6 text-xl font-bold ">Order: {service.name}</h1>

            <form onSubmit={handleSubmit} className="space-y-4 dark:text-neutral-100">
                {service.form_fields.map((field) => (
                    <DynamicFormField
                        key={field.id}
                        field={field}
                        value={data.form_data[field.name] || ''}
                        error={(errors as Record<string, string>)[`form_data.${field.name}`]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit" disabled={processing} className="mt-4 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                    Order
                </button>
            </form>
        </SiteLayout>
    );
}
