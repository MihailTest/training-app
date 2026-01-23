
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { 
  Mail, Inbox, Archive, AlertOctagon, Trash2, 
  Folder, GripVertical, RefreshCw, Briefcase 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_ITEMS = [
  { id: '1', title: 'Project Specs', sender: 'manager@corp.com', type: 'Mail' },
  { id: '2', title: 'Weekly Report', sender: 'analyst@corp.com', type: 'Inbox' },
  { id: '3', title: 'Old Records', sender: 'archive@corp.com', type: 'Archive' },
  { id: '4', title: 'Security Alert', sender: 'sec@corp.com', type: 'AlertOctagon' },
  { id: '5', title: 'Junk Mail', sender: 'spam@bot.com', type: 'Trash2' },
  { id: '6', title: 'Meeting Notes', sender: 'team@corp.com', type: 'Mail' },
];

const ICONS = {
  Mail: Mail,
  Inbox: Inbox,
  Archive: Archive,
  AlertOctagon: AlertOctagon,
  Trash2: Trash2,
  Folder: Folder
};

const ZONES = [
  { id: 'Inbox', label: 'Inbox', icon: 'Inbox', color: 'bg-blue-50/50 border-blue-200', activeColor: 'bg-blue-100 border-blue-500', testId: 'zone-a' },
  { id: 'Archive', label: 'Archive', icon: 'Archive', color: 'bg-amber-50/50 border-amber-200', activeColor: 'bg-amber-100 border-amber-500', testId: 'zone-b' },
  { id: 'Important', label: 'Important', icon: 'AlertOctagon', color: 'bg-red-50/50 border-red-200', activeColor: 'bg-red-100 border-red-500', testId: 'zone-important' },
  { id: 'Trash', label: 'Trash', icon: 'Trash2', color: 'bg-gray-50/50 border-gray-200', activeColor: 'bg-gray-100 border-gray-500', testId: 'zone-trash' },
  { id: 'General', label: 'General', icon: 'Folder', color: 'bg-indigo-50/50 border-indigo-200', activeColor: 'bg-indigo-100 border-indigo-500', testId: 'zone-general' },
];

export default function DropZonesPage() {
  const [items, setItems] = useState(INITIAL_ITEMS.map(item => ({ ...item, zone: 'available' })));
  const [draggedItem, setDraggedItem] = useState(null);
  const [activeZone, setActiveZone] = useState(null);
  const [history, setHistory] = useState([]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, zoneId) => {
    e.preventDefault(); // Essential for allowing drop
    e.dataTransfer.dropEffect = 'move';
    if (activeZone !== zoneId) {
      setActiveZone(zoneId);
    }
  };

  const handleDragLeave = (e) => {
    // Only clear if we're actually leaving the drop zone, not entering a child element
    if (!e.currentTarget.contains(e.relatedTarget)) {
       setActiveZone(null);
    }
  };

  const handleDrop = (e, targetZoneId) => {
    e.preventDefault();
    setActiveZone(null);
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      
      const droppedItemData = JSON.parse(data);
      
      if (droppedItemData.zone === targetZoneId) return; // No change

      setItems(prev => prev.map(item => {
        if (item.id === droppedItemData.id) {
          return { ...item, zone: targetZoneId };
        }
        return item;
      }));

      setHistory(prev => [
        `${new Date().toLocaleTimeString()}: Moved "${droppedItemData.title}" to ${targetZoneId}`, 
        ...prev
      ]);

      setDraggedItem(null);
    } catch (err) {
      console.error('Drop failed', err);
    }
  };

  const handleClearAll = () => {
    setItems(prev => prev.map(item => ({ ...item, zone: 'available' })));
    setHistory(prev => [`${new Date().toLocaleTimeString()}: Reset all items`, ...prev]);
  };

  const renderDraggableItem = (item) => {
    const Icon = ICONS[item.type] || Mail;
    const isDragging = draggedItem?.id === item.id;
    
    return (
      <div
        key={item.id}
        draggable
        onDragStart={(e) => handleDragStart(e, item)}
        onDragEnd={() => {
            setDraggedItem(null);
            setActiveZone(null);
        }}
        className={cn(
          "p-3 bg-card border shadow-sm rounded-lg flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all duration-200",
          "hover:shadow-md hover:-translate-y-0.5",
          isDragging && "opacity-50 ring-2 ring-primary/20 grayscale"
        )}
        data-testid={`draggable-item-${item.id}`}
      >
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{item.title}</h4>
          <p className="text-xs text-muted-foreground truncate">{item.sender}</p>
        </div>
        <GripVertical className="h-4 w-4 text-muted-foreground/30" />
      </div>
    );
  };

  const availableItems = items.filter(i => i.zone === 'available');

  return (
    <>
      <Helmet>
        <title>Email Inbox Organization - UI Practice Hub</title>
        <meta name="description" content="Organize your emails into folders using Drag and Drop" />
      </Helmet>

      <PageHeader 
        title="Email Inbox Organization" 
        subtitle="Drag and drop emails to organize them into folders" 
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" data-testid="page-droppable-container">
        
        {/* Left/Top Panel: Available Items */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Incoming Emails
                <span className="bg-primary/10 text-primary text-xs py-0.5 px-2 rounded-full">
                  {availableItems.length}
                </span>
              </h3>
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-8 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            </div>

            <div 
              className={cn(
                "space-y-3 min-h-[200px] p-2 rounded-lg transition-colors border-2",
                activeZone === 'available' ? "bg-muted/50 border-primary/20" : "bg-muted/20 border-transparent"
              )}
              onDragOver={(e) => handleDragOver(e, 'available')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'available')}
              data-testid="zone-available"
            >
              {availableItems.length > 0 ? (
                availableItems.map(item => renderDraggableItem(item))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm py-10 opacity-60">
                  <Inbox className="h-8 w-8 mb-2" />
                  <p>All caught up!</p>
                </div>
              )}
            </div>
          </div>

          <ResultPanel title="Organization Log">
            {history.length > 0 ? (
                <ul className="space-y-2 text-xs" data-testid="result-panel-history">
                {history.slice(0, 8).map((entry, i) => (
                    <li key={i} className="flex gap-2 items-center text-muted-foreground animate-in fade-in slide-in-from-left-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="truncate">{entry}</span>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground" data-testid="text-no-history">
                    <Mail className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-sm">Drag emails to folders to start</p>
                </div>
            )}
        </ResultPanel>
        </div>

        {/* Right/Bottom Panel: Drop Zones */}
        <div className="xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ZONES.map((zone) => {
                    const ZoneIcon = ICONS[zone.icon] || Folder;
                    const zoneItems = items.filter(i => i.zone === zone.id);
                    const isActive = activeZone === zone.id;

                    return (
                        <div
                            key={zone.id}
                            onDragOver={(e) => handleDragOver(e, zone.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, zone.id)}
                            className={cn(
                                "relative flex flex-col min-h-[180px] p-4 rounded-xl border-2 border-dashed transition-all duration-300",
                                isActive ? zone.activeColor : zone.color,
                                "bg-opacity-50"
                            )}
                            data-testid={zone.testId}
                        >
                            <div className="flex items-center justify-between mb-4 pointer-events-none">
                                <div className="flex items-center gap-2">
                                    <div className={cn("p-2 rounded-lg bg-white/50 shadow-sm")}>
                                        <ZoneIcon className="h-5 w-5 opacity-80" />
                                    </div>
                                    <span className="font-semibold">{zone.label}</span>
                                </div>
                                <span className="text-xs font-medium bg-white/50 px-2 py-1 rounded-full">
                                    {zoneItems.length}
                                </span>
                            </div>

                            <div className="flex-1 space-y-2">
                                {zoneItems.length > 0 ? (
                                    zoneItems.map(item => renderDraggableItem(item))
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <p className={cn("text-sm font-medium opacity-40 select-none transition-all", isActive && "scale-110 text-primary opacity-80")}>
                                            {isActive ? 'Drop Here' : 'Empty'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </>
  );
}
