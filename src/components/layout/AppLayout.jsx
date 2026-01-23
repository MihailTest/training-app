
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import Footer from './Footer';
import { Button } from '@/components/ui/button';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  return (
    <div 
      className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300"
      data-testid="app-layout-container"
    >
      <div className="flex flex-1">
        <SideMenu />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8" data-testid="main-content-container">
          <div className="max-w-7xl mx-auto">
            {!isHomePage && (
              <div className="mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate(-1)}
                  className="pl-0 hover:bg-transparent hover:text-primary transition-colors"
                  data-testid="button-back"
                >
                  ← Back
                </Button>
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
