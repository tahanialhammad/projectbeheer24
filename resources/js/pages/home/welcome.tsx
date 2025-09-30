// 'use client';

import SiteLayout from '@/layouts/site-layout copy';
import { useState } from 'react';
import HeroSection from './partials/HeroSection';
import WebProducts from './partials/WebProducts';

const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'Services', href: 'services' },
    { name: 'Blog', href: 'posts' },
    { name: 'FAQs', href: 'faqs' },
];

export default function Welcome({ services }) {
    return (
        <div className="bg-white">
            <SiteLayout title="Welcome">
                <HeroSection />
                <WebProducts products={services} />
            </SiteLayout>
        </div>
    );
}
