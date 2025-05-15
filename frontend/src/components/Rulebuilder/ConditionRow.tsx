import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Condition, ConditionOperator } from "@/types";
import { X } from "lucide-react";

interface ConditionRowProps {
  condition: Condition;
  onUpdate: (id: string, field: keyof Condition, value: any) => void;
  onDelete: (id: string) => void;
  isOnly: boolean;
}

const ConditionRow: React.FC<ConditionRowProps> = ({ condition, onUpdate, onDelete, isOnly }) => {
  const fields = [
    { value: 'spend', label: 'Customer Spend' },
    { value: 'visits', label: 'Number of Visits' },
    { value: 'inactive', label: 'Inactive for Days' }
  ];

  const operators: { [key: string]: { value: ConditionOperator, label: string }[] } = {
    spend: [
      { value: 'greaterThan', label: '>' },
      { value: 'lessThan', label: '<' },
      { value: 'equals', label: '=' }
    ],
    visits: [
      { value: 'greaterThan', label: '>' },
      { value: 'lessThan', label: '<' },
      { value: 'equals', label: '=' }
    ],
    inactive: [
      { value: 'greaterThan', label: '>' },
      { value: 'lessThan', label: '<' },
      { value: 'equals', label: '=' }
    ]
  };

  const handleFieldChange = (value: string) => {
    onUpdate(condition.id, 'field', value);
    // Reset operator when field changes
    onUpdate(condition.id, 'operator', operators[value][0].value);
  };

  const handleOperatorChange = (value: string) => {
    onUpdate(condition.id, 'operator', value as ConditionOperator);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(condition.id, 'value', e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-white rounded-md border border-gray-200 shadow-sm">
      <Select value={condition.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {fields.map(field => (
            <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={condition.operator} onValueChange={handleOperatorChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {operators[condition.field]?.map(op => (
            <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        value={condition.value}
        onChange={handleValueChange}
        className="w-[120px]"
        placeholder="Value"
      />
      
      {!isOnly && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-gray-600" 
          onClick={() => onDelete(condition.id)}
        >
          <X size={18} />
        </Button>
      )}
    </div>
  );
};

export default ConditionRow;