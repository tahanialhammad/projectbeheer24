import SiteLayout from '@/layouts/site-layout';
import Accordion from '@/components/ui/Accordion';
import { useState } from 'react';
import { Document } from '@contentful/rich-text-types';

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
      <h1 className="mb-6 text-2xl font-semibold">Veelgestelde vragen</h1>

      {faqGroups.map((group, i) => (
        <div key={i} className="mb-6">
          <h2 className="mb-2 text-lg font-bold">{group.title}</h2>
          <Accordion
            groupId={i}
            items={group.faqs}
            active={active}
            setActive={setActive}
          />
        </div>
      ))}
    </SiteLayout>
  );
}
