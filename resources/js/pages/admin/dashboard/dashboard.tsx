import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { BadgeEuro, Layers, ShoppingBag, Users } from 'lucide-react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        users_count: number;
        orders_count: number;
        services_count: number;
        total_revenue: number;
    };
    chartData: {
        labels: string[];
        data: number[];
    };
}

export default function Dashboard({ stats, chartData }: DashboardProps) {
    const lineChartData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Orders',
                data: chartData.data,
                borderColor: 'rgb(168, 85, 247)', // Purple-500
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgb(168, 85, 247)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                },
                ticks: {
                    color: 'rgba(156, 163, 175, 0.5)',
                    font: {
                        size: 11,
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(156, 163, 175, 0.5)',
                    font: {
                        size: 11,
                    },
                },
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-1">
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Admin Overview</h2>
                    <p className="text-sm text-muted-foreground">Comprehensive platform metrics and activity.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Revenue Card */}
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Revenue</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10">
                                <BadgeEuro className="h-4 w-4 text-fuchsia-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-black text-foreground">€{stats.total_revenue.toLocaleString()}</h3>
                            <p className="mt-1 text-xs text-fuchsia-500/60">Total paid orders</p>
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Orders</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                                <ShoppingBag className="h-4 w-4 text-blue-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-black text-foreground">{stats.orders_count}</h3>
                            <p className="mt-1 text-xs text-blue-500/60">Across all services</p>
                        </div>
                    </div>

                    {/* Users Card */}
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Users</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                                <Users className="h-4 w-4 text-emerald-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-black text-foreground">{stats.users_count}</h3>
                            <p className="mt-1 text-xs text-emerald-500/60">Registered accounts</p>
                        </div>
                    </div>

                    {/* Services Card */}
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Services</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                                <Layers className="h-4 w-4 text-orange-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-black text-foreground">{stats.services_count}</h3>
                            <p className="mt-1 text-xs text-orange-500/60">Active offerings</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Chart Section */}
                    <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Order Performance</h3>
                                <p className="text-sm text-muted-foreground">Monthly trend analysis</p>
                            </div>
                        </div>
                        <div className="h-[320px] w-full">
                            <Line data={lineChartData} options={options} />
                        </div>
                    </div>

                    {/* Quick Insights */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Key Insights</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-xl bg-accent/30 p-4">
                                    <span className="text-sm text-muted-foreground">Avg. Order Value</span>
                                    <span className="font-mono text-sm font-semibold text-foreground">
                                        €{(stats.total_revenue / (stats.orders_count || 1)).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-accent/30 p-4">
                                    <span className="text-sm text-muted-foreground">Order/User Ratio</span>
                                    <span className="font-mono text-sm font-semibold text-foreground">
                                        {(stats.orders_count / (stats.users_count || 1)).toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-accent/30 p-4">
                                    <span className="text-sm text-emerald-600 dark:text-emerald-400">Platform Health</span>
                                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Stable</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-card p-6">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-muted/20" />
                            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                                <div className="mb-2 h-12 w-12 rounded-full bg-primary/10 p-3">
                                    <div className="h-full w-full rounded-full bg-primary/20" />
                                </div>
                                <h4 className="text-sm font-medium text-foreground">More insights coming soon</h4>
                                <p className="mt-1 text-xs text-muted-foreground">Advanced analytics are being processed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
