
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { Rocket, Check, Code, PenTool, Layout } from 'lucide-react';

const milestones = [
    { name: 'Planning', value: 30, icon: <Layout className="h-4 w-4" /> },
    { name: 'Design', value: 60, icon: <PenTool className="h-4 w-4" /> },
    { name: 'Development', value: 80, icon: <Code className="h-4 w-4" /> },
    { name: 'Testing', value: 90, icon: <Check className="h-4 w-4" /> },
    { name: 'Deployment', value: 100, icon: <Rocket className="h-4 w-4" /> },
];

export default function ProgressTrackingPage() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => setProgress(p => Math.min(100, p + 1)), 50);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsRunning(false);
    }
  }, [isRunning, progress]);

  const currentMilestone = milestones.find(m => progress < m.value) || milestones[milestones.length - 1];
  const completedMilestones = milestones.filter(m => progress >= m.value);

  return (
    <>
      <Helmet>
        <title>Project Milestone Progress - UI Practice Hub</title>
        <meta name="description" content="Track project milestones and progress" />
      </Helmet>

      <PageHeader title="Project Milestone Progress" subtitle="Track project milestones and progress" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-progress-bar-container">
        <ControlPanel title="Simulation Controls">
          <div className="space-y-6">
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Total Completion</span>
                    <span className="font-bold text-primary">{progress}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                        data-testid="progress-bar"
                    />
                </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => setIsRunning(true)} disabled={isRunning || progress >= 100} data-testid="button-start-progress">Start Project</Button>
              <Button onClick={() => setIsRunning(false)} disabled={!isRunning} variant="outline" data-testid="button-stop-progress">Pause</Button>
              <Button onClick={() => { setProgress(0); setIsRunning(false); }} variant="destructive" data-testid="button-reset-progress">Reset</Button>
              <Button onClick={() => setProgress(p => Math.min(100, p + 20))} variant="secondary" data-testid="button-add-10-progress">Sprint (+20%)</Button>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Milestone Timeline">
          <div className="space-y-4 relative pl-4 border-l-2 border-muted ml-2" data-testid="result-panel-progress-info">
             {milestones.map((milestone, index) => {
                 const isCompleted = progress >= milestone.value;
                 const isCurrent = !isCompleted && (index === 0 || progress >= milestones[index-1].value);
                 
                 return (
                    <div key={milestone.name} className={`relative pl-6 transition-all duration-300 ${isCompleted ? 'opacity-100' : isCurrent ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`absolute -left-[21px] top-0 p-1 rounded-full border-2 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isCurrent ? 'bg-white border-primary text-primary' : 'bg-white border-muted text-muted-foreground'}`}>
                            {isCompleted ? <Check className="h-3 w-3" /> : milestone.icon}
                        </div>
                        <h4 className={`font-semibold ${isCompleted ? 'text-green-600' : ''}`}>{milestone.name}</h4>
                        <p className="text-xs text-muted-foreground">Target: {milestone.value}% completion</p>
                    </div>
                 );
             })}
             
             {progress >= 100 && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-bold animate-in zoom-in" data-testid="text-progress-completed">
                    🚀 Project Successfully Deployed!
                </div>
             )}
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
