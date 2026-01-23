
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';

const subjects = ['Maths', 'English', 'Computer Science', 'Physics', 'Chemistry'];
const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink'];

export default function AutoCompletePage() {
  const [singleValue, setSingleValue] = useState('');
  const [multiValues, setMultiValues] = useState([]);

  const handleMultiSelect = (value) => {
    if (multiValues.includes(value)) {
      setMultiValues(prev => prev.filter(v => v !== value));
    } else {
      setMultiValues(prev => [...prev, value]);
    }
  };

  return (
    <>
      <Helmet><title>Auto Complete - UI Practice Hub</title></Helmet>
      <PageHeader title="Auto Complete" subtitle="Practice autocomplete selection" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-autocomplete-container">
        <ControlPanel title="Autocomplete Inputs">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Single Select - Subjects</label>
              <select
                value={singleValue}
                onChange={(e) => setSingleValue(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="select-single-subject"
              >
                <option value="">Select a subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Multi Select - Colors</label>
              <div className="space-y-2">
                {colors.map(color => (
                  <label key={color} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={multiValues.includes(color)}
                      onChange={() => handleMultiSelect(color)}
                      className="h-4 w-4"
                      data-testid={`checkbox-color-${color.toLowerCase()}`}
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Selected Values">
          <div className="space-y-4" data-testid="result-panel-autocomplete-selection">
            <div>
              <p className="text-sm font-medium">Single: {singleValue || 'None'}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Multi:</p>
              {multiValues.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {multiValues.map(v => (
                    <span key={v} className="px-2 py-1 bg-primary/10 rounded text-sm">{v}</span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">None</p>
              )}
            </div>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
