
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { Star, Truck, RefreshCw, FileText, Info } from 'lucide-react';

const tabs = [
  { 
      id: 1, 
      label: 'Overview', 
      icon: <Info className="h-4 w-4" />,
      content: (
          <div className="space-y-3">
              <h3 className="text-lg font-bold">Premium Wireless Headphones</h3>
              <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current opacity-50" />
                  <span className="text-muted-foreground text-sm ml-2">(4.2)</span>
              </div>
              <p className="text-muted-foreground">Experience high-fidelity audio with our latest noise-cancelling technology. Perfect for travel, work, or leisure.</p>
              <div className="text-2xl font-bold">$299.00</div>
          </div>
      ) 
  },
  { 
      id: 2, 
      label: 'Specifications',
      icon: <FileText className="h-4 w-4" />,
      content: (
          <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b pb-1"><span>Battery Life</span><span className="font-medium">30 Hours</span></li>
              <li className="flex justify-between border-b pb-1"><span>Weight</span><span className="font-medium">250g</span></li>
              <li className="flex justify-between border-b pb-1"><span>Connectivity</span><span className="font-medium">Bluetooth 5.2</span></li>
              <li className="flex justify-between border-b pb-1"><span>Charging</span><span className="font-medium">USB-C Fast Charge</span></li>
          </ul>
      ) 
  },
  { 
      id: 3, 
      label: 'Reviews', 
      icon: <Star className="h-4 w-4" />,
      content: (
          <div className="space-y-4">
              <div className="bg-muted/30 p-3 rounded">
                  <div className="font-semibold text-sm">John Doe</div>
                  <div className="text-xs text-amber-500">★★★★★</div>
                  <p className="text-sm mt-1">Amazing sound quality, totally worth it!</p>
              </div>
               <div className="bg-muted/30 p-3 rounded">
                  <div className="font-semibold text-sm">Jane Smith</div>
                  <div className="text-xs text-amber-500">★★★★☆</div>
                  <p className="text-sm mt-1">Great comfort, but the case is a bit bulky.</p>
              </div>
          </div>
      ) 
  },
  {
      id: 4,
      label: 'Shipping',
      icon: <Truck className="h-4 w-4" />,
      content: (
          <div className="space-y-2 text-sm">
              <p><strong>Standard Shipping:</strong> 3-5 Business Days (Free)</p>
              <p><strong>Express Shipping:</strong> 1-2 Business Days ($15.00)</p>
              <p className="text-muted-foreground text-xs mt-2">All orders are shipped from our central warehouse in California.</p>
          </div>
      )
  },
  {
      id: 5,
      label: 'Returns',
      icon: <RefreshCw className="h-4 w-4" />,
      content: (
          <div className="text-sm">
              <p>We offer a <strong>30-day money-back guarantee</strong>. If you are not completely satisfied with your purchase, you can return it for a full refund.</p>
              <p className="mt-2 text-muted-foreground">Item must be in original packaging with all accessories.</p>
          </div>
      )
  }
];

export default function TabbedContentPage() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Helmet>
        <title>Product Details Tabs - UI Practice Hub</title>
        <meta name="description" content="View detailed product information" />
      </Helmet>

      <PageHeader title="Product Details Tabs" subtitle="View detailed product information" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-tabs-container">
        <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
          <div role="tablist" className="flex overflow-x-auto border-b bg-muted/20">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-card border-t-2 border-t-primary text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
                data-testid={`tab-button-${tab.id}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-6 min-h-[250px]">
            {tabs.map(tab => (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                hidden={activeTab !== tab.id}
                className="animate-in fade-in zoom-in-95 duration-200"
                data-testid={`tab-content-${tab.id}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>

        <ResultPanel title="Tab State">
          <div className="flex flex-col items-center justify-center h-full" data-testid="result-panel-active-tab">
            <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                {tabs.find(t => t.id === activeTab)?.icon}
            </div>
            <p className="text-lg font-medium">Viewing {tabs.find(t => t.id === activeTab)?.label}</p>
            <p className="text-muted-foreground text-sm">Tab Index: {activeTab}</p>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
