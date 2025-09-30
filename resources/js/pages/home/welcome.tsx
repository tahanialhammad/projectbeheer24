// 'use client';

import NavLink from '@/components/NavLink';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import { Fragment, useState } from 'react';
import AppLogo from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout copy';
import HeroSection from './partials/HeroSection';

const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'Services', href: 'services' },
    { name: 'Blog', href: 'posts' },
    { name: 'FAQs', href: 'faqs' },
];

export default function Welcome() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-white">

        <SiteLayout title="Welcome">

               <HeroSection />


            </SiteLayout>
        </div>
    );
}
