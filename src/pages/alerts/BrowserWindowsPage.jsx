
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function BrowserWindowsPage() {
  const [messages, setMessages] = useState([]);

  const addMessage = (msg) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const openNewTab = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>New Tab</title>
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif; 
                padding: 2rem; 
                text-align: center; 
                background: #f8fafc;
              }
              .content { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                padding: 2rem; 
                border-radius: 8px; 
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); 
              }
            </style>
          </head>
          <body>
            <div class="content">
              <h1>New Tab Opened</h1>
              <p>This is a sample page opened in a new tab.</p>
              <p>The content fits naturally within the viewport.</p>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
      addMessage('Opened new tab');
    }
  };

  const openNewWindow = () => {
    // Open small initially, then resize to content
    const newWindow = window.open('', '_blank', 'width=300,height=300');
    
    if (newWindow) {
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Dynamic Window</title>
            <style>
              body { 
                font-family: system-ui; 
                margin: 0; 
                padding: 20px; 
                display: inline-block; 
                white-space: nowrap; 
                background: #f0f9ff;
              }
              h1 { margin-top: 0; color: #0284c7; }
            </style>
          </head>
          <body>
            <div id="wrapper">
              <h1>Dynamic Window</h1>
              <p>This window resizes to fit its content automatically.</p>
              <button onclick="window.close()" style="margin-top: 10px; padding: 5px 10px;">Close Me</button>
            </div>
          </body>
        </html>
      `;
      
      newWindow.document.write(content);
      newWindow.document.close();

      // Attempt to resize after content is loaded
      newWindow.onload = () => {
        try {
          // Add some padding/chrome size estimation
          const width = newWindow.document.body.scrollWidth + 50;
          const height = newWindow.document.body.scrollHeight + 100; 
          newWindow.resizeTo(width, height);
        } catch (e) {
          console.warn('Cannot resize window due to browser restrictions', e);
        }
      };
      
      addMessage('Opened new dynamic window');
    }
  };

  const openMessageWindow = () => {
    const newWindow = window.open('', 'MsgWindow', 'width=400,height=200');
    if (newWindow) {
      newWindow.document.write('<p>This is a message window</p>');
      addMessage('Opened message window');
    }
  };

  return (
    <>
      <Helmet>
        <title>Browser Windows - UI Practice Hub</title>
        <meta name="description" content="Practice opening browser windows and tabs" />
      </Helmet>

      <PageHeader title="Browser Windows" subtitle="Practice opening new tabs and windows" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-browser-windows-container">
        <ControlPanel title="Window Controls">
          <div className="space-y-3">
            <Button onClick={openNewTab} className="w-full" data-testid="button-new-tab">Open New Tab</Button>
            <Button onClick={openNewWindow} className="w-full" data-testid="button-new-window">Open New Window</Button>
            <Button onClick={openMessageWindow} className="w-full" data-testid="button-new-window-message">Open Message Window</Button>
          </div>
        </ControlPanel>

        <ResultPanel title="Actions Log">
          {messages.length > 0 ? (
            <ul className="space-y-1" data-testid="result-panel-window-action">
              {messages.map((msg, i) => (
                <li key={i} className="text-sm">{msg}</li>
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
