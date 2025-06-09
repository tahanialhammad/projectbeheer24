import AppLogoIcon from "@/components/app-logo-icon";
import { Link } from "@inertiajs/react";

export default function SiteFooter() {
    return (
        <footer className="mt-8 bg-gray-100 text-gray-800">
            <div className="container mx-auto py-10 px-4">
                {/* Footer Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm">
                    {/* Column 1: Logo and Description */}
                    <div>
                        <Link href="/" className="!no-underline flex items-center mb-4">
                            <AppLogoIcon className="h-12 w-auto text-gray-800 me-4" />
                            <h3 className="text-3xl font-black text-gray-900">ProjectBeheer24</h3>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
                            eaque vero. Amet ducimus a fugit nihil sint recusandae sunt, velit
                            culpa beatae quam unde! Fuga, nemo!
                        </p>
                    </div>

                    {/* Column 2: About */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Meet ProjectBeheer24 platform</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:underline">About Us</Link></li>
                            <li><Link href="/" className="hover:underline">Our Team</Link></li>
                            <li><Link href="/" className="hover:underline">Contact Us</Link></li>
                            <li><Link href="/" className="hover:underline">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:underline">FAQs</Link></li>
                            <li><Link href="/" className="hover:underline">Shipping Info</Link></li>
                            <li><Link href="/" className="hover:underline">Return Policy</Link></li>
                            <li><Link href="/" className="hover:underline">Customer Support</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Categories</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:underline">Clothing</Link></li>
                            <li><Link href="/" className="hover:underline">Toys</Link></li>
                            <li><Link href="/" className="hover:underline">Accessories</Link></li>
                            <li><Link href="/" className="hover:underline">Gifts</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Follow Us */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Follow Us</h4>
                        <ul className="space-y-2">
                            <li><Link href="https://facebook.com" className="hover:underline">Facebook</Link></li>
                            <li><Link href="https://instagram.com" className="hover:underline">Instagram</Link></li>
                            <li><Link href="https://twitter.com" className="hover:underline">Twitter</Link></li>
                            <li><Link href="https://pinterest.com" className="hover:underline">Pinterest</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-300 pt-4 text-center text-xs">
                    &copy; {new Date().getFullYear()} Baby Shop. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
