
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function AlertsPage() {
  const [result, setResult] = useState('');

  return (
    <>
      <Helmet><title>Alerts - UI Practice Hub</title></Helmet>
      <PageHeader title="Alerts" subtitle="Practice browser alert dialogs" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-alerts-container">
        <ControlPanel title="Alert Types">
          <div className="space-y-3">
            <Button onClick={() => { window.alert('This is an alert!'); setResult('Alert shown'); }} className="w-full" data-testid="button-alert-simple">
              Show Alert
            </Button>
            <Button onClick={() => { const r = window.confirm('Do you confirm?'); setResult(r ? 'Confirmed' : 'Cancelled'); }} className="w-full" data-testid="button-alert-confirm">
              Show Confirm
            </Button>
            <Button onClick={() => { const r = window.prompt('Enter your name:'); setResult(r ? `Entered: ${r}` : 'Cancelled'); }} className="w-full" data-testid="button-alert-prompt">
              Show Prompt
            </Button>
          </div>
        </ControlPanel>
        <ResultPanel title="Alert Result">
          <div data-testid="result-panel-alert-response">
             {result || 'No alerts triggered yet'}
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
