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
        title: 'Create',
        href: '/roles/create',
    },
];

interface CreateRoleProps {
    permissions: string[];
}

interface RoleFormData {
    name: string;
    permissions: string[];
}

export default function CreateRole({ permissions }: CreateRoleProps) {
    const { data, setData, post, processing, errors, reset } = useForm<RoleFormData>({
        name: '',
        permissions: [],
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
        post(route('roles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Create Role</h2>
                        <p className="text-sm text-muted-foreground">Define a new authority level and assign its capabilities.</p>
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
                                    autoFocus
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Content Manager"
                                    className="bg-muted/30 focus:bg-background"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <Label className="text-sm font-semibold">Assign Permissions</Label>
                                </div>
                                <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:grid-cols-2">
                                    {permissions.map((permission) => (
                                        <label key={permission} className="group flex cursor-pointer items-center gap-3">
                                            <input
                                                type="checkbox"
                                                value={permission}
                                                checked={data.permissions.includes(permission)}
                                                onChange={(e) => handleCheckBoxChanges(permission, e.target.checked)}
                                                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/20"
                                            />
                                            <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                                                {permission}
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
                                Create Role
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
