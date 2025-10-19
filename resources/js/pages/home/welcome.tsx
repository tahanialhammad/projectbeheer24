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
                <Categories initialTime={initialTime} />
                <Features />
                <div className="mx-auto my-8 flex w-2/3 flex-col gap-2 text-center">
                    <h1 className="">PRICING PLANS</h1>
                    <h2 className="text-4xl font-bold">The best solutions for our customers</h2>
                    <p>
                        The pricing plans below are for WordPress websites. Do you have a more complex request or would you like a custom-built web
                        application <b>(for example, with Laravel)</b>? Then I'd be happy to create a separate quote tailored to your project, goals,
                        and budget.
                    </p>
                </div>
                <PricingPlans />

                <div className="mx-auto my-8 flex w-2/3 flex-col gap-2 text-center">
                    <h2 className="text-4xl font-bold">Why do entrepreneurs choose Tahanina?</h2>
                    <p>
                        As an entrepreneur, you want a professional website that not only works well but also brings your brand to life. At Tahanina,
                        you don't get a standard solution, but a personalized approach that truly suits your business.
                    </p>

                    <CountUp end={95} duration={3} className="text-fuchsia-500">
                        %
                    </CountUp>
                    <p className="font-bold">Many satisfied customers choose to work with me again.</p>
                </div>
                <CallToAction />
            </SiteLayout>
        </div>
    );
}
