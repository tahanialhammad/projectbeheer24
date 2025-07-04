import FlashMessage from '@/components/FlashMessage';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';
import SiteFooter from './site/SiteFooter';
import SiteNav from './site/SiteNav';

type SiteLayoutProps = {
    children: ReactNode;
    title?: string;
};

export default function SiteLayout({ children, title = 'Welcome' }: SiteLayoutProps) {
    //    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="lg:justify-centertt flex min-h-screen flex-col bg-[#FDFDFC] px-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
                <SiteNav />

                {/* Page Content */}
                <div className="m-4 mt-24">
                    <FlashMessage />
                    {children}
                </div>
                <footer>
                    <SiteFooter />
                </footer>
            </div>
        </>
    );
}
