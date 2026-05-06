import AppLayout from '@/layouts/app-layout';
import { useCan } from '@/lib/can';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Layers, Plus, Trash2 } from 'lucide-react';

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: '/services',
    },
];

export default function Index({ services }: { services: Service[] }) {
    const canCreate = useCan('services.create');
    const canEdit = useCan('services.edit');
    const canDelete = useCan('services.delete');

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to remove this service?')) {
            router.delete(route('services.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Services</h2>
                        <p className="text-sm text-muted-foreground">Manage your platform offerings and service rates.</p>
                    </div>

                    {canCreate && (
                        <Link
                            href={route('services.create')}
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
                        >
                            <Plus className="h-4 w-4" />
                            Add service
                        </Link>
                    )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="border-b border-border bg-muted/30">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Service Identity
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Overview
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Base Price
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {services.map(({ id, name, description, price }) => (
                                    <tr key={id} className="group transition-colors hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <Layers className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground">{name}</span>
                                                    <span className="text-[10px] font-medium text-muted-foreground">ID: #{id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="line-clamp-1 max-w-xs text-xs text-muted-foreground">
                                                {description || 'No description provided.'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-foreground">€{Number(price).toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                                                <Link
                                                    href={route('services.show', id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                {canEdit && (
                                                    <Link
                                                        href={route('services.edit', id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-500"
                                                        title="Edit Service"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDelete(id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                                                        title="Delete Service"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {services.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <Layers className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-foreground">No services found</h4>
                            <p className="max-w-xs text-sm text-muted-foreground">
                                Start your catalog by adding a new service that customers can order.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
