
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { ChevronRight, ChevronDown } from 'lucide-react';

const treeData = {
  id: 'home',
  label: 'Home',
  children: [
    {
      id: 'desktop',
      label: 'Desktop',
      children: [
        { id: 'notes', label: 'Notes', children: [] },
        { id: 'commands', label: 'Commands', children: [] }
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      children: [
        { id: 'workspace', label: 'WorkSpace', children: [] },
        { id: 'office', label: 'Office', children: [] }
      ]
    },
    {
      id: 'downloads',
      label: 'Downloads',
      children: [
        { id: 'word', label: 'Word File.doc', children: [] },
        { id: 'excel', label: 'Excel File.xlsx', children: [] }
      ]
    }
  ]
};

function TreeNode({ node, selected, expanded, onToggle, onSelect, level = 0 }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.includes(node.id);
  const isSelected = selected.includes(node.id);
  const isIndeterminate = hasChildren && node.children.some(child => 
    selected.includes(child.id) || 
    (child.children && child.children.some(gc => selected.includes(gc.id)))
  ) && !isSelected;

  return (
    <div style={{ marginLeft: `${level * 24}px` }}>
      <div className="flex items-center gap-2 py-1">
        {hasChildren && (
          <button
            onClick={() => onToggle(node.id)}
            className="p-0.5 hover:bg-accent rounded"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            aria-expanded={isExpanded}
            data-testid={`button-toggle-${node.id}`}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {!hasChildren && <span className="w-5" />}
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            ref={input => {
              if (input) input.indeterminate = isIndeterminate;
            }}
            onChange={() => onSelect(node.id)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            data-testid={`checkbox-${node.id}`}
          />
          <span data-testid={`label-${node.id}`}>{node.label}</span>
        </label>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              selected={selected}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CheckboxPage() {
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState(['home']);

  const getAllChildIds = (node) => {
    let ids = [node.id];
    if (node.children) {
      node.children.forEach(child => {
        ids = [...ids, ...getAllChildIds(child)];
      });
    }
    return ids;
  };

  const handleToggle = (id) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelect = (id) => {
    const findNode = (node, targetId) => {
      if (node.id === targetId) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(treeData, id);
    if (!node) return;

    const childIds = getAllChildIds(node);
    
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(i => !childIds.includes(i)));
    } else {
      setSelected(prev => [...new Set([...prev, ...childIds])]);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setExpanded(['home']);
  };

  return (
    <>
      <Helmet>
        <title>Checkbox - UI Practice Hub</title>
        <meta name="description" content="Practice checkbox tree interactions" />
      </Helmet>

      <PageHeader
        title="Checkbox"
        subtitle="Practice nested checkbox selection with expand/collapse"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-checkbox-container">
        <ControlPanel title="Checkbox Tree">
          <TreeNode
            node={treeData}
            selected={selected}
            expanded={expanded}
            onToggle={handleToggle}
            onSelect={handleSelect}
          />
          
          <div className="mt-4 pt-4 border-t">
            <ResetButton onClick={handleReset} />
          </div>
        </ControlPanel>

        <ResultPanel title="Selected Items">
          {selected.length > 0 ? (
            <ul className="list-disc list-inside space-y-1" data-testid="result-panel-selected-items">
              {selected.map(id => (
                <li key={id} className="text-sm" data-testid={`selected-item-${id}`}>{id}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-selection">No items selected</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
