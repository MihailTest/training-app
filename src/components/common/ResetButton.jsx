
import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResetButton({ onClick, children = "Reset" }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="gap-2"
      data-testid="button-reset"
    >
      <RotateCcw className="h-4 w-4" />
      {children}
    </Button>
  );
}
