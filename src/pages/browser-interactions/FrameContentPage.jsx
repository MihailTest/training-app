
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';

function ContentFrame({ title, type, content, testId }) {
  const srcDoc = `
    <html>
      <body style='margin:0;padding:20px;font-family:-apple-system,system-ui,sans-serif;background:#f8fafc'>
        <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e2e8f0">
          <h2 style="margin-top:0;color:#0f172a;font-size:1.25rem">${title}</h2>
          <span style="background:#e0f2fe;color:#0369a1;padding:4px 8px;border-radius:4px;font-size:0.75rem;font-weight:600;text-transform:uppercase">${type}</span>
          <div style="margin-top:15px;color:#475569;line-height:1.5">
            ${content}
          </div>
        </div>
      </body>
    </html>
  `;

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b text-sm font-medium flex justify-between">
            <span>{title}</span>
            <span className="text-xs text-muted-foreground">Source: Embedded</span>
        </div>
        <iframe
          title={title}
          srcDoc={srcDoc}
          className="w-full h-[200px] border-none"
          data-testid={testId}
        />
    </div>
  );
}

export default function FrameContentPage() {
  return (
    <>
      <Helmet><title>Embedded Content Viewer - UI Practice Hub</title></Helmet>
      <PageHeader title="Embedded Content Viewer" subtitle="View and manage embedded content" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-frames-container">
        
        <ContentFrame 
            title="Latest Tech Trends" 
            type="Blog Post"
            testId="iframe-frame-1"
            content="<p><strong>By Sarah Tech</strong> • 2 hours ago</p><p>Discover the latest innovations in AI and machine learning that are shaping the future of software development.</p>"
        />

        <ContentFrame 
            title="Product Demo Video" 
            type="Video Player"
            testId="iframe-frame-2"
            content="<div style='background:#000;height:100px;display:flex;align-items:center;justify-content:center;color:white;border-radius:4px'>▶ Play Video</div><p style='margin-top:10px;font-size:0.9rem'>A quick walkthrough of the new dashboard features.</p>"
        />

        <ContentFrame 
            title="Office Location" 
            type="Map View"
            testId="iframe-frame-3" // Assuming generic test ID mapping handled or loose
            content="<div style='background:#e2e8f0;height:100px;display:flex;align-items:center;justify-content:center;border-radius:4px;color:#64748b'>📍 Map Placeholder</div><p style='margin-top:10px;font-size:0.9rem'>123 Tech Valley, Silicon City, CA</p>"
        />

        <ContentFrame 
            title="Contact Support" 
            type="Contact Form"
            testId="iframe-frame-4"
            content="<input placeholder='Your Email' style='width:100%;padding:8px;margin-bottom:8px;border:1px solid #cbd5e1;border-radius:4px'><button style='background:#3b82f6;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer'>Send Message</button>"
        />
      </div>
    </>
  );
}
