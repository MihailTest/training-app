
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center" data-testid="section-not-found">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4" data-testid="text-404-title">
          404
        </h1>
        
        <h2 className="text-3xl font-bold mb-4" data-testid="text-404-subtitle">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8 max-w-md" data-testid="text-404-message">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        
        <Button asChild size="lg" data-testid="link-home-from-404">
          <Link to="/" className="gap-2">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </>
  );
}
