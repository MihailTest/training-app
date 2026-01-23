
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { User, Check } from 'lucide-react';

const teamMembers = [
    { name: 'John Smith', role: 'Frontend Dev' },
    { name: 'Sarah Johnson', role: 'Product Manager' },
    { name: 'Mike Davis', role: 'Backend Dev' },
    { name: 'Emily Brown', role: 'Designer' },
    { name: 'Alex Wilson', role: 'QA Engineer' },
    { name: 'Jessica Taylor', role: 'DevOps' }
];

export default function MultiSelectListPage() {
  const [selected, setSelected] = useState([]);

  const toggleMember = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <>
      <Helmet>
        <title>Team Member Assignment - UI Practice Hub</title>
        <meta name="description" content="Assign team members to projects" />
      </Helmet>

      <PageHeader title="Team Member Assignment" subtitle="Assign team members to projects" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-selectable-container">
        <ControlPanel title="Available Team Members">
          <div role="listbox" aria-multiselectable="true" className="space-y-2" data-testid="selectable-list">
            {teamMembers.map(member => {
              const isSelected = selected.includes(member.name);
              return (
                  <div
                    key={member.name}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => toggleMember(member.name)}
                    className={`p-3 rounded-lg cursor-pointer transition-all border flex items-center justify-between ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-accent hover:border-accent-foreground/20 border-transparent'
                    }`}
                    data-testid={`item-selectable-${member.name.toLowerCase().replace(' ', '-')}`} // Preserving format but mapping content
                  >
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-muted'}`}>
                            <User className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className={`text-xs ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{member.role}</div>
                        </div>
                    </div>
                    {isSelected && <Check className="h-5 w-5" />}
                  </div>
              );
            })}
          </div>
          <Button onClick={() => setSelected([])} variant="outline" className="mt-4 w-full" data-testid="button-clear-selection">
            Clear Assignment
          </Button>
        </ControlPanel>

        <ResultPanel title={`Project Team (${selected.length})`}>
          {selected.length > 0 ? (
            <div className="space-y-4" data-testid="result-panel-selected">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.map(name => {
                      const member = teamMembers.find(m => m.name === name);
                      return (
                        <div key={name} className="flex items-center gap-2 p-2 bg-muted/30 rounded border text-sm">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                                {name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="overflow-hidden">
                                <div className="font-medium truncate">{name}</div>
                                <div className="text-xs text-muted-foreground truncate">{member?.role}</div>
                            </div>
                        </div>
                      );
                  })}
              </div>
              
              <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  The selected members will be notified via email upon assignment confirmation.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground" data-testid="text-no-selection">
                <User className="h-8 w-8 mb-2 opacity-30" />
                <p>Select members to build the team</p>
            </div>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
