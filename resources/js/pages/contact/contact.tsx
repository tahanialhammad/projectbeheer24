import HeroSection from '@/components/HeroSection';
import SiteLayout from '@/layouts/site-layout';
import { Mail, MapPin, Smartphone } from 'lucide-react';

export default function Contact() {
    return (
        <SiteLayout title="Contact">
            <HeroSection title="Laten we het hebben over Jouw geweldige project" />

            <section className="mx-auto my-8 max-w-6xl rounded-xl bg-fuchsia-400/20 px-6 py-12 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center p-6 text-center">
                        <MapPin size={32} className="text-fuchsia-600" />
                        <h3 className="mb-2 text-xl font-semibold">Working area</h3>
                        <p className="text-neutral-600">
                            The Netherlands <br />
                            Groningen and surroundings
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-6 text-center">
                        <Mail size={32} className="text-fuchsia-600" />
                        <h3 className="mb-2 text-xl font-semibold">Email address</h3>
                        <a href="mailto:info@tahanina.nl" className="text-neutral-600">
                            info@tahanina.nl
                        </a>
                    </div>

                    <div className="flex flex-col items-center p-6 text-center">
                        <Smartphone size={32} className="text-fuchsia-600" />
                        <h3 className="mb-2 text-xl font-semibold">Phone numbers</h3>
                        <p className="text-neutral-600">
                            <a href="tel:+31621942804" className="hover:underline">
                                06 219 428 04
                            </a>
                            <br />
                            Monday to Friday from 12:00 to 17:00{' '}
                        </p>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2">
                {/* Linker kolom */}
                <div className="relative h-80 w-full">
                    <img src="./images/blonde-influencer-using-laptop.jpg" alt="Over Tahanina" className="rounded-xl object-cover shadow-2xl" />
                </div>
                {/* Rechter kolom */}
                <div className="">contact form</div>
            </div>
        </SiteLayout>
    );
}
