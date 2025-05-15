import React from 'react';
import { RuleGroup, Condition, LogicalOperator } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateId, createCondition } from '@/lib/utils';
import ConditionRow from './ConditionRow';
import { Toggle } from '@/components/ui/toggle';
import { PlusCircle } from 'lucide-react';

interface RuleGroupProps {
  group: RuleGroup;
  onChange: (group: RuleGroup) => void;
}

const RuleGroupComponent: React.FC<RuleGroupProps> = ({ group, onChange }) => {
  // Update a condition in the group
  const handleConditionUpdate = (id: string, field: keyof Condition, value: any) => {
    const updatedConditions = group.conditions.map(condition => {
      if (condition.id === id) {
        return {
          ...condition,
          [field]: value,
        };
      }
      return condition;
    });

    onChange({
      ...group,
      conditions: updatedConditions,
    });
  };

  // Add a new condition to the group
  const handleAddCondition = () => {
    onChange({
      ...group,
      conditions: [...group.conditions, createCondition()],
    });
  };

  // Delete a condition from the group
  const handleDeleteCondition = (id: string) => {
    if (group.conditions.length === 1) return; // Don't delete the last condition
    
    onChange({
      ...group,
      conditions: group.conditions.filter(condition => condition.id !== id),
    });
  };

  // Toggle the logical operator (AND/OR)
  const handleOperatorToggle = () => {
    onChange({
      ...group,
      operator: group.operator === 'AND' ? 'OR' : 'AND',
    });
  };

  return (
    <Card className="bg-slate-50 border border-slate-200 mb-4">
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Toggle
            pressed={group.operator === 'AND'}
            onPressedChange={() => handleOperatorToggle()}
            className={`mr-2 ${
              group.operator === 'AND' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-500 hover:bg-amber-600'
            } text-white`}
          >
            {group.operator}
          </Toggle>
          <span className="text-sm text-slate-500 font-medium">
            {group.operator === 'AND' ? 'Match all conditions' : 'Match any condition'}
          </span>
        </div>

        <div className="space-y-3">
          {group.conditions.map(condition => (
            <ConditionRow
              key={condition.id}
              condition={condition}
              onUpdate={handleConditionUpdate}
              onDelete={handleDeleteCondition}
              isOnly={group.conditions.length === 1}
            />
          ))}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={handleAddCondition}
        >
          <PlusCircle size={16} className="mr-1" />
          Add Condition
        </Button>
      </CardContent>
    </Card>
  );
};

export default RuleGroupComponent;
