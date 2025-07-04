import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import NavLink from '@/components/NavLink';
import { type SharedData } from '@/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navigation = [
    { name: 'Home', href: 'home' },
    // { name: "Shop", href: "products.index" },
    { name: 'Services', href: 'services' },
    { name: 'Blog', href: 'posts' },
    { name: 'FAQs', href: 'faqs' },
    // { name: "About", href: "about" },
];

export default function SiteNav() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div>
            <header className="absolute inset-x-0 top-0 z-50 mb-6 w-full text-sm not-has-[nav]:hidden">
                <nav className="flex items-center justify-between gap-4 p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <AppLogo />
                        </Link>
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href && route(item.href)}
                                active={!!(item.href && route().current(item.href))}
                                className="text-sm leading-6 font-semibold text-gray-900"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <AppLogoIcon className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href && route(item.href)}
                                            className={`-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold hover:bg-gray-50 ${
                                                item.href && route().current(item.href) ? 'text-indigo-600' : 'text-gray-900'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                                {auth.user ? (
                                    <div className="py-6">
                                        <Link
                                            href={route('dashboard')}
                                            className="font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className="py-6">
                                            <Link href={route('login')} className="me-2 text-sm leading-6 font-semibold text-gray-900">
                                                {/* <AccountCircleOutlinedIcon /> */}
                                            </Link>
                                        </div>
                                        <div className="py-6">
                                            <Link href={route('register')} className="me-2 text-sm leading-6 font-semibold text-gray-900">
                                                Register
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </div>
    );
}
