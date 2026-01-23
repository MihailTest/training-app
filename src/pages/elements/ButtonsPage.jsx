
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function ButtonsPage() {
  const [messages, setMessages] = useState([]);

  const addMessage = (msg) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  return (
    <>
      <Helmet>
        <title>Buttons - UI Practice Hub</title>
        <meta name="description" content="Practice different button click events" />
      </Helmet>

      <PageHeader title="Buttons" subtitle="Practice different types of button clicks" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-buttons-container">
        <ControlPanel title="Button Actions">
          <div className="space-y-4">
            <Button onDoubleClick={() => addMessage('Double Click detected')} data-testid="button-double-click">
              Double Click Me
            </Button>
            <Button onContextMenu={(e) => { e.preventDefault(); addMessage('Right Click detected'); }} data-testid="button-right-click">
              Right Click Me
            </Button>
            <Button onClick={() => addMessage('Single Click detected')} data-testid="button-dynamic-click">
              Click Me
            </Button>
          </div>
        </ControlPanel>

        <ResultPanel title="Click Events">
          {messages.length > 0 ? (
            <ul className="space-y-1" data-testid="result-panel-messages">
              {messages.map((msg, i) => (
                <li key={i} className="text-sm" data-testid={`message-${i}`}>{msg}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-events">No clicks detected</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
