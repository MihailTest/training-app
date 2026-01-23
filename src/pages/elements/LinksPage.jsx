
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';

export default function LinksPage() {
  const [clicks, setClicks] = useState([]);

  const handleClick = (linkName) => {
    setClicks(prev => [...prev, `${new Date().toLocaleTimeString()}: Clicked ${linkName}`]);
  };

  return (
    <>
      <Helmet>
        <title>Links - UI Practice Hub</title>
        <meta name="description" content="Practice different link behaviors" />
      </Helmet>

      <PageHeader title="Links" subtitle="Practice different link types and behaviors" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-links-container">
        <ControlPanel title="Link Examples">
          <div className="space-y-4">
            <div>
              <Link to="/" onClick={() => handleClick('Home')} className="text-primary hover:underline" data-testid="link-home-page">
                Go to Home
              </Link>
            </div>
            <div>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick('External Docs')}
                className="text-primary hover:underline"
                data-testid="link-external-docs"
              >
                Open Docs (New Tab)
              </a>
            </div>
            <div>
              <Link to="/not-found" onClick={() => handleClick('Not Found')} className="text-primary hover:underline" data-testid="link-not-found">
                Open Not Found Page
              </Link>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Link Clicks">
          {clicks.length > 0 ? (
            <ul className="space-y-1" data-testid="result-panel-link-events">
              {clicks.map((click, i) => (
                <li key={i} className="text-sm">{click}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-clicks">No links clicked yet</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
