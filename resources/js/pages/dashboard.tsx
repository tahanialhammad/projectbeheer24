import PrimaryButton from '@/components/PrimaryButton';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BadgeCheck, BadgeEuro, Clock3, TrendingUp, TriangleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-white">Overview</h2>
                    <p className="mt-1 text-sm text-[#ccc3d8]">Welcome back. Your revenue is up 12% from last month.</p>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <h3 className="text-l font-bold text-fuchsia-200 uppercase">Total Revenue</h3>
                            <BadgeEuro className="text-gray-400 hover:text-fuchsia-200" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black">$142,850</h3>
                            <div className="flex items-center gap-1">
                                <TrendingUp size={10} />
                                <p className="text-sm text-indigo-300">+12.5% vs last month</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <h3 className="text-l font-bold text-gray-400 uppercase">Paid Invoices</h3>
                            <BadgeCheck className="text-gray-400 hover:text-fuchsia-200" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black">85</h3>
                            <div className="flex items-center gap-1">
                                <TrendingUp size={10} />
                                <p className="text-sm text-indigo-300">Last update: 2 hours ago</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <h3 className="text-l font-bold text-gray-400 uppercase">Pending</h3>
                            <Clock3 className="text-gray-400 hover:text-orange-200" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black">$24,105</h3>
                            <div className="flex items-center gap-1">
                                <p className="text-sm text-orange-300">! 12 invoices awaiting payment</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <h3 className="text-l font-bold text-gray-400 uppercase">Overdue</h3>
                            <TriangleAlert className="text-gray-400 hover:text-orange-200" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black">$4,200</h3>
                            <div className="flex items-center gap-1">
                                <p className="text-sm text-orange-300">Needs immediate attention</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 p-4 lg:col-span-2 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="">Revenue Performance</h3>
                                <p className="text-gray-400">Annual performance trend analysis</p>
                            </div>

                            <div>
                                <PrimaryButton>Yearly</PrimaryButton>
                                <PrimaryButton>Monthly</PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 p-4 lg:col-span-1 dark:border-sidebar-border">
                        Right content (Stats / Summary)
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <h2>table</h2>
                </div>
            </div>
            <div></div>
        </AppLayout>
    );
}



