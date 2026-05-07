import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Clock, Layers, ShoppingBag } from 'lucide-react';

type Order = {
    id: number;
    user_id: number;
    service_id: number;
    status: string;
    service?: {
        name: string;
    };
    created_at: string;
    total_progress: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Orders',
        href: '/my-orders',
    },
];

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Index({ orders }: { orders: Order[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 lg:p-10">
                <div className="flex flex-col gap-2">
                    <h2 className="font-display text-4xl font-black tracking-tight text-foreground">My Orders</h2>
                    <p className="text-lg text-muted-foreground">
                        Track the progress of your service requests and view detailed summaries.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={route('orders.show', order.id)}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 active:scale-95"
                        >
                            {/* Status Indicator */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusStyles[order.status.toLowerCase()] || 'bg-muted text-muted-foreground'}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                                    <Layers className="h-3 w-3" />
                                    {order.service?.name || 'N/A Service'}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-foreground">Order ORD-{order.id}</h3>
                            </div>

                            {/* Progress Bar Summary */}
                            <div className="mt-4 space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <span>Progress</span>
                                    <span className="text-primary">{order.total_progress}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                        style={{ width: `${order.total_progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    {new Date(order.created_at).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                                <div className="flex translate-x-0 items-center gap-1 text-xs font-bold text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-2">
                                    Details
                                    <ChevronRight className="h-3 w-3" />
                                </div>
                            </div>

                            {/* Decorative background circle */}
                            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border p-20 text-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <ShoppingBag className="h-10 w-10" />
                        </div>
                        <h4 className="text-2xl font-bold text-foreground">No orders yet</h4>
                        <p className="mt-2 max-w-sm text-muted-foreground">
                            You haven't placed any orders yet. Explore our catalog to find the perfect service for your needs.
                        </p>
                        <Link href={route('services')} className="mt-8">
                            <button className="rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                Browse Services
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
