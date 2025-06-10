import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

type Role = {
    id: number;
    name: string;
    permissions: [];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index({ roles }: { roles: Role[] }) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to remove this user?')) {
            router.delete(route('users.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-800">Roles list</h2>
                    <Link href={route('roles.create')} className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                        Add new role
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-300 shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b p-3 text-left">ID</th>
                                <th className="border-b p-3 text-left">Name</th>
                                <th className="border-b p-3 text-left">Permisions</th>
                                <th className="border-b p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(({ id, name, permissions }) => (
                                <tr key={id} className="transition even:bg-gray-50 hover:bg-gray-100">
                                    <td className="border-b p-3">{id}</td>
                                    <td className="border-b p-3">{name}</td>
                                    <td className="border-b p-3 flex-1 space-x-2 ">
                                        {permissions.map((permission) => (
                                            <span className='px-2 py-1 bg-indigo-200 rounded-full text-[10px]'>{permission.name}</span>
                                        ))}
                                    </td>

                                    <td className="flex space-x-2 border-b p-3">
                                        <Link
                                            href={route('roles.show', id)}
                                            className="rounded bg-gray-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            view
                                        </Link>
                                        <Link
                                            href={route('roles.edit', id)}
                                            className="rounded bg-green-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(id)}
                                            className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
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
