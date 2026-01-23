
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, Info, Trash2 } from 'lucide-react';

export default function NotificationDialogsPage() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message, icon, color) => {
    const newNotif = {
        id: Date.now(),
        type,
        message,
        icon,
        color,
        time: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <>
      <Helmet>
        <title>System Notifications Center - UI Practice Hub</title>
        <meta name="description" content="View and manage system notifications" />
      </Helmet>

      <PageHeader title="System Notifications Center" subtitle="View and manage system notifications" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-alerts-container">
        <ControlPanel title="Trigger Notifications">
          <div className="grid grid-cols-1 gap-3">
            <Button 
                onClick={() => addNotification('Success', 'Order placed successfully', <CheckCircle className="h-5 w-5" />, 'text-green-600 bg-green-50 border-green-200')} 
                className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700 text-white"
                data-testid="button-alert-simple"
            >
              <CheckCircle className="h-4 w-4" /> Trigger Success
            </Button>
            
            <Button 
                onClick={() => addNotification('Warning', 'Low stock alert', <AlertTriangle className="h-5 w-5" />, 'text-yellow-600 bg-yellow-50 border-yellow-200')} 
                className="w-full justify-start gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                data-testid="button-alert-confirm"
            >
              <AlertTriangle className="h-4 w-4" /> Trigger Warning
            </Button>
            
            <Button 
                onClick={() => addNotification('Error', 'Payment failed', <XCircle className="h-5 w-5" />, 'text-red-600 bg-red-50 border-red-200')} 
                className="w-full justify-start gap-2 bg-red-600 hover:bg-red-700 text-white"
                data-testid="button-alert-prompt"
            >
              <XCircle className="h-4 w-4" /> Trigger Error
            </Button>

             <Button 
                onClick={() => addNotification('Info', 'Update available', <Info className="h-5 w-5" />, 'text-blue-600 bg-blue-50 border-blue-200')} 
                className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Info className="h-4 w-4" /> Trigger Info
            </Button>
          </div>
        </ControlPanel>
        
        <ResultPanel title={`Notification History (${notifications.length})`}>
          <div className="relative" data-testid="result-panel-alert-response">
             {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setNotifications([])} className="absolute -top-10 right-0 text-muted-foreground">
                    <Trash2 className="h-4 w-4 mr-1" /> Clear
                </Button>
             )}
             
             <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                 {notifications.length > 0 ? notifications.map(notif => (
                    <div key={notif.id} className={`p-3 border rounded-lg flex items-start gap-3 ${notif.color}`}>
                        <div className="mt-0.5">{notif.icon}</div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{notif.type}</p>
                            <p className="text-sm opacity-90">{notif.message}</p>
                            <p className="text-xs mt-1 opacity-70">{notif.time}</p>
                        </div>
                    </div>
                 )) : (
                    <p className="text-center text-muted-foreground py-8">No notifications</p>
                 )}
             </div>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
