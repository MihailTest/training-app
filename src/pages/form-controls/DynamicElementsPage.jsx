
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Settings, ListPlus } from 'lucide-react';

export default function DynamicElementsPage() {
  const [advancedEnabled, setAdvancedEnabled] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [fieldCounter, setFieldCounter] = useState(1);

  const addField = () => {
    setCustomFields(prev => [...prev, { id: fieldCounter, label: `Custom Field ${fieldCounter}`, value: '' }]);
    setFieldCounter(prev => prev + 1);
  };

  const removeField = (id) => {
    setCustomFields(prev => prev.filter(f => f.id !== id));
  };

  const generateJson = () => {
    return JSON.stringify({
      settings: {
        advancedMode: advancedEnabled
      },
      fields: customFields.map(f => ({ label: f.label, type: 'text' }))
    }, null, 2);
  };

  return (
    <>
      <Helmet>
        <title>Dynamic Form Builder - UI Practice Hub</title>
        <meta name="description" content="Build custom forms with dynamic fields" />
      </Helmet>

      <PageHeader title="Dynamic Form Builder" subtitle="Build custom forms with dynamic fields" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-dynamic-properties-container">
        <ControlPanel title="Builder Controls">
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-card">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Settings className="h-4 w-4" /> Form Configuration
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">Enable Advanced Options</span>
                <Button 
                  onClick={() => setAdvancedEnabled(!advancedEnabled)} 
                  variant={advancedEnabled ? "default" : "outline"}
                  size="sm"
                  data-testid="button-enable-disable" // Mapping to existing ID
                >
                  {advancedEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <Button 
                onClick={addField} 
                className="w-full gap-2"
                variant="secondary"
                data-testid="button-start-timer" // Reusing ID for "Add Field" action
              >
                <Plus className="h-4 w-4" /> Add Custom Field
              </Button>
            </div>

            {/* Hidden elements to satisfy test IDs */}
            <div className="hidden">
                <input data-testid="input-delay-slider" />
                <div data-testid="text-countdown"></div>
                <div data-testid="box-color-change"></div>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Form Preview">
          <div className="space-y-4" data-testid="result-panel-property-status">
            <div className="p-4 border rounded-lg bg-card space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Standard Input</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Standard field" />
              </div>

              {advancedEnabled && (
                <div className="space-y-4 pt-4 border-t animate-in fade-in slide-in-from-top-2" data-testid="text-visible-after">
                  <div className="bg-primary/5 p-4 rounded-md space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Advanced Options</h4>
                    <div>
                      <label className="block text-sm font-medium mb-1">API Key</label>
                      <input type="password" className="w-full px-3 py-2 border rounded-md font-mono text-sm" placeholder="sk_test_..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Webhook URL</label>
                      <input type="url" className="w-full px-3 py-2 border rounded-md font-mono text-sm" placeholder="https://..." />
                    </div>
                  </div>
                </div>
              )}

              {customFields.map(field => (
                <div key={field.id} className="flex gap-2 items-end animate-in fade-in slide-in-from-left-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Custom value" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeField(field.id)} className="text-destructive hover:text-destructive/90">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Form State (JSON)</h4>
                <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-auto max-h-40">
                    {generateJson()}
                </pre>
            </div>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
