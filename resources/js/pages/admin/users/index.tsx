import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { can } from '@/lib/can';


type User = {
    id: number;
    name: string;
    email: string;
    roles: [];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }: { users: User[] }) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to remove this user?')) {
            //  e.preventDefault();
            // destroy(`/users/${id}`);
            // destroy(route("users.destroy"));
            router.delete(route('users.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-800">User list</h2>
                    {can('users.create') && 
                    <Link href={route('users.create')} className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                        Add new user
                    </Link>}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-300 shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b p-3 text-left">ID</th>
                                <th className="border-b p-3 text-left">Name</th>
                                <th className="border-b p-3 text-left">E-mail</th>
                                <th className="border-b p-3 text-left">Roles</th>
                                <th className="border-b p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(({ id, name, email, roles }) => (
                                <tr key={id} className="transition even:bg-gray-50 hover:bg-gray-100">
                                    <td className="border-b p-3">{id}</td>
                                    <td className="border-b p-3">{name}</td>
                                    <td className="border-b p-3">{email}</td>
                                    <td className="border-b p-3">
                                        <div className="flex flex-wrap gap-1">
                                            {roles.map((role) => (
                                                <span key={role.id} className="rounded-full bg-indigo-200 px-2 py-1 text-[10px]">
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="flex space-x-2 border-b p-3">
                                         {can('users.view') && 
                                        <Link
                                            href={route('users.show', id)}
                                            className="rounded bg-gray-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            view
                                        </Link>}
                                         {can('users.edit') && 
                                        <Link
                                            href={route('users.edit', id)}
                                            className="rounded bg-green-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            Edit
                                        </Link>}
                                         {can('users.delete') && 
                                        <button
                                            onClick={() => handleDelete(id)}
                                            className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>}
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
