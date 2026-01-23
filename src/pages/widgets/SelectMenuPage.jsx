
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';

const countries = ['USA', 'UK', 'Canada', 'Australia'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

export default function SelectMenuPage() {
  const [country, setCountry] = useState('');
  const [selectedLangs, setSelectedLangs] = useState([]);

  const handleReset = () => {
    setCountry('');
    setSelectedLangs([]);
  };

  return (
    <>
      <Helmet><title>Select Menu - UI Practice Hub</title></Helmet>
      <PageHeader title="Select Menu" subtitle="Practice select dropdown interactions" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-select-menu-container">
        <ControlPanel title="Select Controls">
          <div className="space-y-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">Select Country</label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="select-country"
              >
                <option value="">Choose a country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="languages" className="block text-sm font-medium mb-2">Select Languages (Multiple)</label>
              <select
                id="languages"
                multiple
                value={selectedLangs}
                onChange={(e) => setSelectedLangs(Array.from(e.target.selectedOptions, opt => opt.value))}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                size={5}
                data-testid="select-languages"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <ResetButton onClick={handleReset} />
          </div>
        </ControlPanel>

        <ResultPanel title="Selected Values">
          <div className="space-y-2" data-testid="result-panel-selected-values">
            <p><strong>Country:</strong> {country || 'None'}</p>
            <p><strong>Languages:</strong> {selectedLangs.length > 0 ? selectedLangs.join(', ') : 'None'}</p>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
