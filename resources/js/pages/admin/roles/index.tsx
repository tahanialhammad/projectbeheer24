import AppLayout from '@/layouts/app-layout';
import { useCan } from '@/lib/can';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

// permission type properly
type Permission = {
    id: number;
    name: string;
};

// permissions type-specific
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
            <Head title="Roles" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-neutral-800">Roles list</h2>
                    {canCreate && (
                        <Link
                            href={route('roles.create')}
                            className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                        >
                            Add new role
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-neutral-300 shadow-md">
                        <thead className="bg-neutral-100">
                            <tr>
                                <th className="border-b p-3 text-left">ID</th>
                                <th className="border-b p-3 text-left">Name</th>
                                <th className="border-b p-3 text-left">Permissions</th> {/* ✅ FIX: spelling "Permisions" → "Permissions" */}
                                <th className="border-b p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(({ id, name, permissions }) => (
                                <tr key={id} className="transition even:bg-neutral-50 hover:bg-neutral-100">
                                    <td className="border-b p-3">{id}</td>
                                    <td className="border-b p-3">{name}</td>
                                    <td className="border-b p-3">
                                        <div className="flex flex-wrap gap-1">
                                            {permissions.map((permission) => (
                                                <span key={permission.id} className="rounded-full bg-indigo-200 px-2 py-1 text-[10px]">
                                                    {permission.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="flex space-x-2 border-b p-3">
                                        {canView && (
                                            <Link
                                                href={route('roles.show', id)}
                                                className="rounded bg-neutral-600 px-3 py-1 text-white transition hover:bg-green-700"
                                            >
                                                View
                                            </Link>
                                        )}
                                        {canEdit && (
                                            <Link
                                                href={route('roles.edit', id)}
                                                className="rounded bg-green-600 px-3 py-1 text-white transition hover:bg-green-700"
                                            >
                                                Edit
                                            </Link>
                                        )}
                                        {canDelete && (
                                            <button
                                                onClick={() => handleDelete(id)}
                                                className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
