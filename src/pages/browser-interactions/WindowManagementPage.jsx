
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bell, Settings, X } from 'lucide-react';

export default function WindowManagementPage() {
  const [activeWindows, setActiveWindows] = useState([]);

  const openWindow = (id, title, icon) => {
    if (!activeWindows.find(w => w.id === id)) {
        setActiveWindows(prev => [...prev, { id, title, icon }]);
    }
  };

  const closeWindow = (id) => {
    setActiveWindows(prev => prev.filter(w => w.id !== id));
  };

  const renderWindowContent = (id) => {
    switch(id) {
        case 'chat': return <div className="p-4 bg-muted/20 h-32 flex items-center justify-center text-muted-foreground">Chat Interface Loaded</div>;
        case 'notifications': return <div className="p-4 space-y-2"><div className="h-2 bg-muted rounded w-3/4"></div><div className="h-2 bg-muted rounded w-1/2"></div></div>;
        case 'settings': return <div className="p-4 text-sm">Settings: <span className="font-bold">Dark Mode</span></div>;
        default: return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Multi-Window Chat Application - UI Practice Hub</title>
        <meta name="description" content="Manage multiple application windows" />
      </Helmet>

      <PageHeader title="Multi-Window Chat Application" subtitle="Manage multiple application windows" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-browser-windows-container">
        <ControlPanel title="Application Windows">
          <div className="space-y-4">
            <Button 
                onClick={() => openWindow('chat', 'Chat', <MessageSquare className="h-4 w-4" />)} 
                className="w-full justify-start gap-2" 
                data-testid="button-new-tab" // Mapping
            >
                <MessageSquare className="h-4 w-4" /> Open Chat Window
            </Button>
            <Button 
                onClick={() => openWindow('notifications', 'Notifications', <Bell className="h-4 w-4" />)} 
                className="w-full justify-start gap-2" 
                data-testid="button-new-window" // Mapping
            >
                <Bell className="h-4 w-4" /> Open Notification Window
            </Button>
            <Button 
                onClick={() => openWindow('settings', 'Settings', <Settings className="h-4 w-4" />)} 
                className="w-full justify-start gap-2" 
                data-testid="button-new-window-message" // Mapping
            >
                <Settings className="h-4 w-4" /> Open Settings Window
            </Button>
          </div>
        </ControlPanel>

        <ResultPanel title="Active Windows">
          {activeWindows.length > 0 ? (
            <div className="space-y-4" data-testid="result-panel-window-action">
              {activeWindows.map(win => (
                <div key={win.id} className="border rounded-lg shadow-sm bg-card overflow-hidden animate-in zoom-in-95">
                    <div className="bg-muted px-3 py-2 flex items-center justify-between border-b">
                        <div className="flex items-center gap-2 font-medium text-sm">
                            {win.icon} {win.title}
                        </div>
                        <button onClick={() => closeWindow(win.id)} className="text-muted-foreground hover:text-foreground">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    {renderWindowContent(win.id)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-actions">No active windows</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
