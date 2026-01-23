
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';

const tabs = [
  { id: 1, label: 'About', content: 'UI Practice Hub is a comprehensive platform for practicing UI automation and testing.' },
  { id: 2, label: 'Learning', content: 'This platform helps you learn through hands-on practice with real-world scenarios.' },
  { id: 3, label: 'Practice', content: 'Practice makes perfect. Use this platform to improve your automation skills.' }
];

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Helmet><title>Tabs - UI Practice Hub</title></Helmet>
      <PageHeader title="Tabs" subtitle="Practice tab navigation" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-tabs-container">
        <div className="bg-card border rounded-lg p-6">
          <div role="tablist" className="flex border-b mb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent hover:text-primary'
                }`}
                data-testid={`tab-button-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {tabs.map(tab => (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              hidden={activeTab !== tab.id}
              data-testid={`tab-content-${tab.id}`}
            >
              {tab.content}
            </div>
          ))}
        </div>

        <ResultPanel title="Active Tab">
          <p data-testid="result-panel-active-tab">Tab {activeTab} is active: {tabs.find(t => t.id === activeTab)?.label}</p>
        </ResultPanel>
      </div>
    </>
  );
}
