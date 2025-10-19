import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit role',
        href: '/roles/edit',
    },
];

export default function EditRole({ role, permissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name ?? '',
        permissions: role.permissions?.map((p) => p.name) ?? [],
    });

    function handleCheckBoxChanges(permissionName, checked) {
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((name) => name !== permissionName),
            );
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit role" />

            <div className="mb-6 flex items-center justify-between">
                <Heading title="Edit Role" description="" />

                <Link href="/roles" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all roles
                </Link>
            </div>

            <form className="max-w-xl space-y-6 rounded bg-white dark:bg-neutral-700 p-6 shadow-md" onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        autoFocus
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Role name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label className="mb-2 block">Permissions</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {permissions.map((permission) => (
                            <label key={permission.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={permission.name}
                                    checked={data.permissions.includes(permission.name)}
                                    onChange={(e) => handleCheckBoxChanges(permission.name, e.target.checked)}
                                />
                                <span>{permission.name}</span>
                            </label>
                        ))}
                    </div>
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
