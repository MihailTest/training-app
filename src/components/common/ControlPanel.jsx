
import React from 'react';

export default function ControlPanel({ children, title }) {
  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm" data-testid="control-panel-container">
      {title && <h2 className="text-lg font-semibold mb-4" data-testid="control-panel-title">{title}</h2>}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
