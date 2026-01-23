
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { ChevronDown, HelpCircle, CreditCard, Wrench, User } from 'lucide-react';

const faqData = [
  { 
    id: 1, 
    category: 'Getting Started',
    icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
    questions: [
        { q: 'How to create an account?', a: 'Click the Sign Up button on the top right and follow the instructions.' },
        { q: 'How to set up profile?', a: 'Go to Settings > Profile to update your personal information.' },
        { q: 'How to start first project?', a: 'Click "New Project" from the dashboard to begin.' }
    ]
  },
  { 
    id: 2, 
    category: 'Billing',
    icon: <CreditCard className="h-5 w-5 text-green-500" />,
    questions: [
        { q: 'How to update payment method?', a: 'Navigate to Billing settings and click "Update Card".' },
        { q: 'What payment methods accepted?', a: 'We accept Visa, Mastercard, Amex, and PayPal.' },
        { q: 'How to cancel subscription?', a: 'You can cancel anytime from the Billing tab.' }
    ]
  },
  { 
    id: 3, 
    category: 'Technical Support',
    icon: <Wrench className="h-5 w-5 text-orange-500" />,
    questions: [
        { q: 'How to report a bug?', a: 'Use the feedback form or email support@example.com.' },
        { q: 'How to request a feature?', a: 'Post your request in our community forum.' },
        { q: 'How to contact support?', a: 'Live chat is available 24/7 for premium users.' }
    ]
  },
  { 
    id: 4, 
    category: 'Account Management',
    icon: <User className="h-5 w-5 text-purple-500" />,
    questions: [
        { q: 'How to change password?', a: 'Security settings allow you to change your password.' },
        { q: 'How to enable 2FA?', a: 'Two-factor authentication can be enabled in Security tab.' },
        { q: 'How to delete account?', a: 'Please contact support to permanently delete your account.' }
    ]
  }
];

export default function CollapsibleSectionsPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions - UI Practice Hub</title>
        <meta name="description" content="Find answers to common questions" />
      </Helmet>

      <PageHeader title="FAQ - Frequently Asked Questions" subtitle="Find answers to common questions" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-accordion-container">
        <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg">Categories</h3>
          <div className="space-y-3">
            {faqData.map(section => (
              <div key={section.id} className="border rounded-lg overflow-hidden" data-testid={`accordion-item-${section.id}`}>
                <button
                  onClick={() => toggle(section.id)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-colors ${openSection === section.id ? 'bg-accent/50' : 'hover:bg-accent'}`}
                  aria-expanded={openSection === section.id}
                  data-testid={`accordion-header-${section.id}`}
                >
                  <div className="flex items-center gap-3">
                      {section.icon}
                      <span className="font-medium">{section.category}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${openSection === section.id ? 'rotate-180' : ''}`} />
                </button>
                {openSection === section.id && (
                  <div className="p-4 bg-muted/20 border-t space-y-4 animate-in slide-in-from-top-2" data-testid={`accordion-content-${section.id}`}>
                    {section.questions.map((qa, i) => (
                        <div key={i} className="space-y-1">
                            <p className="font-medium text-sm text-foreground">{qa.q}</p>
                            <p className="text-sm text-muted-foreground">{qa.a}</p>
                        </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <ResultPanel title="FAQ Status">
          {openSection ? (
            <div className="space-y-2" data-testid="text-accordion-state">
                <p>Viewing category: <span className="font-bold text-primary">{faqData.find(s => s.id === openSection)?.category}</span></p>
                <p className="text-sm text-muted-foreground">Contains {faqData.find(s => s.id === openSection)?.questions.length} questions.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <HelpCircle className="h-10 w-10 mb-2 opacity-20" />
                <p data-testid="text-accordion-state">Select a category to view questions</p>
            </div>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
