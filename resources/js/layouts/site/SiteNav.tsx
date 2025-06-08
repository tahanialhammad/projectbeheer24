import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function SiteNav() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div>
            <header className="mb-6 w-full bg-red-200 text-sm not-has-[nav]:hidden">
                <nav className="flex items-center justify-between gap-4">
                    <div>
                        <Link href="/" className="-m-1.5 p-1.5">
                            LOGO
                        </Link>
                    </div>

                    <div>menu</div>

                    <div>
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
            </header>
        </div>
    );
}
