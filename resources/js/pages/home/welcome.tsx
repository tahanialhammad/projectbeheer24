// 'use client';

import CallToAction from '@/components/callToAction';
import CountUp from '@/components/countup';
import PricingPlans from '@/components/pricingplans';
import SiteLayout from '@/layouts/site-layout';
import Categories from './partials/Categories';
import Features from './partials/Features';
import HeroSection from './partials/HeroSection';
import WebProducts from './partials/WebProducts';

export default function Welcome({ services, initialTime }) {
    const sliderImages = [
        { src: '/images/blonde-influencer-using-laptop.jpg', alt: 'Slide 1' },
        { src: '/images/digital-tablet-stylus-pen-laptop-desktop-close-up.jpg', alt: 'Slide 2' },
        { src: '/images/front-view-female-office-worker-black-strict-jacket-using-her-laptop-pink-wall.jpg', alt: 'Slide 3' },
    ];

    return (
        <div className="bg-white">
            <SiteLayout title="Welcome">
                <HeroSection sliderImages={sliderImages} />
                <WebProducts services={services} />
                <div className="mx-auto my-8 flex w-2/3 flex-col gap-2 text-center">
                    <h2 className="text-4xl font-bold">Why Businesses Work With Us?</h2>
                    <p>
                        We focus on building digital solutions that are reliable, scalable, and tailored to your needs.    </p>

                    <CountUp end={95} duration={3} className="text-fuchsia-500">
                        %
                    </CountUp>
                    <p className="font-bold">Many satisfied customers choose to work with me again.</p>
                    <ul>
                        <li>✔ Modern technologies (Laravel, WordPress, React)</li>
                        <li>✔ Custom solutions for your business</li>
                        <li>✔ Fast communication and support</li>
                        <li>✔ Scalable systems for future growth</li>
                    </ul>
                    <p className="font-bold">Our goal is to help businesses grow online with technology that works.</p>
                </div>
                <Categories initialTime={initialTime} />

                <Features />

                <PricingPlans />
                <CallToAction />
            </SiteLayout>
        </div>
    );
}
