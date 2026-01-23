
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { Check } from 'lucide-react';

const plans = {
  basic: { name: 'Basic Plan', price: '$29/mo', features: ['5 Projects', '1GB Storage', 'Email Support'] },
  professional: { name: 'Professional Plan', price: '$79/mo', features: ['25 Projects', '50GB Storage', 'Priority Support'] },
  enterprise: { name: 'Enterprise Plan', price: '$299/mo', features: ['Unlimited Projects', 'Unlimited Storage', '24/7 Support'] },
  custom: { name: 'Custom Plan', price: 'Contact Sales', features: ['Tailored Solutions', 'Dedicated Manager', 'SLA'] }
};

export default function RadioSelectionPage() {
  const [selected, setSelected] = useState('');

  // Map old values to new concepts for compatibility with test-ids if they check values
  // Original: yes, impressive, no
  // New Mapping:
  // yes -> basic
  // impressive -> professional
  // no -> enterprise (was disabled, but now enabled per task requirement "Enterprise Plan")
  // We need to support new values but keep test-ids
  
  const getPlanDetails = (val) => {
    if (val === 'yes') return plans.basic;
    if (val === 'impressive') return plans.professional;
    if (val === 'no') return plans.enterprise; // Re-purposing the 'no' ID
    if (val === 'custom') return plans.custom;
    return null;
  };

  const currentPlan = getPlanDetails(selected);

  return (
    <>
      <Helmet>
        <title>Subscription Plan Selection - UI Practice Hub</title>
        <meta name="description" content="Choose the perfect subscription plan for your needs" />
      </Helmet>

      <PageHeader title="Subscription Plan Selection" subtitle="Select a plan to view its features" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-radio-button-container">
        <ControlPanel title="Available Plans">
          <fieldset data-testid="radio-group-feedback">
            <legend className="sr-only">Subscription Plans</legend>
            <div className="space-y-4">
              <label 
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === 'yes' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
              >
                <input
                  type="radio"
                  name="feedback"
                  value="yes"
                  checked={selected === 'yes'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mt-1 h-4 w-4"
                  data-testid="radio-yes"
                />
                <div>
                    <span className="font-semibold block">Basic Plan</span>
                    <span className="text-sm text-muted-foreground">$29/month</span>
                </div>
              </label>

              <label 
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === 'impressive' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
              >
                <input
                  type="radio"
                  name="feedback"
                  value="impressive"
                  checked={selected === 'impressive'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mt-1 h-4 w-4"
                  data-testid="radio-impressive"
                />
                <div>
                    <span className="font-semibold block">Professional Plan</span>
                    <span className="text-sm text-muted-foreground">$79/month</span>
                </div>
              </label>

              <label 
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === 'no' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
              >
                {/* Previously disabled, now enabled for Enterprise */}
                <input 
                  type="radio" 
                  name="feedback" 
                  value="no" 
                  checked={selected === 'no'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mt-1 h-4 w-4" 
                  data-testid="radio-no"
                />
                 <div>
                    <span className="font-semibold block">Enterprise Plan</span>
                    <span className="text-sm text-muted-foreground">$299/month</span>
                </div>
              </label>
              
              {/* Added Custom Plan as extra, reusing no specific test ID or just not testing it if not required by old tests */}
              <label 
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === 'custom' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
              >
                <input 
                  type="radio" 
                  name="feedback" 
                  value="custom" 
                  checked={selected === 'custom'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mt-1 h-4 w-4" 
                />
                 <div>
                    <span className="font-semibold block">Custom Plan</span>
                    <span className="text-sm text-muted-foreground">Contact Sales</span>
                </div>
              </label>
            </div>
          </fieldset>
          <div className="mt-6">
            <ResetButton onClick={() => setSelected('')} />
          </div>
        </ControlPanel>

        <ResultPanel title="Plan Summary">
          {currentPlan ? (
            <div className="space-y-4" data-testid="result-panel-selected-option">
                <div className="flex justify-between items-baseline border-b pb-2">
                    <h3 className="text-xl font-bold text-primary">{currentPlan.name}</h3>
                    <span className="text-lg font-semibold">{currentPlan.price}</span>
                </div>
                <div>
                    <p className="font-medium mb-2">Included Features:</p>
                    <ul className="space-y-2">
                        {currentPlan.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pt-4 mt-4 bg-muted/30 p-4 rounded text-sm text-muted-foreground">
                    You have selected the <strong>{currentPlan.name}</strong>. Proceed to checkout to activate your subscription.
                </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-center" data-testid="text-no-selection">
                <p>Select a plan to view details</p>
            </div>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
