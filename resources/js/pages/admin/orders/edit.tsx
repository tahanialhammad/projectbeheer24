import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, RefreshCw, Save, ShoppingBag } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Orders', href: '/orders' },
    { title: 'Edit Status', href: '#' },
];

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Order #${order.id}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                            Update Order Status
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manage fulfillment progress for{' '}
                            <span className="font-semibold text-foreground">ORD-{order.id}</span>
                        </p>
                    </div>

                    <Link
                        href={route('orders.index')}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to orders
                    </Link>
                </div>

                <div className="max-w-2xl">
                    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                        <div className="mb-8 flex items-center gap-4 rounded-xl bg-muted/30 p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <ShoppingBag className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                                    {order.service?.name || 'N/A Service'}
                                </h3>
                                <p className="text-xs text-muted-foreground">Reference: ORD-{order.id}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="status">Fulfillment Status</Label>
                                <div className="relative">
                                    <RefreshCw className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-border bg-muted/30 py-2 pl-10 pr-4 text-sm focus:ring-primary/20"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <InputError message={errors.status} />
                            </div>

                            <div className="flex items-center gap-4 border-t border-border pt-4">
                                <Button type="submit" disabled={processing} className="gap-2 shadow-lg shadow-primary/10">
                                    <Save className="h-4 w-4" />
                                    Update Order
                                </Button>
                                <Link href={route('orders.index')}>
                                    <Button variant="ghost">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
