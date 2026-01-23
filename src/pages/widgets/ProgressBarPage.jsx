
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function ProgressBarPage() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => setProgress(p => Math.min(100, p + 1)), 100);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsRunning(false);
    }
  }, [isRunning, progress]);

  return (
    <>
      <Helmet><title>Progress Bar - UI Practice Hub</title></Helmet>
      <PageHeader title="Progress Bar" subtitle="Practice progress bar controls" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-progress-bar-container">
        <ControlPanel title="Progress Controls">
          <div className="space-y-4">
            <progress value={progress} max="100" className="w-full h-4" data-testid="progress-bar" />
            <div className="flex gap-2">
              <Button onClick={() => setIsRunning(true)} disabled={isRunning || progress >= 100} data-testid="button-start-progress">Start</Button>
              <Button onClick={() => setIsRunning(false)} disabled={!isRunning} data-testid="button-stop-progress">Stop</Button>
              <Button onClick={() => { setProgress(0); setIsRunning(false); }} data-testid="button-reset-progress">Reset</Button>
              <Button onClick={() => setProgress(p => Math.min(100, p + 10))} data-testid="button-add-10-progress">+10%</Button>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Progress Status">
          <div className="space-y-2" data-testid="result-panel-progress-info">
            <p className="text-3xl font-bold text-primary">{progress}%</p>
            {progress >= 100 && <p className="text-green-600 font-semibold" data-testid="text-progress-completed">✓ Completed!</p>}
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
