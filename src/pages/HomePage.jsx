import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Radio, Table, MousePointer, ExternalLink, FileCheck, FileUp, Settings, UserPlus, AppWindow, Bell, Frame, Layers, MessageSquare, ChevronDown, Search, Calendar, Sliders, BarChart, Layout, HelpCircle, Menu, List, ListOrdered, Check, Maximize, Inbox, Move, ArrowRight, LogOut } from 'lucide-react';
const categories = [{
  title: 'Form Controls',
  description: 'Practice basic and advanced form elements',
  id: 'form-controls',
  color: 'from-blue-500 to-cyan-500',
  items: [{
    label: 'Text Input',
    path: '/form-controls/text-input',
    icon: FileText,
    desc: 'Input validation & submission'
  }, {
    label: 'Nested Checkboxes',
    path: '/form-controls/nested-checkboxes',
    icon: CheckSquare,
    desc: 'Tree structure selection'
  }, {
    label: 'Radio Selection',
    path: '/form-controls/radio-selection',
    icon: Radio,
    desc: 'Option groups & toggles'
  }, {
    label: 'Data Table',
    path: '/form-controls/data-table',
    icon: Table,
    desc: 'Sort, search & pagination'
  }, {
    label: 'Button Interactions',
    path: '/form-controls/button-interactions',
    icon: MousePointer,
    desc: 'Click events & states'
  }, {
    label: 'Link Navigation',
    path: '/form-controls/link-navigation',
    icon: ExternalLink,
    desc: 'Routing & redirects'
  }, {
    label: 'Media Validation',
    path: '/form-controls/media-validation',
    icon: FileCheck,
    desc: 'File type & size checks'
  }, {
    label: 'File Operations',
    path: '/form-controls/file-operations',
    icon: FileUp,
    desc: 'Upload & download flows'
  }, {
    label: 'Dynamic Elements',
    path: '/form-controls/dynamic-elements',
    icon: Settings,
    desc: 'DOM manipulation'
  }]
}, {
  title: 'User Registration',
  description: 'Complete user flows and validation',
  id: 'user-registration',
  color: 'from-green-500 to-emerald-500',
  items: [{
    label: 'Student Registration',
    path: '/user-registration/student-form',
    icon: UserPlus,
    desc: 'Complex form workflow'
  }]
}, {
  title: 'Browser Interactions',
  description: 'Handle windows, frames and alerts',
  id: 'browser-interactions',
  color: 'from-orange-500 to-red-500',
  items: [{
    label: 'Window Management',
    path: '/browser-interactions/window-management',
    icon: AppWindow,
    desc: 'Tabs & windows'
  }, {
    label: 'Notification Dialogs',
    path: '/browser-interactions/notification-dialogs',
    icon: Bell,
    desc: 'Alerts & confirms'
  }, {
    label: 'Frame Content',
    path: '/browser-interactions/frame-content',
    icon: Frame,
    desc: 'iFrame switching'
  }, {
    label: 'Nested Content',
    path: '/browser-interactions/nested-content',
    icon: Layers,
    desc: 'Deeply nested frames'
  }, {
    label: 'Modal Windows',
    path: '/browser-interactions/modal-windows',
    icon: MessageSquare,
    desc: 'Popups & overlays'
  }]
}, {
  title: 'Interactive Components',
  description: 'Modern UI patterns and widgets',
  id: 'interactive-components',
  color: 'from-purple-500 to-pink-500',
  items: [{
    label: 'Collapsible Sections',
    path: '/interactive-components/collapsible-sections',
    icon: ChevronDown,
    desc: 'Accordions & toggles'
  }, {
    label: 'Search Input',
    path: '/interactive-components/search-input',
    icon: Search,
    desc: 'Autocomplete & filter'
  }, {
    label: 'Date Selection',
    path: '/interactive-components/date-selection',
    icon: Calendar,
    desc: 'Pickers & ranges'
  }, {
    label: 'Range Control',
    path: '/interactive-components/range-control',
    icon: Sliders,
    desc: 'Sliders & inputs'
  }, {
    label: 'Progress Tracking',
    path: '/interactive-components/progress-tracking',
    icon: BarChart,
    desc: 'Loaders & steps'
  }, {
    label: 'Tabbed Content',
    path: '/interactive-components/tabbed-content',
    icon: Layout,
    desc: 'Tab panels'
  }, {
    label: 'Hover Hints',
    path: '/interactive-components/hover-hints',
    icon: HelpCircle,
    desc: 'Tooltips & popovers'
  }, {
    label: 'Menu Navigation',
    path: '/interactive-components/menu-navigation',
    icon: Menu,
    desc: 'Dropdowns & submenus'
  }, {
    label: 'Dropdown Selection',
    path: '/interactive-components/dropdown-selection',
    icon: List,
    desc: 'Select menus'
  }]
}, {
  title: 'Drag & Drop',
  description: 'Advanced mouse interactions',
  id: 'drag-drop',
  color: 'from-indigo-500 to-blue-500',
  items: [{
    label: 'Reorderable List',
    path: '/drag-drop/reorderable-list',
    icon: ListOrdered,
    desc: 'Sortable items'
  }, {
    label: 'Multi-Select List',
    path: '/drag-drop/multi-select-list',
    icon: Check,
    desc: 'Selection patterns'
  }, {
    label: 'Resizable Container',
    path: '/drag-drop/resizable-container',
    icon: Maximize,
    desc: 'Resize handles'
  }, {
    label: 'Drop Zones',
    path: '/drag-drop/drop-zones',
    icon: Inbox,
    desc: 'File drops'
  }, {
    label: 'Draggable Elements',
    path: '/drag-drop/draggable-elements',
    icon: Move,
    desc: 'Free drag'
  }]
}];
export default function HomePage() {
  const {
    isAuthenticated,
    logout
  } = useAuth();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      duration: 2000
    });
    navigate('/auth/login');
  };
  return <>
      <Helmet>
        <title>Home - rotaru.qa-ui-practice-hub</title>
        <meta name="description" content="Welcome to rotaru.qa-ui-practice-hub - A comprehensive platform to practice UI automation and testing" />
      </Helmet>

      <div className="min-h-screen py-10 relative" data-testid="page-home-container">
        
        {/* Logout Button in Header Area */}
        {isAuthenticated && <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20" data-testid="button-logout-header">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>}

        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16" data-testid="section-hero">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold" data-testid="text-welcome">Welcome to rotaru.qa-ui-practice-hub</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary tracking-tight" data-testid="text-hero-title"></h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-description">
            UI playground to exercise complex interaction scenarios and edge cases
          </p>
        </motion.div>

        {/* Categories Sections */}
        <div className="space-y-16 max-w-7xl mx-auto px-4">
          {categories.map(category => <div key={category.id} id={category.id} className="scroll-mt-20">
              <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="mb-8">
                <h2 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent inline-block mb-2`}>
                  {category.title}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => {
              const Icon = item.icon;
              return <motion.div key={item.path} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: index * 0.05
              }}>
                      <Link to={item.path} className="block h-full group" data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        <div className="h-full bg-card border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-5 rounded-bl-full transition-opacity group-hover:opacity-10`} />
                          
                          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} mb-4 text-white shadow-md`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                            {item.label}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {item.desc}
                          </p>
                          
                          <div className="flex items-center text-sm font-medium text-primary mt-auto">
                            Start Practice
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>;
            })}
              </div>
            </div>)}
        </div>
      </div>
    </>;
}