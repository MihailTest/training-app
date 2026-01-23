
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';

export default function NestedContentPage() {
  const nestedSrcDoc = `
    <html>
      <body style='padding:20px;font-family:system-ui;margin:0;background:#fff'>
        <div style="border-bottom:1px solid #e2e8f0;padding-bottom:10px;margin-bottom:20px">
            <h1 style='margin:0;font-size:1.5rem;color:#1e293b'>Main Dashboard</h1>
            <p style='margin:5px 0 0;color:#64748b'>Parent Level</p>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div style="background:#f8fafc;padding:15px;border-radius:8px;border:1px solid #e2e8f0">
                 <iframe 
                    srcdoc="<html style='overflow:hidden'><body style='margin:0;padding:10px;font-family:system-ui'><h3 style='margin:0 0 10px;font-size:1rem;color:#334155'>Analytics Widget</h3><div style='height:80px;background:#e0f2fe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#0369a1'>Chart Data</div></body></html>"
                    style="width:100%;border:none;height:120px;"
                ></iframe>
            </div>
            
            <div style="background:#f8fafc;padding:15px;border-radius:8px;border:1px solid #e2e8f0">
                 <iframe 
                    srcdoc="<html style='overflow:hidden'><body style='margin:0;padding:10px;font-family:system-ui'><h3 style='margin:0 0 10px;font-size:1rem;color:#334155'>User Profile</h3><div style='display:flex;gap:10px;align-items:center'><div style='width:40px;height:40px;background:#cbd5e1;border-radius:50%'></div><div><div style='font-weight:bold'>Admin User</div><div style='font-size:0.8rem;color:#64748b'>Online</div></div></div></body></html>"
                    style="width:100%;border:none;height:120px;"
                ></iframe>
            </div>
        </div>
        
        <div style="margin-top:20px;padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;color:#166534;font-size:0.9rem">
            <strong>System Status:</strong> All systems operational
        </div>
      </body>
    </html>
  `;

  return (
    <>
      <Helmet>
        <title>Multi-Level Content Structure - UI Practice Hub</title>
        <meta name="description" content="Explore nested content hierarchy" />
      </Helmet>
      
      <PageHeader title="Multi-Level Content Structure" subtitle="Explore nested content hierarchy" />
      
      <div className="bg-card border rounded-lg p-6" data-testid="page-nested-frames-container">
        <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground">/dashboard/root</div>
            <iframe
              title="Parent Dashboard"
              srcDoc={nestedSrcDoc}
              className="w-full border-none h-[400px]"
              data-testid="iframe-parent"
            />
        </div>
      </div>
    </>
  );
}
