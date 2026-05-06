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
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: { name: string }[];
}

interface EditUserProps {
    user: User;
    roles: Role[];
}

export default function EditUser({ user, roles }: EditUserProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: user.roles.map((role) => role.name),
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
            <Head title={`Edit User: ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Edit User</h2>
                        <p className="text-sm text-muted-foreground">
                            Update details for <span className="font-semibold text-foreground">{user.name}</span>
                        </p>
                    </div>

                    <Link
                        href={route('users.index')}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to users
                    </Link>
                </div>

                <div className="max-w-2xl">
                    <form
                        className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm"
                        onSubmit={submit}
                    >
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="bg-muted/30 focus:bg-background"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="bg-muted/30 focus:bg-background"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                                        Optional
                                    </span>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Leave blank to keep current"
                                    className="bg-muted/30 focus:bg-background"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <Label className="text-sm font-semibold">Roles & Permissions</Label>
                                </div>
                                <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:grid-cols-2">
                                    {roles.map((role) => (
                                        <label key={role.id} className="group flex cursor-pointer items-center gap-3">
                                            <input
                                                type="checkbox"
                                                value={role.name}
                                                checked={data.roles.includes(role.name)}
                                                onChange={(e) => handleCheckBoxChanges(role.name, e.target.checked)}
                                                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/20"
                                            />
                                            <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                                                {role.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={errors.roles} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border-t border-border pt-6">
                            <Button type="submit" disabled={processing} className="gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                            <Link href={route('users.index')}>
                                <Button variant="ghost">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
