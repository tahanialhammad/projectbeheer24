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

export default function EditUser({
    user,
    roles,
}: {
    user: { id: number; name: string; email: string; roles: { name: string }[] };
    roles: { id: number; name: string }[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: user.roles.map((role) => role.name), // hier fix
    });

    function handleCheckBoxChanges(roleName: string, checked: boolean) {
        if (checked) {
            setData('roles', [...data.roles, roleName]);
        } else {
            setData(
                'roles',
                data.roles.filter((name) => name !== roleName),
            );
        }
    }

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
                    <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} disabled={processing} />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} disabled={processing} />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        placeholder="Leave blank to keep current password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <Label className="mb-2 block">Roles</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {roles.map((role) => (
                            <label key={role.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={role.name}
                                    checked={data.roles.includes(role.name)}
                                    onChange={(e) => handleCheckBoxChanges(role.name, e.target.checked)}
                                />
                                <span>{role.name}</span>
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.roles} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
                >
                    Update
                </button>
            </form>
        </AppLayout>
    );
}
