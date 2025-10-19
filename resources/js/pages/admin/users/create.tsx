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
        title: 'Create User',
        href: '/users/create',
    },
];

export default function CreateUser({ roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [],
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

    // function submit(e) {
    //     e.preventDefault();
    //     post(route('users.store'));
    // }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset(), // Reset form on successful submission
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create user" />

            <div className="mb-6 flex items-center justify-between">
                <Heading title="Create User" description="" />

                <Link href="/users" className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                    Back to all users
                </Link>
            </div>

            <form className="max-w-xl space-y-6 rounded bg-white p-6 shadow-md dark:bg-neutral-700" onSubmit={submit}>
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

                <div>
                    <Label className="mb-2 block">Roles</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {roles.map((role) => (
                            <label key={role} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={role}
                                    id={role}
                                    checked={data.roles.includes(role)}
                                    onChange={(e) => handleCheckBoxChanges(role, e.target.checked)}
                                />
                                <span>{role}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    tabIndex={5}
                    disabled={processing}
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
                >
                    Create
                </button>
            </form>
        </AppLayout>
    );
}
