import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Role = {
    id: number;
    name: string;
};

type Permission = {
    id: number;
    name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show role',
        href: '/roles/show',
    },
];

export default function ShowRole({ role, permissions }: { role: Role; permissions: Permission[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Role: ${role.name}`} />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Role: {role.name}</h2>
                <Link href="/roles" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all Roles
                </Link>
            </div>

            <div className="max-w-xl rounded-md bg-white p-6 shadow">
                <h3 className="mb-4 text-xl font-semibold text-gray-700">Role Information</h3>

                <div className="mb-4">
                    <span className="block text-gray-500">Name:</span>
                    <p className="text-lg text-gray-800">{role.name}</p>
                </div>

                <div>
                    <span className="mb-2 block text-gray-500">Permissions:</span>
                    <div className="flex flex-wrap gap-2">
                        {permissions.map((permission) => (
                            <span key={permission.id} className="rounded-full bg-indigo-200 px-2 py-1 text-xs text-indigo-800">
                                {permission.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
