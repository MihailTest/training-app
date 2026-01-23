
import React from 'react';

export default function Footer() {
  const buildDate = new Date().toLocaleDateString();
  const version = '1.0.0';

  return (
    <footer className="border-t bg-card mt-auto" data-testid="footer-container">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium">rotaru.qa-ui-practice-hub</span> v{version}
          </p>
          <p>Built on {buildDate}</p>
          <p>© 2026 rotaru.qa-ui-practice-hub. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
