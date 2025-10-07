// 'use client';

import CountUp from '@/components/countup';
import PricingPlans from '@/components/pricingplans';
import SiteLayout from '@/layouts/site-layout copy';
import Categories from './partials/Categories';
import Features from './partials/Features';
import HeroSection from './partials/HeroSection';
import WebProducts from './partials/WebProducts';
import CallToAction from '@/components/callToAction';

export default function Welcome({ services, initialTime }) {
    return (
        <div className="bg-white">
            <SiteLayout title="Welcome">
                <HeroSection />
                <WebProducts services={services} />
                <Categories initialTime={initialTime} />
                <Features />
                <div className="mx-auto my-8 flex w-2/3 flex-col gap-2 text-center">
                    <h1 className="">PRIJSPLANNEN</h1>
                    <h2 className="text-4xl font-bold">De beste oplossingen voor onze klanten</h2>
                    <p>
                        De onderstaande prijsplannen gelden voor <b> WordPress-websites </b>. Heb je een complexere wens of wil je een op maat
                        gemaakte webapplicatie <b>(bijvoorbeeld met Laravel) </b>? Dan maak ik graag een aparte offerte, afgestemd op jouw project,
                        doelen en budget.
                    </p>
                </div>
                <PricingPlans />

                <div className="mx-auto my-8 flex w-2/3 flex-col gap-2 text-center">
                    <h2 className="text-4xl font-bold">Waarom kiezen ondernemers voor Tahanina?</h2>
                    <p>
                        Als ondernemer wil je een professionele website die niet alleen goed werkt, maar ook jouw merk tot leven brengt. Bij Tahanina
                        krijg je geen standaardoplossing, maar een persoonlijke aanpak die echt bij jouw bedrijf past.
                    </p>
                 
                    <CountUp end={95} duration={3} className="text-fuchsia-500" >%</CountUp>
                    <p className='font-bold'>Veel tevreden klanten kiezen ervoor om opnieuw met mij samen te werken.</p>
                </div>
                <CallToAction />
            </SiteLayout>
        </div>
    );
}
