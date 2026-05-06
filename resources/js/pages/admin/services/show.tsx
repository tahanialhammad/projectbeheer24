import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Edit, Layers, Tag } from 'lucide-react';

type FormField = {
    id: number;
    label: string;
    name: string;
    type: string;
    required: boolean;
    options?: string | null;
};

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    discount_type?: 'fixed' | 'percentage';
    image: string;
    discounted_price?: number;
    form_fields: FormField[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Services', href: '/services' },
    { title: 'Details', href: '#' },
];

function formatOptions(options: string | null) {
    if (!options) return '—';
    try {
        const arr = JSON.parse(options);
        return Array.isArray(arr) ? arr.join(', ') : String(options);
    } catch {
        return String(options);
    }
}

export default function Show({ service }: { service: Service }) {
    const hasDiscount = service.discounted_price && service.discounted_price < service.price;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Service: ${service.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                            Service Preview
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            View service configuration and customer-facing details.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={route('services.edit', service.id)}>
                            <Button variant="outline" className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Service
                            </Button>
                        </Link>
                        <Link
                            href={route('services.index')}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to services
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Visual Asset & Pricing */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <img
                                src={service.image ? `/storage/${service.image}` : '/images/Dashboard.webp'}
                                className="h-56 w-full object-cover"
                                alt={service.name}
                            />
                            <div className="p-6 space-y-4">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-primary">
                                            €{service.discounted_price ?? service.price}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                €{service.price}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {hasDiscount && (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
                                        <Tag className="h-3 w-3" />
                                        PROMOTION ACTIVE
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Service Status
                            </h4>
                            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                <span className="text-muted-foreground">Availability</span>
                                <span className="font-semibold text-emerald-500">Public</span>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                <span className="text-muted-foreground">Service ID</span>
                                <span className="font-mono text-foreground">#{service.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Service Details & Form Config */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                <Layers className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Service Description</h3>
                            </div>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                                {service.description || 'No detailed description provided for this service.'}
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex items-center gap-2 border-b border-border bg-muted/10 p-6">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Order Form Configuration</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        <tr>
                                            <th className="px-6 py-4">Field Label</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Required</th>
                                            <th className="px-6 py-4">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {service.form_fields.length > 0 ? (
                                            service.form_fields.map((field) => (
                                                <tr key={field.id} className="transition-colors hover:bg-muted/20">
                                                    <td className="px-6 py-4 font-medium text-foreground">
                                                        {field.label}
                                                    </td>
                                                    <td className="px-6 py-4 capitalize text-muted-foreground">
                                                        {field.type}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {field.required ? (
                                                            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-500">
                                                                Yes
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">No</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] italic text-muted-foreground">
                                                        {formatOptions(field.options)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-12 text-center italic text-muted-foreground"
                                                >
                                                    No custom fields configured for the order form.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
