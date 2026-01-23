
import React from 'react';

export default function ResultPanel({ children, title = "Output" }) {
  return (
    <div 
      className="bg-card border rounded-lg p-6 shadow-sm"
      aria-label={title}
      aria-live="polite"
      data-testid="result-panel-container"
    >
      <h2 className="text-lg font-semibold mb-4" data-testid="result-panel-title">{title}</h2>
      <div className="min-h-[100px]" data-testid="result-panel-content">
        {children}
      </div>
    </div>
  );
}
