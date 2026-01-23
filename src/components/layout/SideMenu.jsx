
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Square, FileText, AlertCircle, Package, MousePointer, Lock, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const menuItems = [
  {
    type: 'link',
    label: 'Home',
    icon: Home,
    path: '/'
  },
  {
    type: 'category',
    label: 'Form Controls',
    icon: Square,
    items: [
      { label: 'Text Input', path: '/form-controls/text-input' },
      { label: 'Nested Checkboxes', path: '/form-controls/nested-checkboxes' },
      { label: 'Radio Selection', path: '/form-controls/radio-selection' },
      { label: 'Data Table', path: '/form-controls/data-table' },
      { label: 'Button Interactions', path: '/form-controls/button-interactions' },
      { label: 'Link Navigation', path: '/form-controls/link-navigation' },
      { label: 'Media Validation', path: '/form-controls/media-validation' },
      { label: 'File Operations', path: '/form-controls/file-operations' },
      { label: 'Dynamic Elements', path: '/form-controls/dynamic-elements' }
    ]
  },
  {
    type: 'category',
    label: 'User Registration',
    icon: FileText,
    items: [
      { label: 'Student Registration Form', path: '/user-registration/student-form' }
    ]
  },
  {
    type: 'category',
    label: 'Browser Interactions',
    icon: AlertCircle,
    items: [
      { label: 'Window Management', path: '/browser-interactions/window-management' },
      { label: 'Notification Dialogs', path: '/browser-interactions/notification-dialogs' },
      { label: 'Frame Content', path: '/browser-interactions/frame-content' },
      { label: 'Nested Content', path: '/browser-interactions/nested-content' },
      { label: 'Modal Windows', path: '/browser-interactions/modal-windows' }
    ]
  },
  {
    type: 'category',
    label: 'Interactive Components',
    icon: Package,
    items: [
      { label: 'Collapsible Sections', path: '/interactive-components/collapsible-sections' },
      { label: 'Search Input', path: '/interactive-components/search-input' },
      { label: 'Date Selection', path: '/interactive-components/date-selection' },
      { label: 'Range Control', path: '/interactive-components/range-control' },
      { label: 'Progress Tracking', path: '/interactive-components/progress-tracking' },
      { label: 'Tabbed Content', path: '/interactive-components/tabbed-content' },
      { label: 'Hover Hints', path: '/interactive-components/hover-hints' },
      { label: 'Menu Navigation', path: '/interactive-components/menu-navigation' },
      { label: 'Dropdown Selection', path: '/interactive-components/dropdown-selection' }
    ]
  },
  {
    type: 'category',
    label: 'Drag & Drop',
    icon: MousePointer,
    items: [
      { label: 'Reorderable List', path: '/drag-drop/reorderable-list' },
      { label: 'Multi-Select List', path: '/drag-drop/multi-select-list' },
      { label: 'Resizable Container', path: '/drag-drop/resizable-container' },
      { label: 'Drop Zones', path: '/drag-drop/drop-zones' },
      // { label: 'Draggable Elements', path: '/drag-drop/draggable-elements' } // Removed
    ]
  },
  {
    type: 'category',
    label: 'Auth',
    icon: Lock,
    items: [
      { label: 'Login', path: '/auth/login' }
    ]
  }
];

export default function SideMenu({ isOpen = false, onClose = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [expandedCategory, setExpandedCategory] = React.useState(null);

  useEffect(() => {
    const activeCategory = menuItems.find(item =>
      item.type === 'category' &&
      item.items.some(sub => location.pathname.startsWith(sub.path))
    );
    if (activeCategory) {
      setExpandedCategory(activeCategory.label);
    }
  }, [location.pathname]);

  const toggleCategory = (label) => {
    setExpandedCategory(prev => (prev === label ? null : label));
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      duration: 2000,
    });
    navigate('/auth/login');
    onClose();
  };

  const getTestId = (prefix, label) => 
    `${prefix}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            data-testid="menu-backdrop"
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-64 
          bg-card border-r shadow-lg flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        data-testid="menu-side-container"
      >
        <div className="p-4 border-b flex items-center h-16 flex-shrink-0">
           <Link to="/" onClick={onClose} className="hover:opacity-80 transition-opacity">
             <h1 className="text-xl font-bold text-primary tracking-tight" data-testid="app-title">
              rotaru.qa
            </h1>
           </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.type === 'link') {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.path} className="mb-2">
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                    data-testid={getTestId('menu-item', item.label)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </div>
              );
            }

            const isExpanded = expandedCategory === item.label;
            return (
              <div key={item.label} className="mb-2">
                <button
                  onClick={() => toggleCategory(item.label)}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`category-${item.label}`}
                  data-testid={getTestId('menu-category', item.label)}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`category-${item.label}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                      data-testid={getTestId('menu-group', item.label)}
                    >
                      <div className="ml-6 mt-1 space-y-1">
                        {item.items.map((subItem) => {
                          const isActive = location.pathname === subItem.path;
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={onClose}
                              className={`
                                block p-2 rounded-lg text-sm transition-colors
                                ${isActive
                                  ? 'bg-primary text-primary-foreground font-medium'
                                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                                }
                              `}
                              aria-current={isActive ? 'page' : undefined}
                              data-testid={getTestId('menu-subitem', subItem.label)}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {isAuthenticated && (
          <div className="p-4 border-t mt-auto bg-card">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              data-testid="button-logout-sidebar"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
