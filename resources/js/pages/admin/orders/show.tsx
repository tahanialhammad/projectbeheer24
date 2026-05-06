import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Clock, Edit, FileText, ShoppingBag, User } from 'lucide-react';

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
    user?: {
        name: string;
        email?: string;
    };
    created_at: string;
    field_values: OrderFieldValue[];
};

type Props = {
    order: Order;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Orders', href: '/orders' },
    { title: 'Details', href: '#' },
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

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                            Order Overview
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Comprehensive details and submission data for{' '}
                            <span className="font-semibold text-foreground">ORD-{order.id}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={route('orders.edit', order.id)}>
                            <Button variant="outline" className="gap-2">
                                <Edit className="h-4 w-4" />
                                Update Status
                            </Button>
                        </Link>
                        <Link
                            href={route('orders.index')}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to orders
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Primary Order Info */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                            <div className="pointer-events-none absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <ShoppingBag className="h-10 w-10" />
                            </div>

                            <h3 className="text-xl font-bold text-foreground">ORD-{order.id}</h3>
                            <p className="mb-6 text-sm text-muted-foreground italic">{order.service.name}</p>

                            <div className="space-y-2 text-left">
                                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                    <span className="text-muted-foreground">Current Status</span>
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[order.status.toLowerCase()] || 'bg-muted text-muted-foreground'}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-muted-foreground">Order Date</span>
                                    </div>
                                    <span className="font-medium text-foreground">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                                    Customer Profile
                                </h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground uppercase">
                                        {order.user?.name?.[0] || '?'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">
                                            {order.user?.name || 'Guest User'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {order.user?.email || 'No email provided'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submission Data */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex items-center gap-2 border-b border-border bg-muted/10 p-6">
                                <FileText className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Submission Questionnaire</h3>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {order.field_values.length > 0 ? (
                                        order.field_values.map((fieldValue) => (
                                            <div
                                                key={fieldValue.id}
                                                className="space-y-1 rounded-2xl border border-border/50 bg-muted/20 p-4"
                                            >
                                                <Label className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
                                                    {fieldValue.form_field.label}
                                                </Label>
                                                <p className="break-words text-sm font-medium text-foreground">
                                                    {fieldValue.value || (
                                                        <span className="italic text-muted-foreground/50">Empty</span>
                                                    )}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center">
                                            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                            <p className="text-sm italic text-muted-foreground">
                                                No custom field data provided with this order.
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
