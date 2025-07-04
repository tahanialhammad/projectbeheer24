import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

type Order = {
    id: number;
    user_id: number;
    service_id: number;
    status: string;
    service?: {
        name: string;
    };
    user?: {
        name: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

export default function Index({ orders }: { orders: Order[] }) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(route('orders.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-800">All Orders</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-300 shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b p-3 text-left">ID</th>
                                <th className="border-b p-3 text-left">User</th>
                                <th className="border-b p-3 text-left">Service</th>
                                <th className="border-b p-3 text-left">Status</th>
                                <th className="border-b p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="transition even:bg-gray-50 hover:bg-gray-100">
                                    <td className="border-b p-3">{order.id}</td>
                                    <td className="border-b p-3">{order.user?.name ?? order.user_id}</td>
                                    <td className="border-b p-3">{order.service?.name ?? order.service_id}</td>
                                    <td className="border-b p-3 capitalize">{order.status}</td>
                                    <td className="flex space-x-2 border-b p-3">
                                        <Link
                                            href={route('orders.show', order.id)}
                                            className="rounded bg-gray-600 px-3 py-1 text-white transition hover:bg-gray-700"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('orders.edit', order.id)}
                                            className="rounded bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
