import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Mail, Shield, User as UserIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Details',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    roles?: { name: string }[];
}

export default function ShowUser({ user }: { user: User }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details: ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">User Details</h2>
                        <p className="text-sm text-muted-foreground">Comprehensive overview of user information.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={route('users.edit', user.id)}>
                            <Button variant="outline" className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit User
                            </Button>
                        </Link>
                        <Link
                            href={route('users.index')}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to users
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <UserIcon className="h-12 w-12" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
                            <p className="mb-6 text-sm text-muted-foreground">{user.email}</p>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="font-semibold text-emerald-500">Active</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                    <span className="text-muted-foreground">User ID</span>
                                    <span className="font-mono text-foreground">#{user.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Information Details */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="mb-6 text-lg font-semibold text-foreground">Account Information</h3>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-1">
                                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                                        <UserIcon className="h-4 w-4" />
                                        Full Name
                                    </div>
                                    <p className="font-medium text-foreground">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        Email Address
                                    </div>
                                    <p className="font-medium text-foreground">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Assigned Roles</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user.roles && user.roles.length > 0 ? (
                                    user.roles.map((role, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                                        >
                                            {role.name}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No roles assigned to this account.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
