import SiteLayout from '@/layouts/site-layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types'; //handig voot typescript inplats van answer: any;
type Props = {
    faqGroups: {
        title: string;
        faqs: {
            question: string;
            answer: Document; // rich text JSON
        }[];
    }[];
};

export default function Faqs({ faqGroups }: Props) {
    return (
        <SiteLayout title="FAQ's">
            <h1 className="mb-6 text-2xl font-semibold">Veelgestelde vragen</h1>

            {faqGroups.map((group, i) => (
                <div key={i} className="mb-6">
                    <h2 className="mb-2 text-lg font-bold">{group.title}</h2>
                    {group.faqs.map((faq, j) => (
                        <div key={j} className="mb-4">
                            <strong>{faq.question}</strong>
                            <div>{documentToReactComponents(faq.answer)}</div>
                        </div>
                    ))}
                </div>
            ))}
        </SiteLayout>
    );
}
