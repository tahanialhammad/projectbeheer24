import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show user',
        href: '/user/show',
    },
];

export default function ShowUser({ user }: { user: { id: number; name: string; email: string; role: string } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-800">User: {user.name}</h2>
                <Link
                    href="/users"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                >
                    Back to all users
                </Link>
            </div>

            <div className="max-w-xl rounded-md bg-white dark:bg-neutral-700 p-6 shadow">
                <h3 className="mb-4 text-xl font-semibold">User Information</h3>
                <div className="space-y-4">
                    <div>
                        <span className="">Name:</span>
                        <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                        <span className="text-neutral-500">Email:</span>
                        <p className="text-lg">{user.email}</p>
                    </div>
                    {/* <div>
                        <span className="text-neutral-500">Role:</span>
                        <p className="text-lg text-neutral-800 capitalize">{user.role}</p>
                    </div> */}
                </div>
            </div>
        </AppLayout>
    );
}
