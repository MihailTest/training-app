
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function MenuPage() {
  const [actions, setActions] = useState([]);

  const handleAction = (action) => {
    setActions(prev => [...prev, `${new Date().toLocaleTimeString()}: ${action}`]);
  };

  return (
    <>
      <Helmet><title>Menu - UI Practice Hub</title></Helmet>
      <PageHeader title="Menu" subtitle="Practice menu navigation" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-menu-container">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative group">
              <Button variant="outline" data-testid="button-menu-file">File</Button>
              <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-card border rounded-lg shadow-lg min-w-[150px]" data-testid="submenu-file">
                <button onClick={() => handleAction('New')} className="block w-full text-left px-4 py-2 hover:bg-accent" data-testid="menu-item-new">New</button>
                <button onClick={() => handleAction('Open')} className="block w-full text-left px-4 py-2 hover:bg-accent" data-testid="menu-item-open">Open</button>
                <button onClick={() => handleAction('Save')} className="block w-full text-left px-4 py-2 hover:bg-accent" data-testid="menu-item-save">Save</button>
              </div>
            </div>
            <div className="relative group">
              <Button variant="outline" data-testid="button-menu-edit">Edit</Button>
              <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-card border rounded-lg shadow-lg min-w-[150px]" data-testid="submenu-edit">
                <button onClick={() => handleAction('Cut')} className="block w-full text-left px-4 py-2 hover:bg-accent" data-testid="menu-item-cut">Cut</button>
                <button onClick={() => handleAction('Copy')} className="block w-full text-left px-4 py-2 hover:bg-accent" data-testid="menu-item-copy">Copy</button>
                <button onClick={() => handleAction('Paste')} className="block w-full text-left px-4 py-2 hover:bg-accent" data-testid="menu-item-paste">Paste</button>
              </div>
            </div>
          </div>
        </div>

        <ResultPanel title="Menu Actions">
          {actions.length > 0 ? (
            <ul className="space-y-1" data-testid="result-panel-menu-actions">
              {actions.map((action, i) => (
                <li key={i} className="text-sm">{action}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-actions">No actions performed</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
