import AppLayout from '@/layouts/app-layout';
import { useCan } from '@/lib/can';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2, User as UserIcon } from 'lucide-react';

type Role = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }: { users: User[] }) {
    const canCreate = useCan('users.create');
    const canView = useCan('users.view');
    const canEdit = useCan('users.edit');
    const canDelete = useCan('users.delete');

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to remove this user?')) {
            router.delete(route('users.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Users</h2>
                        <p className="text-sm text-muted-foreground">Manage platform access and user permissions.</p>
                    </div>

                    {canCreate && (
                        <Link
                            href={route('users.create')}
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
                        >
                            <Plus className="h-4 w-4" />
                            Add user
                        </Link>
                    )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="border-b border-border bg-muted/30">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">User</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</th>
                                    <th className="hidden px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground md:table-cell">
                                        Roles
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {users.map(({ id, name, email, roles }) => (
                                    <tr key={id} className="group transition-colors hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <UserIcon className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground">{name}</span>
                                                    <span className="text-[10px] font-medium text-muted-foreground">ID: #{id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-muted-foreground">{email}</span>
                                        </td>
                                        <td className="hidden px-6 py-4 md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {roles.length > 0 ? (
                                                    roles.map((role) => (
                                                        <span
                                                            key={role.id}
                                                            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary"
                                                        >
                                                            {role.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-[10px] italic text-muted-foreground">No roles assigned</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                {canView && (
                                                    <Link
                                                        href={route('users.show', id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {canEdit && (
                                                    <Link
                                                        href={route('users.edit', id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-500"
                                                        title="Edit User"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDelete(id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                                                        title="Delete User"
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
                    {users.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <UserIcon className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-foreground">No users found</h4>
                            <p className="max-w-xs text-sm text-muted-foreground">
                                We couldn't find any users in the system. Try adding a new user to get started.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
