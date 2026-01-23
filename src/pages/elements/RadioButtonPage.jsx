
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';

export default function RadioButtonPage() {
  const [selected, setSelected] = useState('');

  return (
    <>
      <Helmet>
        <title>Radio Button - UI Practice Hub</title>
        <meta name="description" content="Practice radio button selection" />
      </Helmet>

      <PageHeader title="Radio Button" subtitle="Practice radio button interactions" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-radio-button-container">
        <ControlPanel>
          <fieldset data-testid="radio-group-feedback">
            <legend className="text-lg font-semibold mb-4">Do you like this UI?</legend>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="feedback"
                  value="yes"
                  checked={selected === 'yes'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="h-4 w-4"
                  data-testid="radio-yes"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="feedback"
                  value="impressive"
                  checked={selected === 'impressive'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="h-4 w-4"
                  data-testid="radio-impressive"
                />
                <span>Impressive</span>
              </label>
              <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
                <input 
                  type="radio" 
                  name="feedback" 
                  value="no" 
                  disabled 
                  className="h-4 w-4" 
                  data-testid="radio-no"
                />
                <span>No</span>
              </label>
            </div>
          </fieldset>
          <ResetButton onClick={() => setSelected('')} />
        </ControlPanel>

        <ResultPanel>
          {selected ? (
            <p data-testid="result-panel-selected-option">You selected: <strong>{selected}</strong></p>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-selection">No selection made</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
