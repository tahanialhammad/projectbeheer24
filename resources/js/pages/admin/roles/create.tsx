import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create role',
        href: '/roles/create',
    },
];

// ✅ FIX: Add proper type for props
interface CreateRoleProps {
    permissions: string[]; // if permission items are just strings
}

// ✅ FIX: Add proper type for form data managed by useForm
interface RoleFormData {
    name: string;
    permissions: string[];
}

export default function CreateRole({ permissions }: CreateRoleProps) { // ✅ FIX: typed props
    const { data, setData, post, processing, errors, reset } = useForm<RoleFormData>({ // ✅ FIX: typed useForm with RoleFormData
        name: '',
        permissions: [],
    });

    // ✅ FIX: Added type annotations for parameters
    function handleCheckBoxChanges(permissionName: string, checked: boolean) {
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((name) => name !== permissionName), // ✅ FIX: changed `!=` to `!==` (strict equality)
            );
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create role" /> {/* ✅ FIX: Corrected title from "Create user" to "Create role" */}

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Create Role</h2> {/* ✅ FIX: Changed "Create User" to "Create Role" */}
                <Link
                    href="/roles"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                >
                    Back to all roles
                </Link>
            </div>

            <form
                className="max-w-xl space-y-6 rounded bg-white p-6 shadow-md"
                onSubmit={submit}
            >
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
                        placeholder="Role name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label className="mb-2 block">Permissions</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {permissions.map((permission) => (
                            <label key={permission} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={permission}
                                    id={permission}
                                    checked={data.permissions.includes(permission)} // ✅ FIX: made checkbox controlled using `checked`
                                    onChange={(e) =>
                                        handleCheckBoxChanges(permission, e.target.checked)
                                    }
                                />
                                <span>{permission}</span>
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
