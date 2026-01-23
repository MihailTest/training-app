
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ModalDialogsPage() {
  const [smallOpen, setSmallOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);

  return (
    <>
      <Helmet><title>Modal Dialogs - UI Practice Hub</title></Helmet>
      <PageHeader title="Modal Dialogs" subtitle="Practice modal dialog interactions" />
      <div className="space-y-4" data-testid="page-modal-dialogs-container">
        <div className="flex gap-4">
          <Button onClick={() => setSmallOpen(true)} data-testid="button-open-small-modal">Open Small Modal</Button>
          <Button onClick={() => setLargeOpen(true)} data-testid="button-open-large-modal">Open Large Modal</Button>
        </div>
      </div>

      <Dialog open={smallOpen} onOpenChange={setSmallOpen}>
        <DialogContent className="sm:max-w-[425px]" data-testid="modal-small">
          <DialogHeader>
            <DialogTitle>Small Modal</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This is a small modal dialog. It naturally fits its content without forcing a fixed height.
            </p>
          </div>
          <div className="flex justify-end">
             <Button size="sm" onClick={() => setSmallOpen(false)} data-testid="button-close-small-modal">Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={largeOpen} onOpenChange={setLargeOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col" data-testid="modal-large">
          <DialogHeader>
            <DialogTitle>Large Modal</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2 my-4" data-testid="modal-large-content">
            <div className="space-y-4">
              <p className="font-medium">This modal handles large content gracefully.</p>
              {Array.from({ length: 15 }, (_, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2 border-t mt-auto">
            <Button onClick={() => setLargeOpen(false)} data-testid="button-close-large-modal">Close Modal</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
