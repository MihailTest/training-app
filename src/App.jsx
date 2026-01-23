
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Form Controls
import TextInputPage from '@/pages/form-controls/TextInputPage';
import NestedCheckboxesPage from '@/pages/form-controls/NestedCheckboxesPage';
import RadioSelectionPage from '@/pages/form-controls/RadioSelectionPage';
import DataTablePage from '@/pages/form-controls/DataTablePage';
import ButtonInteractionsPage from '@/pages/form-controls/ButtonInteractionsPage';
import LinkNavigationPage from '@/pages/form-controls/LinkNavigationPage';
import MediaValidationPage from '@/pages/form-controls/MediaValidationPage';
import FileOperationsPage from '@/pages/form-controls/FileOperationsPage';
import DynamicElementsPage from '@/pages/form-controls/DynamicElementsPage';

// User Registration
import StudentRegistrationFormPage from '@/pages/user-registration/StudentRegistrationFormPage';

// Browser Interactions
import WindowManagementPage from '@/pages/browser-interactions/WindowManagementPage';
import NotificationDialogsPage from '@/pages/browser-interactions/NotificationDialogsPage';
import FrameContentPage from '@/pages/browser-interactions/FrameContentPage';
import NestedContentPage from '@/pages/browser-interactions/NestedContentPage';
import ModalWindowsPage from '@/pages/browser-interactions/ModalWindowsPage';

// Interactive Components
import CollapsibleSectionsPage from '@/pages/interactive-components/CollapsibleSectionsPage';
import SearchInputPage from '@/pages/interactive-components/SearchInputPage';
import DateSelectionPage from '@/pages/interactive-components/DateSelectionPage';
import RangeControlPage from '@/pages/interactive-components/RangeControlPage';
import ProgressTrackingPage from '@/pages/interactive-components/ProgressTrackingPage';
import TabbedContentPage from '@/pages/interactive-components/TabbedContentPage';
import HoverHintsPage from '@/pages/interactive-components/HoverHintsPage';
import MenuNavigationPage from '@/pages/interactive-components/MenuNavigationPage';
import DropdownSelectionPage from '@/pages/interactive-components/DropdownSelectionPage';

// Drag & Drop
import ReorderableListPage from '@/pages/drag-drop/ReorderableListPage';
import MultiSelectListPage from '@/pages/drag-drop/MultiSelectListPage';
import ResizableContainerPage from '@/pages/drag-drop/ResizableContainerPage';
import DropZonesPage from '@/pages/drag-drop/DropZonesPage';
// import DraggableElementsPage from '@/pages/drag-drop/DraggableElementsPage'; // Removed

// Auth
import LoginPage from '@/pages/auth/LoginPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>rotaru.qa-ui-practice-hub</title>
        <meta name="description" content="Comprehensive UI practice application with forms, widgets, and interactions" />
      </Helmet>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              
              {/* Form Controls Routes */}
              <Route path="form-controls/text-input" element={<TextInputPage />} />
              <Route path="form-controls/nested-checkboxes" element={<NestedCheckboxesPage />} />
              <Route path="form-controls/radio-selection" element={<RadioSelectionPage />} />
              <Route path="form-controls/data-table" element={<DataTablePage />} />
              <Route path="form-controls/button-interactions" element={<ButtonInteractionsPage />} />
              <Route path="form-controls/link-navigation" element={<LinkNavigationPage />} />
              <Route path="form-controls/media-validation" element={<MediaValidationPage />} />
              <Route path="form-controls/file-operations" element={<FileOperationsPage />} />
              <Route path="form-controls/dynamic-elements" element={<DynamicElementsPage />} />
              
              {/* User Registration Routes */}
              <Route path="user-registration/student-form" element={<StudentRegistrationFormPage />} />
              
              {/* Browser Interactions Routes */}
              <Route path="browser-interactions/window-management" element={<WindowManagementPage />} />
              <Route path="browser-interactions/notification-dialogs" element={<NotificationDialogsPage />} />
              <Route path="browser-interactions/frame-content" element={<FrameContentPage />} />
              <Route path="browser-interactions/nested-content" element={<NestedContentPage />} />
              <Route path="browser-interactions/modal-windows" element={<ModalWindowsPage />} />
              
              {/* Interactive Components Routes */}
              <Route path="interactive-components/collapsible-sections" element={<CollapsibleSectionsPage />} />
              <Route path="interactive-components/search-input" element={<SearchInputPage />} />
              <Route path="interactive-components/date-selection" element={<DateSelectionPage />} />
              <Route path="interactive-components/range-control" element={<RangeControlPage />} />
              <Route path="interactive-components/progress-tracking" element={<ProgressTrackingPage />} />
              <Route path="interactive-components/tabbed-content" element={<TabbedContentPage />} />
              <Route path="interactive-components/hover-hints" element={<HoverHintsPage />} />
              <Route path="interactive-components/menu-navigation" element={<MenuNavigationPage />} />
              <Route path="interactive-components/dropdown-selection" element={<DropdownSelectionPage />} />
              
              {/* Drag & Drop Routes */}
              <Route path="drag-drop/reorderable-list" element={<ReorderableListPage />} />
              <Route path="drag-drop/multi-select-list" element={<MultiSelectListPage />} />
              <Route path="drag-drop/resizable-container" element={<ResizableContainerPage />} />
              <Route path="drag-drop/drop-zones" element={<DropZonesPage />} />
              {/* <Route path="drag-drop/draggable-elements" element={<DraggableElementsPage />} /> */}
              
              {/* Auth Routes */}
              <Route path="auth/login" element={<LoginPage />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
