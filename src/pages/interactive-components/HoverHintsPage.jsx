
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Info, AlertTriangle, HelpCircle, Save } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function HoverHintsPage() {
  return (
    <>
      <Helmet>
        <title>Interactive Help System - UI Practice Hub</title>
        <meta name="description" content="Get help with interactive tooltips" />
      </Helmet>

      <PageHeader title="Interactive Help System" subtitle="Get help with interactive tooltips" />

      <div className="bg-card border rounded-lg p-8 space-y-8 max-w-2xl mx-auto" data-testid="page-tooltips-container">
        
        <TooltipProvider>
            
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
                <div>
                    <h3 className="font-medium">Quick Save</h3>
                    <p className="text-sm text-muted-foreground">Save your current progress immediately.</p>
                </div>
                
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button data-testid="button-tooltip-trigger" size="icon" variant="secondary">
                            <Save className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Click to save changes to cloud</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Password</label>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Must be at least 8 characters with 1 number</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                    title="Enter your secure password" // Native tooltip fallback
                    data-testid="input-tooltip-trigger"
                />
            </div>

            <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="cursor-pointer p-1" data-testid="icon-tooltip-trigger">
                             <AlertTriangle className="h-6 w-6" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-destructive text-destructive-foreground">
                        <p>Warning: This action cannot be undone!</p>
                    </TooltipContent>
                </Tooltip>
                <div>
                    <h4 className="font-bold text-sm">Zone Restriction</h4>
                    <p className="text-xs">Hover over the warning icon to see details.</p>
                </div>
            </div>

        </TooltipProvider>

      </div>
    </>
  );
}
