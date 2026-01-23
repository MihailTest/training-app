
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { ExternalLink, BookOpen, Code, Users, LifeBuoy } from 'lucide-react';

export default function LinkNavigationPage() {
  const [history, setHistory] = useState([]);

  const handleLinkClick = (name, type) => {
    setHistory(prev => [{
      id: Date.now(),
      text: `Accessed ${name} (${type})`,
      time: new Date().toLocaleTimeString()
    }, ...prev]);
  };

  return (
    <>
      <Helmet>
        <title>Resource Library - UI Practice Hub</title>
        <meta name="description" content="Access internal and external documentation resources" />
      </Helmet>

      <PageHeader title="Resource Library" subtitle="Navigate through developer resources and documentation" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-links-container">
        <ControlPanel title="Documentation Resources">
          <div className="space-y-4">
            {/* Reuse existing test-ids mapping to new concepts */}
            
            <div className="p-3 border rounded-lg hover:bg-accent transition-colors group">
              <div className="flex items-center gap-3 mb-1">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <Link 
                    to="/" 
                    onClick={() => handleLinkClick('Documentation', 'Internal')} 
                    className="font-medium text-primary hover:underline" 
                    data-testid="link-home-page" // Mapping "Documentation" to old "Home" ID
                >
                    Technical Documentation
                </Link>
              </div>
              <p className="text-sm text-muted-foreground pl-8">Comprehensive guides and API references for developers.</p>
            </div>

            <div className="p-3 border rounded-lg hover:bg-accent transition-colors group">
              <div className="flex items-center gap-3 mb-1">
                <Code className="h-5 w-5 text-green-500" />
                <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('Community Forum', 'External')}
                    className="font-medium text-primary hover:underline flex items-center gap-1"
                    data-testid="link-external-docs" // Mapping "Community Forum" to old "External" ID
                >
                    Community Forum <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground pl-8">Join the discussion with other developers.</p>
            </div>

            <div className="p-3 border rounded-lg hover:bg-accent transition-colors group">
              <div className="flex items-center gap-3 mb-1">
                <LifeBuoy className="h-5 w-5 text-red-500" />
                <Link 
                    to="/not-found" 
                    onClick={() => handleLinkClick('Support Ticket', 'System')} 
                    className="font-medium text-primary hover:underline" 
                    data-testid="link-not-found" // Mapping "Support" to old "Not Found" ID
                >
                    Open Support Ticket
                </Link>
              </div>
              <p className="text-sm text-muted-foreground pl-8">Get help from our support team (Simulates 404).</p>
            </div>

            {/* Extra links for new concept */}
            <div className="p-3 border rounded-lg hover:bg-accent transition-colors group">
                <div className="flex items-center gap-3 mb-1">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="font-medium text-primary cursor-pointer hover:underline" onClick={() => handleLinkClick('API Reference', 'Internal')}>
                        API Reference
                    </span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">Detailed endpoints and parameter usage.</p>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Access History">
          {history.length > 0 ? (
            <ul className="space-y-2" data-testid="result-panel-link-events">
              {history.map((item) => (
                <li key={item.id} className="text-sm flex justify-between border-b pb-1 border-border/50">
                    <span>{item.text}</span>
                    <span className="text-muted-foreground font-mono text-xs">{item.time}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-clicks">Select a resource to access</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
