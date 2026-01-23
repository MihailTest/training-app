
import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';

function AutoResizingIframe({ title, srcDoc, initialHeight = "150px", testId }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resizeIframe = () => {
      if (iframe.contentWindow?.document?.body) {
        // Reset height to allow shrinking
        iframe.style.height = '0px'; 
        const newHeight = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = (newHeight + 20) + 'px'; // +20 for padding buffer
      }
    };

    iframe.addEventListener('load', () => {
      resizeIframe();
      
      // Setup ResizeObserver inside iframe if possible
      try {
        const body = iframe.contentWindow.document.body;
        const observer = new ResizeObserver(resizeIframe);
        observer.observe(body);
        
        // Cleanup observer on iframe reload/unmount logic if needed, 
        // but since we are controlling srcDoc here, simplistic approach works
      } catch (e) {
        console.warn('ResizeObserver failed in iframe', e);
      }
    });

    return () => {
      // Cleanup
    };
  }, [srcDoc]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      srcDoc={srcDoc}
      style={{ minHeight: initialHeight }}
      className="w-full border rounded transition-all duration-200"
      data-testid={testId}
    />
  );
}

export default function FramesPage() {
  return (
    <>
      <Helmet><title>Frames - UI Practice Hub</title></Helmet>
      <PageHeader title="Frames" subtitle="Practice iframe interactions" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-frames-container">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Frame 1</h2>
          <AutoResizingIframe
            title="Frame 1"
            testId="iframe-frame-1"
            srcDoc={`
              <html>
                <body style='padding:20px;font-family:sans-serif;margin:0;'>
                  <h1 style='margin-top:0'>Frame 1</h1>
                  <p>This is the first iframe with auto-resizing capabilities.</p>
                  <p>Add more content to see me grow!</p>
                  <button onclick="document.body.insertAdjacentHTML('beforeend', '<p>New content line!</p>')">Add Content</button>
                </body>
              </html>
            `}
          />
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Frame 2</h2>
          <AutoResizingIframe
            title="Frame 2"
            testId="iframe-frame-2"
            srcDoc={`
              <html>
                <body style='padding:20px;font-family:sans-serif;margin:0;background-color:#f9f9f9'>
                  <h1 style='margin-top:0'>Frame 2</h1>
                  <p>This is the second iframe.</p>
                  <div style="padding: 10px; background: white; border: 1px solid #ddd; margin-top: 10px;">
                    It has a nested box.
                  </div>
                </body>
              </html>
            `}
          />
        </div>
      </div>
    </>
  );
}
