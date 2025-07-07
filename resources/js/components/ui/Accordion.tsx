// Alleen eigen useState logica , werkt goed 
'use client';

import { ChevronDown } from 'lucide-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

type FaqItem = {
  question: string;
  answer: Document;
};

type Props = {
  groupId: number;
  items: FaqItem[];
  active: { groupId: number; index: number } | null;
  setActive: (value: { groupId: number; index: number } | null) => void;
};

export default function Accordion({ groupId, items, active, setActive }: Props) {
  const isOpen = (index: number) =>
    active?.groupId === groupId && active.index === index;

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="mb-2 border-b pb-2">
          <button
            className="flex w-full items-center justify-between text-left font-bold"
            onClick={() =>
              isOpen(index)
                ? setActive(null)
                : setActive({ groupId, index })
            }
          >
            <span>{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen(index) ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen(index) && (
            <div className="mt-2 text-gray-700">
              {documentToReactComponents(item.answer)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
