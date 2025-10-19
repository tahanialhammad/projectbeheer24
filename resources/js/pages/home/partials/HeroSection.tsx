import AnimatedWrapper from '@/components/AnimatedWrapper';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';

export default function HeroSection({ sliderImages }) {
    return (
        <section>
            {/* hero section*/}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 900 }}
                        transition={{
                            duration: 7.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    ></motion.div>
                </div>

                <div className="mb-8 flex w-full items-center justify-center">
                    <div className="max-w-[50vw] text-center">
                        <h1 className="text-8xl">Modernize your business</h1>
                        <div className="my-4 flex justify-center gap-2">
                            <PrimaryButton href={route('contact')}>Contact Us</PrimaryButton>
                            <SecondaryButton>Discover prices</SecondaryButton>{' '}
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-8">
                    <AnimatedWrapper className="relative w-2/5 rounded-3xl bg-fuchsia-200 p-4">
                        <img src=".\images\56FFDEB.png" alt="" className="rounded-3xl" />
                        <div className="mb-4tt absolute inset-0 rounded-3xl bg-gradient-to-t from-indigo-200 via-transparent"></div>
                        <div className="absolute top-2/3 w-full text-center">
                            <h4 className="text-xl font-bold text-fuchsia-800 uppercase">Freelance </h4>
                            <h1 className="text-3xl font-black capitalize">web developer </h1>
                            <h3 className="text-2xl capitalize">From Groningen</h3>
                            <PrimaryButton href={route('contact')} className="mt-4">
                                Make an appointment{' '}
                            </PrimaryButton>
                        </div>
                    </AnimatedWrapper>
                    <div className="flex w-3/5 flex-col gap-8">
                        <AnimatedWrapper className="relative rounded-3xl">
                            {/* <img className="rounded-3xl" src=".\images\119567.jpg" alt="" />
                            <div className="absolute top-1/3 right-4 m-4">
                                <h4 className="text-xl font-bold text-indigo-500 uppercase"> 25% korting </h4>
                                <h1 className="text-3xl font-black capitalize">Jaarcontract</h1>
                                <h3 className="text-2xl capitalize">Met professionele Services</h3>
                                <PrimaryButton className="mt-4">Bekijk Aanbieding</PrimaryButton>
                            </div> */}
                            <ImageCarousel images={sliderImages} />
                        </AnimatedWrapper>

                        <AnimatedWrapper className="relative">
                            <img className="rounded-3xl" src=".\images\7073.jpg" alt="" />
                            <div className="absolute top-1/3 left-4 m-4">
                                <h4 className="text-xl font-bold text-indigo-500 uppercase">Trendtech</h4>
                                <h1 className="text-3xl font-black capitalize">Customization & Innovation</h1>{' '}
                                <h3 className="text-2xl capitalize">fashion on fleek</h3>
                                <SecondaryButton className="mt-4">View Services</SecondaryButton>{' '}
                            </div>
                        </AnimatedWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
