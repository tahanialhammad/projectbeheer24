import AppLayout from '@/layouts/app-layout';
import { useCan } from '@/lib/can';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Shield, Trash2 } from 'lucide-react';

type Permission = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    name: string;
    permissions: Permission[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index({ roles }: { roles: Role[] }) {
    const canCreate = useCan('roles.create');
    const canView = useCan('roles.view');
    const canEdit = useCan('roles.edit');
    const canDelete = useCan('roles.delete');

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to remove this role?')) {
            router.delete(route('roles.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Roles</h2>
                        <p className="text-sm text-muted-foreground">Manage user roles and their associated capabilities.</p>
                    </div>

                    {canCreate && (
                        <Link
                            href={route('roles.create')}
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
                        >
                            <Plus className="h-4 w-4" />
                            Add role
                        </Link>
                    )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="border-b border-border bg-muted/30">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Role Configuration
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Permissions
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {roles.map(({ id, name, permissions }) => (
                                    <tr key={id} className="group transition-colors hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
                                                    <Shield className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground">{name}</span>
                                                    <span className="text-[10px] font-medium text-muted-foreground">ID: #{id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex max-w-md flex-wrap gap-1">
                                                {permissions.length > 0 ? (
                                                    permissions.map((permission) => (
                                                        <span
                                                            key={permission.id}
                                                            className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/5 px-2 py-0.5 text-[10px] font-medium text-indigo-500"
                                                        >
                                                            {permission.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-[10px] italic text-muted-foreground">No permissions</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                                                {canView && (
                                                    <Link
                                                        href={route('roles.show', id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {canEdit && (
                                                    <Link
                                                        href={route('roles.edit', id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-500"
                                                        title="Edit Role"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDelete(id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                                                        title="Delete Role"
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
                    {roles.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-foreground">No roles found</h4>
                            <p className="max-w-xs text-sm text-muted-foreground">
                                We couldn't find any roles. Create one to start defining platform permissions.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
