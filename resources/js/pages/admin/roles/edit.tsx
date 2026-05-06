import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions?: { name: string }[];
}

interface EditRoleProps {
    role: Role;
    permissions: Permission[];
}

export default function EditRole({ role, permissions }: EditRoleProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name ?? '',
        permissions: role.permissions?.map((p) => p.name) ?? [],
    });

    function handleCheckBoxChanges(permissionName: string, checked: boolean) {
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
            <Head title={`Edit Role: ${role.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Edit Role</h2>
                        <p className="text-sm text-muted-foreground">
                            Modify permissions for the <span className="font-semibold text-foreground">{role.name}</span> role.
                        </p>
                    </div>

                    <Link
                        href={route('roles.index')}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to roles
                    </Link>
                </div>

                <div className="max-w-2xl">
                    <form
                        className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm"
                        onSubmit={submit}
                    >
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Role Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="bg-muted/30 focus:bg-background"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <Label className="text-sm font-semibold">Permissions Matrix</Label>
                                </div>
                                <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:grid-cols-2">
                                    {permissions.map((permission) => (
                                        <label key={permission.id} className="group flex cursor-pointer items-center gap-3">
                                            <input
                                                type="checkbox"
                                                value={permission.name}
                                                checked={data.permissions.includes(permission.name)}
                                                onChange={(e) => handleCheckBoxChanges(permission.name, e.target.checked)}
                                                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/20"
                                            />
                                            <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                                                {permission.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={errors.permissions} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border-t border-border pt-6">
                            <Button type="submit" disabled={processing} className="gap-2">
                                <Save className="h-4 w-4" />
                                Save Role
                            </Button>
                            <Link href={route('roles.index')}>
                                <Button variant="ghost">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
