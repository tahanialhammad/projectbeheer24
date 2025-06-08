import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import SiteNav from './site/SiteNav';

type SiteLayoutProps = {
    children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] px-6 text-[#1b1b18] lg:justify-centertt lg:p-8tt dark:bg-[#0a0a0a]">
            <SiteNav />

            {/* Page Content */}
            <div className="m-4">{children}</div>
        </div>
    );
}
