import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type OrderFieldValue = {
    id: number;
    value: string;
    form_field: {
        label: string;
    };
};

type Order = {
    id: number;
    status: string;
    service: {
        name: string;
    };
    field_values: OrderFieldValue[];
};

type Props = {
    order: Order;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show Order',
        href: '/orders/show',
    },
];

export default function ShowOrder({ order }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Bestelling #${order.id}`} />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-800">Bewerk Order #{order.id}</h2>
                <Link href="/orders" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all orders
                </Link>
            </div>

            <div className="max-w-xl space-y-6 rounded bg-white p-6 shadow-md">
                <h1 className="text-2xl font-bold">Bestelling voor: {order.service.name}</h1>
                <p>
                    <strong>Status:</strong> {order.status}
                </p>

                <h2 className="mt-4 text-xl font-semibold">Ingevulde gegevens</h2>
                <div className="space-y-2">


             {/* {order.field_values.map((fieldValue) => (
                        <div key={fieldValue.id}>
                        <p><strong>{fieldValue.form_field.label}:</strong> {fieldValue.value}</p>
                        </div>
                    ))} */}

                    {/* fix type script of deze of  inline destructuring met type  */}

                    {order.field_values.map((fieldValue: OrderFieldValue) => (
                    <div key={fieldValue.id}>
                        <p><strong>{fieldValue.form_field.label}:</strong> {fieldValue.value}</p>
                    </div>
                    ))}


                    {/* {order.field_values.map(({ id, value, form_field }: OrderFieldValue) => (
                        <div key={id}>
                            <p>
                                <strong>{form_field.label}:</strong> {value}
                            </p>
                        </div>
                    ))} */}
                </div>
            </div>
        </AppLayout>
    );
}
