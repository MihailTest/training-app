
import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';

export default function NestedFramesPage() {
  const parentIframeRef = useRef(null);

  useEffect(() => {
    const iframe = parentIframeRef.current;
    if (!iframe) return;

    const resizeIframe = () => {
      if (iframe.contentWindow?.document?.body) {
        iframe.style.height = '0px';
        const newHeight = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = (newHeight + 20) + 'px';
      }
    };

    iframe.addEventListener('load', () => {
      resizeIframe();
      try {
        const body = iframe.contentWindow.document.body;
        const observer = new ResizeObserver(resizeIframe);
        observer.observe(body);
        
        // Also listen to child iframe loading/resizing if we could attach there,
        // but observing parent body size usually catches child expansion layout changes
      } catch (e) { console.warn(e); }
    });
  }, []);

  const nestedSrcDoc = `
    <html>
      <body style='padding:20px;font-family:sans-serif;margin:0;background:#fff'>
        <h1 style='margin-top:0;color:#333'>Parent Frame</h1>
        <p>This frame contains another frame.</p>
        
        <div style="margin-top: 20px;">
          <iframe 
            srcdoc="<html style='overflow:hidden'><body style='margin:0;padding:10px;background:#f0f9ff;font-family:sans-serif'><h2 style='margin-top:0;font-size:1.2em'>Child Frame</h2><p>I am nested.</p><button onclick='document.body.insertAdjacentHTML(\`beforeend\`, \`<p>More child content</p>\`); window.frameElement.style.height = document.body.scrollHeight + \`px\`;'>Expand Child</button></body></html>"
            style="width:100%; border:1px solid #94a3b8; border-radius:4px; min-height:150px"
            onload="this.style.height = this.contentWindow.document.body.scrollHeight + 'px'; new ResizeObserver(() => { this.style.height = this.contentWindow.document.body.scrollHeight + 'px'; }).observe(this.contentWindow.document.body);"
          ></iframe>
        </div>
        <p>Parent footer content.</p>
      </body>
    </html>
  `;

  return (
    <>
      <Helmet><title>Nested Frames - UI Practice Hub</title></Helmet>
      <PageHeader title="Nested Frames" subtitle="Practice nested iframe structures" />
      <div className="bg-card border rounded-lg p-6" data-testid="page-nested-frames-container">
        <iframe
          ref={parentIframeRef}
          title="Parent Frame"
          srcDoc={nestedSrcDoc}
          className="w-full border rounded transition-all duration-200"
          style={{ minHeight: '300px' }}
          data-testid="iframe-parent"
        />
      </div>
    </>
  );
}
