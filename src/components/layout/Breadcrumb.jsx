
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    { label: 'Home', path: '/' }
  ];

  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Map path segments to readable labels
    let label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    // Custom mapping for top-level categories
    if (segment === 'form-controls') label = 'Form Controls';
    if (segment === 'user-registration') label = 'User Registration';
    if (segment === 'browser-interactions') label = 'Browser Interactions';
    if (segment === 'interactive-components') label = 'Interactive Components';
    if (segment === 'drag-drop') label = 'Drag & Drop';
    if (segment === 'auth') label = 'Auth';

    breadcrumbItems.push({ label, path: currentPath });
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm" data-testid="breadcrumb-container">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          {index === breadcrumbItems.length - 1 ? (
            <span className="font-medium text-foreground" aria-current="page" data-testid={`breadcrumb-current-${index}`}>
              {index === 0 ? <Home className="h-4 w-4" /> : item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`breadcrumb-link-${index}`}
            >
              {index === 0 ? <Home className="h-4 w-4" /> : item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
