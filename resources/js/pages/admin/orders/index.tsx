import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Layers, ShoppingBag, Trash2, User } from 'lucide-react';

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
        email?: string;
    };
    created_at: string;
    total_progress: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Index({ orders }: { orders: Order[] }) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(route('orders.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Orders</h2>
                        <p className="text-sm text-muted-foreground">Monitor and manage all customer service requests.</p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="border-b border-border bg-muted/30">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Order Ref
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Service
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Progress
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {orders.map((order) => (
                                    <tr key={order.id} className="group transition-colors hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <ShoppingBag className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground">
                                                        ORD-{order.id}
                                                    </span>
                                                    <span className="text-[10px] font-medium text-muted-foreground">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                                                    <User className="h-3 w-3 text-muted-foreground" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-foreground">
                                                        {order.user?.name || 'Unknown User'}
                                                    </span>
                                                    {order.user?.email && (
                                                        <span className="text-[10px] text-muted-foreground">
                                                            {order.user.email}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span className="text-sm text-foreground">
                                                    {order.service?.name || 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[order.status.toLowerCase()] || 'bg-muted text-muted-foreground'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex w-24 flex-col gap-1">
                                                <div className="flex items-center justify-between text-[10px] font-bold tabular-nums">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="text-primary">{order.total_progress}%</span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${order.total_progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                                                <Link
                                                    href={route('orders.show', order.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={route('orders.edit', order.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-500"
                                                    title="Edit Order"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(order.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                                                    title="Delete Order"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {orders.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <ShoppingBag className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-foreground">No orders placed</h4>
                            <p className="max-w-xs text-sm text-muted-foreground">
                                When customers start requesting services, their orders will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
