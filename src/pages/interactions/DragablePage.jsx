
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';

export default function DragablePage() {
  const [pos1, setPos1] = useState({ x: 50, y: 50 });
  const [pos2, setPos2] = useState({ x: 50, y: 50 });
  const [pos3, setPos3] = useState({ x: 50, y: 50 });

  return (
    <>
      <Helmet><title>Dragable - UI Practice Hub</title></Helmet>
      <PageHeader title="Dragable" subtitle="Practice draggable element movements" />
      
      <div className="space-y-8" data-testid="page-dragable-container">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Simple Drag</h2>
          <div className="relative h-64 border rounded-lg bg-muted/30" data-testid="container-simple-drag">
            <div
              style={{ left: pos1.x, top: pos1.y }}
              className="absolute w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold cursor-move"
              data-testid="drag-box-simple"
            >
              Drag
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Position: {pos1.x}px, {pos1.y}px</p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Horizontal Only</h2>
          <div className="relative h-32 border rounded-lg bg-muted/30" data-testid="container-horizontal-drag">
            <div
              style={{ left: pos2.x, top: 36 }}
              className="absolute w-20 h-20 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold cursor-ew-resize"
              data-testid="drag-box-horizontal"
            >
              H
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Position: {pos2.x}px</p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Contained</h2>
          <div className="relative h-64 border-2 border-dashed rounded-lg bg-muted/30 overflow-hidden" data-testid="container-restricted-drag">
            <div
              style={{ left: Math.max(0, Math.min(pos3.x, 200)), top: Math.max(0, Math.min(pos3.y, 176)) }}
              className="absolute w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold cursor-move"
              data-testid="drag-box-restricted"
            >
              Box
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Position: {pos3.x}px, {pos3.y}px</p>
        </div>

        <Button onClick={() => { setPos1({x:50,y:50}); setPos2({x:50,y:50}); setPos3({x:50,y:50}); }} data-testid="button-reset-positions">
          Reset All Positions
        </Button>
      </div>
    </>
  );
}
