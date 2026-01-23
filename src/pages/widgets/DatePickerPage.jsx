
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';

export default function DatePickerPage() {
  const [date, setDate] = useState('');
  const [datetime, setDatetime] = useState('');

  return (
    <>
      <Helmet><title>Date Picker - UI Practice Hub</title></Helmet>
      <PageHeader title="Date Picker" subtitle="Practice date and time selection" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-date-picker-container">
        <ControlPanel title="Date Inputs">
          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="input-date"
              />
            </div>
            <div>
              <label htmlFor="datetime" className="block text-sm font-medium mb-2">Select Date & Time</label>
              <input
                type="datetime-local"
                id="datetime"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="input-datetime"
              />
            </div>
            <ResetButton onClick={() => { setDate(''); setDatetime(''); }} />
          </div>
        </ControlPanel>

        <ResultPanel title="Selected Values">
          <div className="space-y-2" data-testid="result-panel-selected-date">
            <p><strong>Date:</strong> {date || 'Not selected'}</p>
            <p><strong>Date & Time:</strong> {datetime || 'Not selected'}</p>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
