
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function SelectablePage() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
  const [selected, setSelected] = useState([]);

  const toggleItem = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <>
      <Helmet><title>Selectable - UI Practice Hub</title></Helmet>
      <PageHeader title="Selectable" subtitle="Practice multi-select interactions" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-selectable-container">
        <ControlPanel title="Selectable List">
          <div role="listbox" aria-multiselectable="true" className="space-y-2" data-testid="selectable-list">
            {items.map(item => (
              <div
                key={item}
                role="option"
                aria-selected={selected.includes(item)}
                onClick={() => toggleItem(item)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selected.includes(item) ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
                data-testid={`item-selectable-${item.toLowerCase().replace(' ', '-')}`}
              >
                {item}
              </div>
            ))}
          </div>
          <Button onClick={() => setSelected([])} variant="outline" className="mt-4" data-testid="button-clear-selection">Clear Selection</Button>
        </ControlPanel>

        <ResultPanel title="Selected Items">
          {selected.length > 0 ? (
            <ul className="list-disc list-inside space-y-1" data-testid="result-panel-selected">
              {selected.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-selection">No items selected</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
