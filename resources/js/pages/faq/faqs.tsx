import HeroSection from '@/components/HeroSection';
import Accordion from '@/components/ui/Accordion';
import SiteLayout from '@/layouts/site-layout';
import { Document } from '@contentful/rich-text-types';
import { useState } from 'react';

type Props = {
    faqGroups: {
        title: string;
        faqs: {
            question: string;
            answer: Document;
        }[];
    }[];
};

export default function Faqs({ faqGroups }: Props) {
    const [active, setActive] = useState<{ groupId: number; index: number } | null>(null);

    return (
        <SiteLayout title="FAQ's">
            <HeroSection title="Frequently Asked Questions " />

            {faqGroups.map((group, i) => (
                <div key={i} className="mb-6 border-b-2 border-fuchsia-300">
                    <h2 className="mb-2 text-lg font-bold">{group.title}</h2>
                    <Accordion groupId={i} items={group.faqs} active={active} setActive={setActive} />
                </div>
            ))}
        </SiteLayout>
    );
}
