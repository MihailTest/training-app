
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';

export default function ResizablePage() {
  const [size, setSize] = useState({ width: 300, height: 200 });

  return (
    <>
      <Helmet><title>Resizable - UI Practice Hub</title></Helmet>
      <PageHeader title="Resizable" subtitle="Practice resizable elements" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-resizable-container">
        <div className="bg-card border rounded-lg p-6">
          <div
            style={{ width: size.width, height: size.height, resize: 'both', overflow: 'auto' }}
            className="border-2 border-dashed border-primary rounded-lg p-4 min-w-[200px] min-h-[150px] max-w-full"
            data-testid="element-resizable"
          >
            <p className="text-sm text-muted-foreground">Resize me by dragging the corner</p>
          </div>
        </div>

        <ResultPanel title="Dimensions">
          <p className="text-2xl font-bold" data-testid="result-panel-dimensions">{size.width}px × {size.height}px</p>
        </ResultPanel>
      </div>
    </>
  );
}
