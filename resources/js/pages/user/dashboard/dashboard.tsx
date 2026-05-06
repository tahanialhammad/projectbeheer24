import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { AlertCircle, CheckCircle2, Clock, ShoppingBag } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Order {
    id: number;
    status: string;
    created_at: string;
    service: {
        name: string;
    };
}

interface DashboardProps {
    latestOrders: Order[];
    statusData: {
        labels: string[];
        data: number[];
    };
}

export default function Dashboard({ latestOrders, statusData }: DashboardProps) {
    const doughnutData = {
        labels: statusData.labels.map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
        datasets: [
            {
                data: statusData.data,
                backgroundColor: [
                    'rgba(168, 85, 247, 0.4)', // Purple
                    'rgba(59, 130, 246, 0.4)', // Blue
                    'rgba(16, 185, 129, 0.4)', // Emerald
                    'rgba(245, 158, 11, 0.4)', // Amber
                ],
                borderColor: [
                    'rgb(168, 85, 247)',
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: 'rgba(156, 163, 175, 0.8)',
                    padding: 20,
                    font: {
                        size: 11,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
            },
        },
        cutout: '75%',
        maintainAspectRatio: false,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-1">
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Dashboard</h2>
                    <p className="text-sm text-muted-foreground">Manage your services and track your orders.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Latest Orders Section */}
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
                            <button className="text-sm font-medium text-primary hover:underline">View all orders</button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {latestOrders.length > 0 ? (
                                latestOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:bg-accent/50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                                <ShoppingBag className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground">{order.service.name}</h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(order.created_at).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                    order.status === 'completed'
                                                        ? 'bg-emerald-500/10 text-emerald-500'
                                                        : order.status === 'processing'
                                                          ? 'bg-blue-500/10 text-blue-500'
                                                          : 'bg-amber-500/10 text-amber-500'
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
                                    <Clock className="mb-2 h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Status Chart */}
                    <div className="flex flex-col gap-4 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-foreground">Order Status</h3>
                        <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card p-8">
                            {statusData.data.length > 0 ? (
                                <div className="relative h-full w-full">
                                    <Doughnut data={doughnutData} options={options} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black text-foreground">
                                            {statusData.data.reduce((a, b) => a + b, 0)}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            Total
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <AlertCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">No data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/30">
                        <div className="relative z-10">
                            <h3 className="mb-2 text-lg font-semibold text-foreground">Need Assistance?</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Our support team is ready to help you with your projects.
                            </p>
                            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                                Contact Support
                            </button>
                        </div>
                        <CheckCircle2 className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/5 transition-colors group-hover:text-primary/10" />
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/30">
                        <div className="relative z-10">
                            <h3 className="mb-2 text-lg font-semibold text-foreground">New Services</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Explore our latest offerings and boost your project.
                            </p>
                            <button className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
                                Explore Services
                            </button>
                        </div>
                        <ShoppingBag className="absolute -bottom-4 -right-4 h-24 w-24 text-foreground/5 transition-colors group-hover:text-foreground/10" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
