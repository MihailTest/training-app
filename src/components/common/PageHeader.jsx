
import React from 'react';

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6" data-testid="page-header-container">
      <h1 className="text-3xl font-bold mb-2" data-testid="page-title">{title}</h1>
      {subtitle && <p className="text-muted-foreground" data-testid="page-subtitle">{subtitle}</p>}
    </div>
  );
}
