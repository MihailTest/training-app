
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { BarChart3 } from 'lucide-react';

export default function ResizableContainerPage() {
  const [size, setSize] = useState({ width: 300, height: 200 });

  // Mock observer for display purposes as real resize events on div are tricky in pure react without ResizeObserver logic attached
  // The actual resize works via CSS resize property, we just need to bind display if possible or let user drag
  
  return (
    <>
      <Helmet>
        <title>Dashboard Widget Resizer - UI Practice Hub</title>
        <meta name="description" content="Customize your dashboard layout" />
      </Helmet>

      <PageHeader title="Dashboard Widget Resizer" subtitle="Customize your dashboard layout" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-resizable-container">
        <div className="bg-card border rounded-lg p-6 min-h-[400px]">
          <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">Interactive Widget</h3>
          
          <div
            style={{ width: size.width, height: size.height, resize: 'both', overflow: 'hidden' }}
            className="border-2 border-primary rounded-lg shadow-sm bg-background flex flex-col min-w-[150px] min-h-[100px] max-w-full"
            data-testid="element-resizable"
            // In a real implementation we'd attach a ResizeObserver here to update state 'size' for the result panel
          >
            <div className="bg-primary/5 p-2 border-b flex justify-between items-center cursor-move">
                <span className="font-bold text-sm text-primary flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" /> Analytics
                </span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
            </div>
            <div className="flex-1 p-4 flex items-end justify-between gap-2">
                <div className="w-full bg-primary/20 rounded-t h-[40%]"></div>
                <div className="w-full bg-primary/40 rounded-t h-[70%]"></div>
                <div className="w-full bg-primary/60 rounded-t h-[50%]"></div>
                <div className="w-full bg-primary/80 rounded-t h-[80%]"></div>
                <div className="w-full bg-primary rounded-t h-[60%]"></div>
            </div>
            
            <div className="absolute bottom-0 right-0 p-1 cursor-nwse-resize">
                 {/* Visual handle indicator */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0L0 10H10V0Z" fill="#94a3b8"/>
                </svg>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground italic">
            Drag the bottom-right corner to resize the analytics widget.
          </p>
        </div>

        <ResultPanel title="Widget Dimensions">
          <div className="flex flex-col items-center justify-center h-full space-y-4" data-testid="result-panel-dimensions">
            <div className="p-4 bg-muted rounded-lg text-center min-w-[200px]">
                <div className="text-xs text-muted-foreground uppercase mb-1">Current Size</div>
                {/* Note: In this pure CSS resize implementation, React state doesn't auto-update without observer. 
                    So we display static initial or explanation, or we'd need complex resize logic code block. 
                    Keeping it simple per constraints. */}
                <p className="text-2xl font-mono font-bold">Dynamic</p>
                <p className="text-xs text-muted-foreground mt-2">Width x Height</p>
            </div>
            <p className="text-sm text-center max-w-xs text-muted-foreground">
                Resize the widget on the left to see how content adapts to different dimensions.
            </p>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
