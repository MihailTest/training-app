
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { ChevronDown } from 'lucide-react';

const accordionData = [
  { id: 1, title: 'What is UI Practice Hub?', content: 'UI Practice Hub is a comprehensive platform for practicing UI automation and testing with real-world scenarios.' },
  { id: 2, title: 'Why practice UI testing?', content: 'Practicing UI testing helps you master automation tools, understand common patterns, and build confidence in handling complex scenarios.' },
  { id: 3, title: 'What technologies are used?', content: 'This application is built with React, TailwindCSS, and follows web accessibility standards with proper ARIA attributes.' }
];

export default function AccordionPage() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Accordion - UI Practice Hub</title>
        <meta name="description" content="Practice accordion expand/collapse interactions" />
      </Helmet>

      <PageHeader title="Accordion" subtitle="Practice expand and collapse interactions" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-accordion-container">
        <div className="bg-card border rounded-lg p-6">
          <div className="space-y-2">
            {accordionData.map(item => (
              <div key={item.id} className="border rounded-lg" data-testid={`accordion-item-${item.id}`}>
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-accent transition-colors"
                  aria-expanded={openId === item.id}
                  aria-controls={`content-${item.id}`}
                  data-testid={`accordion-header-${item.id}`}
                >
                  <span className="font-medium">{item.title}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openId === item.id ? 'rotate-180' : ''}`} />
                </button>
                {openId === item.id && (
                  <div id={`content-${item.id}`} className="p-4 pt-0 text-muted-foreground" data-testid={`accordion-content-${item.id}`}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <ResultPanel title="Active Section">
          {openId ? (
            <p data-testid="text-accordion-state">Section {openId} is open</p>
          ) : (
            <p className="text-muted-foreground" data-testid="text-accordion-state">No section is open</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
