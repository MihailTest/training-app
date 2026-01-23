
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Trash2, Save, LogOut, Zap } from 'lucide-react';

export default function ModalWindowsPage() {
  const [modalType, setModalType] = useState(null);
  const [logs, setLogs] = useState([]);

  const logAction = (action) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()}: ${action}`, ...prev]);
    setModalType(null);
  };

  return (
    <>
      <Helmet>
        <title>User Action Confirmations - UI Practice Hub</title>
        <meta name="description" content="Confirm important user actions" />
      </Helmet>

      <PageHeader title="User Action Confirmations" subtitle="Confirm important user actions" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-modal-dialogs-container">
        <div className="space-y-4">
          <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-medium">Trigger Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="destructive" onClick={() => setModalType('delete')} data-testid="button-open-small-modal" className="gap-2">
                    <Trash2 className="h-4 w-4" /> Delete Item
                  </Button>
                  
                  <Button onClick={() => setModalType('save')} data-testid="button-open-large-modal" className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                  
                  <Button variant="outline" onClick={() => setModalType('logout')} className="gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                  
                  <Button onClick={() => setModalType('upgrade')} className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                    <Zap className="h-4 w-4" /> Upgrade Plan
                  </Button>
              </div>
          </div>
          
           <div className="bg-card border rounded-lg p-6">
               <h3 className="font-medium mb-2">Action Log</h3>
               <div className="bg-muted p-3 rounded-md h-40 overflow-y-auto text-sm font-mono text-muted-foreground">
                   {logs.length > 0 ? logs.map((log, i) => <div key={i}>{log}</div>) : 'No actions recorded'}
               </div>
           </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Dialog open={modalType === 'delete'} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent data-testid="modal-small">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive"><Trash2 className="h-5 w-5" /> Delete Item?</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
             <Button variant="ghost" onClick={() => setModalType(null)} data-testid="button-close-small-modal">Cancel</Button>
             <Button variant="destructive" onClick={() => logAction('Item Deleted')}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Modal */}
      <Dialog open={modalType === 'save'} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent data-testid="modal-large">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
             <DialogDescription>
                You have unsaved changes in your workspace. Do you want to save them before leaving?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => logAction('Changes Discarded')}>Discard</Button>
            <Button onClick={() => logAction('Changes Saved')} data-testid="button-close-large-modal">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Logout Modal */}
      <Dialog open={modalType === 'logout'} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
             <DialogDescription>
                Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalType(null)}>Stay Logged In</Button>
            <Button onClick={() => logAction('Logged Out')}>Log Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Upgrade Modal */}
      <Dialog open={modalType === 'upgrade'} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600"><Zap className="h-5 w-5" /> Upgrade to Premium</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <p className="text-sm text-muted-foreground">Unlock exclusive features with our Premium Plan:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Unlimited Projects</li>
                <li>Priority Support</li>
                <li>Advanced Analytics</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setModalType(null)}>Maybe Later</Button>
            <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => logAction('Upgraded to Premium')}>Upgrade Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
