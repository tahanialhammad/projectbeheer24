import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit User',
        href: '/users/edit',
    },
];

export default function EditUser({ user }: { user: { id: number; name: string; email: string; role: string } }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name || '',
        email:  user.email || '',
        password: '',
        // role: '',
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit user" />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Edit User {user.name}</h2>
                <Link href="/users" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all users
                </Link>
            </div>

            <form className="max-w-xl space-y-6 rounded bg-white p-6 shadow-md" onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        tabIndex={1}
                        autoFocus
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Full name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="Email address"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        tabIndex={3}
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        placeholder="Create a password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* <div>
                    <Label htmlFor="role">Role</Label>
                    <select
                        id="role"
                        tabIndex={4}
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        disabled={processing}
                        className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select a role</option>
                        <option value="super admin">Super Admin</option>
                        <option value="clientadmin">Client Admin</option>
                        <option value="user">User</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div> */}

                <button
                    type="submit"
                    tabIndex={5}
                    disabled={processing}
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
                >
                    Update
                </button>
            </form>
        </AppLayout>
    );
}
