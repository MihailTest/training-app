
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function SortablePage() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

  const moveUp = (index) => {
    if (index > 0) {
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setItems(newItems);
    }
  };

  const moveDown = (index) => {
    if (index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setItems(newItems);
    }
  };

  return (
    <>
      <Helmet><title>Sortable - UI Practice Hub</title></Helmet>
      <PageHeader title="Sortable" subtitle="Practice list reordering" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-sortable-container">
        <ControlPanel title="Sortable List">
          <ul className="space-y-2" data-testid="sortable-list">
            {items.map((item, index) => (
              <li key={item} className="flex items-center justify-between p-3 bg-muted rounded-lg" data-testid={`list-item-${index}`}>
                <span>{item}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => moveUp(index)} disabled={index === 0} data-testid={`button-up-${index}`}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => moveDown(index)} disabled={index === items.length - 1} data-testid={`button-down-${index}`}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </ControlPanel>

        <ResultPanel title="Current Order">
          <ol className="list-decimal list-inside space-y-1" data-testid="result-panel-order">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </ResultPanel>
      </div>
    </>
  );
}
