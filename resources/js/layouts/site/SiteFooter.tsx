import AppLogo from '@/components/app-logo';
import NavLink from '@/components/NavLink';
import { Link } from '@inertiajs/react';

const platformNav = [
    { name: 'Diensten', href: 'services' },
    { name: 'Blog', href: 'posts' },
    { name: 'FAQs', href: 'faqs' },
];

const quickLinks = [
    { name: 'Over mij', href: 'about' },
    { name: 'Contact', href: 'contact' },
];

const categories = [{ name: 'Diensten', href: 'services' }];
const socialLinks = [{ name: 'FaceBook', href: 'https://facebook.com' }];

export default function SiteFooter() {
    return (
        <footer className="mt-8 bg-gray-100 text-gray-800">
            <div className="container mx-auto px-4 py-10">
                {/* Footer Columns */}
                <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:grid-cols-5">
                    {/* Column 1: Logo and Description */}
                    <div>
                        <Link href="/" className="-m-1.5 p-1.5">
                            <AppLogo showName />
                        </Link>
                        <p>Freelance webontwikkelaar uit Groningen!</p>
                    </div>

                    {/* Column 2: About */}
                    <div>
                        <h4 className="mb-3 text-lg font-bold">Platform</h4>
                        <ul className="space-y-2">
                            {platformNav.map((item) => (
                                <li>
                                    <NavLink
                                        key={item.name}
                                        href={item.href && route(item.href)}
                                        active={!!(item.href && route().current(item.href))}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="mb-3 text-lg font-bold">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((item) => (
                                <li>
                                    <NavLink
                                        key={item.name}
                                        href={item.href && route(item.href)}
                                        active={!!(item.href && route().current(item.href))}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Categories */}
                    <div>
                        <h4 className="mb-3 text-lg font-bold">Categories</h4>
                        <ul className="space-y-2">
                            {categories.map((item) => (
                                <li>
                                    <NavLink
                                        key={item.name}
                                        href={item.href && route(item.href)}
                                        active={!!(item.href && route().current(item.href))}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Follow Us */}
                    <div>
                        <h4 className="mb-3 text-lg font-bold">Follow Us</h4>
                        <ul className="space-y-2">
                            {socialLinks.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} target="_blank">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-300 pt-4 text-center text-xs">
                    &copy; {new Date().getFullYear()} ProjectBheer24. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
