import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

type Order = {
    id: number;
    status: string;
    service?: {
        name: string;
    };
};

export default function Edit({ order }: { order: Order }) {
    const { data, setData, put, processing, errors } = useForm({
        status: order.status,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('orders.update', order.id));
    }

    return (
        <AppLayout>
            <Head title="Order bewerken" />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Order Id #{order.id}</h2>
                <Link href="/orders" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all orders
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl space-y-6 rounded bg-white dark:bg-neutral-700 p-6 shadow-md">
                <div>
                    <label className="mb-1 block font-medium">Status</label>
                    <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="w-full rounded border-neutral-300 dark:bg-neutral-600">
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                </div>

                <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Save
                </button>
            </form>
        </AppLayout>
    );
}
