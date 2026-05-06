import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Clock, FileText, ShoppingBag } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
    created_at: string;
    field_values: OrderFieldValue[];
};

type Props = {
    order: Order;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Orders', href: '/my-orders' },
    { title: 'Order Details', href: '#' }
];

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function ShowOrder({ order }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order Details: ORD-${order.id}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 lg:p-10">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-1">
                            <ShoppingBag className="h-3 w-3" />
                            Order Tracking
                        </div>
                        <h2 className="font-display text-4xl font-black tracking-tight text-foreground">
                            ORD-{order.id}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Viewing details and submission for <span className="font-semibold text-foreground">{order.service.name}</span>
                        </p>
                    </div>

                    <Link
                        href={route('orders.user')}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to my orders
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Status & Summary Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm">
                            <div className="pointer-events-none absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
                            
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <ShoppingBag className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{order.service.name}</h3>
                                <div className={`mt-4 inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-widest ${statusStyles[order.status.toLowerCase()] || 'bg-muted text-muted-foreground'}`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        Placed on
                                    </div>
                                    <span className="font-bold text-foreground">
                                        {new Date(order.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Support</h4>
                            <p className="text-sm text-muted-foreground mb-4">Need help with this order? Contact our support team.</p>
                            <Button variant="outline" className="w-full rounded-2xl h-12 border-dashed">
                                Open Support Ticket
                            </Button>
                        </div>
                    </div>

                    {/* Submission Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                            <div className="flex items-center gap-2 border-b border-border bg-muted/10 p-6">
                                <FileText className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-bold text-foreground">Submission Details</h3>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {order.field_values.length > 0 ? (
                                        order.field_values.map((fieldValue) => (
                                            <div
                                                key={fieldValue.id}
                                                className="space-y-2 rounded-2xl border border-border/50 bg-muted/20 p-5 transition-colors hover:bg-muted/30"
                                            >
                                                <Label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                                                    {fieldValue.form_field.label}
                                                </Label>
                                                <p className="break-words text-sm font-semibold text-foreground">
                                                    {fieldValue.value || (
                                                        <span className="italic text-muted-foreground/40">Not provided</span>
                                                    )}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-16 text-center">
                                            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-20" />
                                            <p className="text-sm italic text-muted-foreground">
                                                No additional information was required for this order.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
