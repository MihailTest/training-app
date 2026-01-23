
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function DroppablePage() {
  const [zone, setZone] = useState(null);
  const [history, setHistory] = useState([]);

  const moveTo = (zoneName) => {
    setZone(zoneName);
    setHistory(prev => [...prev, `${new Date().toLocaleTimeString()}: Moved to ${zoneName}`]);
  };

  return (
    <>
      <Helmet><title>Droppable - UI Practice Hub</title></Helmet>
      <PageHeader title="Droppable" subtitle="Practice drag and drop interactions" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-droppable-container">
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg text-center font-medium" data-testid="item-draggable">
            Drag Me
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`p-8 border-2 border-dashed rounded-lg text-center ${zone === 'Zone A' ? 'bg-green-500/10 border-green-500' : ''}`}
              data-testid="zone-a"
            >
              <p className="font-medium mb-2">Zone A</p>
              <Button size="sm" onClick={() => moveTo('Zone A')} data-testid="button-drop-a">Move Here</Button>
            </div>
            <div 
              className={`p-8 border-2 border-dashed rounded-lg text-center ${zone === 'Zone B' ? 'bg-blue-500/10 border-blue-500' : ''}`}
              data-testid="zone-b"
            >
              <p className="font-medium mb-2">Zone B</p>
              <Button size="sm" onClick={() => moveTo('Zone B')} data-testid="button-drop-b">Move Here</Button>
            </div>
          </div>
        </div>

        <ResultPanel title="Drop History">
          {history.length > 0 ? (
            <ul className="space-y-1" data-testid="result-panel-history">
              {history.map((entry, i) => (
                <li key={i} className="text-sm">{entry}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-history">No drops yet</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
