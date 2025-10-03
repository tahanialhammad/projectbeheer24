// 'use client';

import SiteLayout from '@/layouts/site-layout copy';
import Categories from './partials/Categories';
import Features from './partials/Features';
import HeroSection from './partials/HeroSection';
import WebProducts from './partials/WebProducts';

export default function Welcome({ services, initialTime }) {
    return (
        <div className="bg-white">
            <SiteLayout title="Welcome">
                <HeroSection />
                <WebProducts services={services} />
                <Categories initialTime={initialTime} />
                <Features />
            </SiteLayout>
        </div>
    );
}
