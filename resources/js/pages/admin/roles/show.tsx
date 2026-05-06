import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Details',
        href: '#',
    },
];

interface Role {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    name: string;
}

export default function ShowRole({ role, permissions }: { role: Role; permissions: Permission[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Role Details: ${role.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Role Details</h2>
                        <p className="text-sm text-muted-foreground">Comprehensive overview of role configuration and capabilities.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={route('roles.edit', role.id)}>
                            <Button variant="outline" className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Role
                            </Button>
                        </Link>
                        <Link
                            href={route('roles.index')}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to roles
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Role Identity Card */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                                <ShieldCheck className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground capitalize">{role.name}</h3>
                            <p className="mb-6 text-sm text-muted-foreground italic">Platform Authority Level</p>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                    <span className="text-muted-foreground">Internal ID</span>
                                    <span className="font-mono text-foreground">#{role.id}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-sm">
                                    <span className="text-muted-foreground">Assigned Permissions</span>
                                    <span className="font-bold text-indigo-500">{permissions.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Information */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-indigo-500" />
                                <h3 className="text-lg font-semibold text-foreground">Active Capabilities</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {permissions.length > 0 ? (
                                    permissions.map((permission) => (
                                        <div
                                            key={permission.id}
                                            className="group flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3 transition-all hover:bg-muted/40"
                                        >
                                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 transition-transform group-hover:scale-150" />
                                            <span className="text-sm font-medium text-foreground">{permission.name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <p className="text-sm text-muted-foreground italic">This role has no permissions assigned.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
