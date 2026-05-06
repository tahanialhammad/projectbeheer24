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
                    <p className="mt-1 text-sm text-[#ccc3d8]">Welcome back.user dashboard</p>
                </div>

            </div>
            <div></div>
        </AppLayout>
    );
}



