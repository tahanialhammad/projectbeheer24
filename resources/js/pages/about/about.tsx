import HeroSection from '@/components/HeroSection';
import SiteLayout from '@/layouts/site-layout';

export default function About() {
    return (
        <SiteLayout title="About">
            <HeroSection title="Hi, ik ben Tahani" />
            <div className="grid grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2">
                {/* Linker kolom */}
                <div className="">
                    <h2 className="mb-4 text-xl font-bold">Freelance web developer and founder of Tahanina</h2>
                    <p>
                        I build websites and web applications that not only work, but also speak volumes. From my Groningen office, I help
                        entrepreneurs with everything from WordPress to custom Laravel software.
                    </p>
                </div>

                {/* Rechter kolom */}
                <div className="rounded-lg">
                    <img src="./images//tahanina.png" alt="about tahanina" className="my-4 rounded-xl object-cover shadow-2xl" />
                </div>
            </div>

            <section className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h3 className="mb-2 text-xl font-semibold">Clear communication </h3>
                        <p className="text-neutral-600">
                            From the start, you'll know what to expect – I'll explain everything clearly, without jargon.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <h3 className="mb-2 text-xl font-semibold">Cooperation</h3>
                        <p className="text-neutral-600">
                            I actively collaborate with you and make decisions in consultation – we truly create the end result together.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <h3 className="mb-2 text-xl font-semibold">Clear prices</h3>
                        <p className="text-neutral-600">
                            No hidden costs – you always receive a transparent quote upfront, so you know exactly what to expect.
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2">
                {/* Linker kolom */}
                <div className="relative h-80 w-full">
                    <img
                        src="./images/man-uses-laptop-closeup-male-hands-neon-lighting.jpg"
                        alt="Over Tahanina"
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Rechter kolom */}
                <div className="p-6">
                    <h2 className="mb-4 text-xl font-bold">Why Tahanina?</h2>
                    <p>
                        Tahanina is an Arabic expression meaning "congratulations." It comes from my first name, Tahani, and reflects my mission:
                        contributing to positive results and growth for my clients.
                        <br />
                        This name suits my identity and my desire to bring a bit of joy and success with every website or app.
                    </p>
                </div>
            </div>
        </SiteLayout>
    );
}
