
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';

export default function DraggableElementsPage() {
  const [pos1, setPos1] = useState({ x: 20, y: 20 });
  const [pos2, setPos2] = useState({ x: 20, y: 20 });
  const [pos3, setPos3] = useState({ x: 20, y: 20 });

  return (
    <>
      <Helmet>
        <title>Kanban Board - UI Practice Hub</title>
        <meta name="description" content="Manage tasks with Kanban workflow" />
      </Helmet>

      <PageHeader title="Kanban Board" subtitle="Manage tasks with Kanban workflow" />
      
      <div className="space-y-8" data-testid="page-dragable-container">
        
        {/* To Do Column - Simple Drag */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
               <h2 className="font-semibold flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-gray-400"></span> To Do
               </h2>
               <span className="text-xs bg-muted px-2 py-1 rounded">1 Task</span>
          </div>
          <div className="relative h-48 border rounded-lg bg-muted/20 p-4" data-testid="container-simple-drag">
            <div
              style={{ left: pos1.x, top: pos1.y }}
              className="absolute w-48 bg-card border shadow-sm rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
              data-testid="drag-box-simple"
            >
              <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600">DESIGN</span>
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Create Wireframes</p>
              <p className="text-xs text-muted-foreground mt-2">Due: Tomorrow</p>
            </div>
          </div>
        </div>

        {/* In Progress Column - Horizontal Constraint Mock */}
        <div className="bg-card border rounded-lg p-6">
           <div className="flex items-center justify-between mb-4">
               <h2 className="font-semibold flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-blue-500"></span> In Progress
               </h2>
               <span className="text-xs bg-muted px-2 py-1 rounded">1 Task</span>
          </div>
          <div className="relative h-32 border rounded-lg bg-muted/20 p-4" data-testid="container-horizontal-drag">
            <div
              style={{ left: pos2.x, top: 20 }}
              className="absolute w-48 bg-card border shadow-sm rounded-lg p-3 cursor-ew-resize hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
              data-testid="drag-box-horizontal"
            >
               <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-orange-600">DEV</span>
              </div>
              <p className="text-sm font-medium">API Integration</p>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div className="bg-blue-500 h-1.5 rounded-full w-1/2"></div>
              </div>
            </div>
             <p className="absolute bottom-2 right-2 text-xs text-muted-foreground">Restricted movement (Horizontal)</p>
          </div>
        </div>

        {/* Done Column - Contained Drag */}
        <div className="bg-card border rounded-lg p-6">
           <div className="flex items-center justify-between mb-4">
               <h2 className="font-semibold flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-green-500"></span> Done
               </h2>
               <span className="text-xs bg-muted px-2 py-1 rounded">1 Task</span>
          </div>
          <div className="relative h-48 border-2 border-dashed rounded-lg bg-green-50/30 overflow-hidden" data-testid="container-restricted-drag">
            <div
              style={{ left: Math.max(0, Math.min(pos3.x, 200)), top: Math.max(0, Math.min(pos3.y, 100)) }}
              className="absolute w-48 bg-card border shadow-sm rounded-lg p-3 cursor-move hover:shadow-md transition-shadow opacity-75"
              data-testid="drag-box-restricted"
            >
              <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-green-600">QA</span>
              </div>
              <p className="text-sm font-medium line-through text-muted-foreground">Unit Testing</p>
              <p className="text-xs text-green-600 mt-2 font-medium">Completed</p>
            </div>
          </div>
        </div>

        <Button onClick={() => { setPos1({x:20,y:20}); setPos2({x:20,y:20}); setPos3({x:20,y:20}); }} data-testid="button-reset-positions">
          Reset Board Layout
        </Button>
      </div>
    </>
  );
}
