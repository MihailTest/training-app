
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export default function TooltipsPage() {
  return (
    <>
      <Helmet><title>Tool Tips - UI Practice Hub</title></Helmet>
      <PageHeader title="Tool Tips" subtitle="Practice tooltip interactions" />
      <div className="bg-card border rounded-lg p-6 space-y-6" data-testid="page-tooltips-container">
        <div>
          <Button title="Click me for action" className="hover:opacity-90" data-testid="button-tooltip-trigger">
            Hover for Tooltip
          </Button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            title="Enter your name here"
            className="px-3 py-2 border rounded-lg bg-background text-foreground"
            data-testid="input-tooltip-trigger"
          />
        </div>
        <div>
          <Info className="h-6 w-6 text-primary" title="Information icon" data-testid="icon-tooltip-trigger" />
        </div>
      </div>
    </>
  );
}
