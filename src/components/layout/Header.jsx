
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import Breadcrumb from './Breadcrumb';

export default function Header({ onMenuToggle }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm" data-testid="header-container">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent" data-testid="header-title">
            UI Practice Hub
          </h1>
        </div>

        <div className="hidden md:block flex-1 px-8">
          <Breadcrumb />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          data-testid="button-theme-toggle"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <div className="md:hidden px-4 pb-3">
        <Breadcrumb />
      </div>
    </header>
  );
}
