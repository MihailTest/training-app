
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const skillData = [
  {
    id: 'frontend',
    label: 'Frontend Skills',
    children: [
      { id: 'react', label: 'React', children: [] },
      { id: 'vue', label: 'Vue', children: [] },
      { id: 'angular', label: 'Angular', children: [] },
      { id: 'typescript', label: 'TypeScript', children: [] },
      { id: 'css', label: 'CSS', children: [] }
    ]
  },
  {
    id: 'backend',
    label: 'Backend Skills',
    children: [
      { id: 'nodejs', label: 'Node.js', children: [] },
      { id: 'python', label: 'Python', children: [] },
      { id: 'java', label: 'Java', children: [] },
      { id: 'go', label: 'Go', children: [] },
      { id: 'sql', label: 'SQL', children: [] }
    ]
  },
  {
    id: 'devops',
    label: 'DevOps Skills',
    children: [
      { id: 'docker', label: 'Docker', children: [] },
      { id: 'kubernetes', label: 'Kubernetes', children: [] },
      { id: 'cicd', label: 'CI/CD', children: [] },
      { id: 'aws', label: 'AWS', children: [] },
      { id: 'terraform', label: 'Terraform', children: [] }
    ]
  },
  {
    id: 'softskills',
    label: 'Soft Skills',
    children: [
      { id: 'communication', label: 'Communication', children: [] },
      { id: 'leadership', label: 'Leadership', children: [] },
      { id: 'problem-solving', label: 'Problem Solving', children: [] },
      { id: 'time-management', label: 'Time Management', children: [] },
      { id: 'teamwork', label: 'Teamwork', children: [] }
    ]
  }
];

// Simplified node structure for this new concept, maintaining recursion for flexibility but styling differently
function SkillCategory({ node, selected, isExpanded, onToggle, onSelect }) {
  const hasChildren = node.children && node.children.length > 0;
  
  // Calculate if all children are selected
  const allChildrenSelected = hasChildren && node.children.every(child => selected.includes(child.id));
  const someChildrenSelected = hasChildren && node.children.some(child => selected.includes(child.id));
  
  // For the parent category checkbox state
  const parentChecked = selected.includes(node.id) || allChildrenSelected;
  const parentIndeterminate = someChildrenSelected && !allChildrenSelected;

  return (
    <div className="mb-2 border rounded-lg overflow-hidden bg-card">
      <div className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors">
        <label className="flex items-center gap-3 cursor-pointer select-none flex-1">
          <input
            type="checkbox"
            checked={parentChecked}
            ref={input => {
              if (input) input.indeterminate = parentIndeterminate;
            }}
            onChange={() => onSelect(node.id)}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            data-testid={`checkbox-${node.id}`}
          />
          <span className="font-medium" data-testid={`label-${node.id}`}>{node.label}</span>
        </label>
        
        {hasChildren && (
          <button
            onClick={() => onToggle(node.id)}
            className="p-1 hover:bg-accent rounded-full transition-colors ml-2"
            data-testid={`button-toggle-${node.id}`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-muted/30 border-t"
          >
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {node.children.map(child => (
                <label key={child.id} className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer transition-colors">
                   <input
                    type="checkbox"
                    checked={selected.includes(child.id)}
                    onChange={() => onSelect(child.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    data-testid={`checkbox-${child.id}`}
                  />
                  <span data-testid={`label-${child.id}`}>{child.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NestedCheckboxesPage() {
  const [selected, setSelected] = useState([]);
  const [expandedId, setExpandedId] = useState('frontend'); // Single ID string instead of array

  const handleToggle = (id) => {
    // If clicking the currently open item, close it (set to null), otherwise open the new one
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleSelect = (id) => {
    const findNode = (data, targetId) => {
      for (const item of data) {
        if (item.id === targetId) return item;
        if (item.children) {
          const found = item.children.find(c => c.id === targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(skillData, id);
    if (!node) return;

    // If it's a category (has children), toggle all children
    if (node.children && node.children.length > 0) {
        const childIds = node.children.map(c => c.id);
        const allSelected = childIds.every(cid => selected.includes(cid));
        
        if (allSelected) {
            // Unselect all
            setSelected(prev => prev.filter(pid => !childIds.includes(pid) && pid !== id));
        } else {
            // Select all
            setSelected(prev => [...new Set([...prev, ...childIds, id])]);
        }
    } else {
        // Leaf node
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(i => i !== id));
        } else {
            setSelected(prev => [...prev, id]);
        }
    }
  };

  const handleReset = () => {
    setSelected([]);
    setExpandedId('frontend');
  };

  // Filter out category IDs for the result list to show only specific skills
  const selectedSkills = selected.filter(id => !skillData.some(cat => cat.id === id));

  return (
    <>
      <Helmet>
        <title>Skill Assessment Checklist - UI Practice Hub</title>
        <meta name="description" content="Select your technical and soft skills" />
      </Helmet>

      <PageHeader
        title="Skill Assessment Checklist"
        subtitle="Select your competencies from the categories below"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-checkbox-container">
        <ControlPanel title="Skills Categories">
          <div className="space-y-2">
            {skillData.map(category => (
               <SkillCategory
                key={category.id}
                node={category}
                selected={selected}
                isExpanded={expandedId === category.id} // Pass active state as boolean
                onToggle={handleToggle}
                onSelect={handleSelect}
              />
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <ResetButton onClick={handleReset} />
          </div>
        </ControlPanel>

        <ResultPanel title={`Selected Skills (${selectedSkills.length})`}>
          {selectedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2" data-testid="result-panel-selected-items">
              {selectedSkills.map(id => (
                <span 
                    key={id} 
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium animate-in fade-in zoom-in duration-200"
                    data-testid={`selected-item-${id}`}
                >
                    {/* Find label for display */}
                    {(() => {
                        for (const cat of skillData) {
                            const found = cat.children.find(c => c.id === id);
                            if (found) return found.label;
                        }
                        return id;
                    })()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-selection">No skills selected</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
