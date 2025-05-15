import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DeliveryStatus, Condition, RuleGroup } from "@/types";
import { format } from "date-fns";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  // Simple ID generator for demo purposes
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

export function simulateDelivery(): { status: DeliveryStatus, message?: string } {
  const successRate = 0.9; // 90% success
  if (Math.random() < successRate) {
    return { status: 'SENT' };
  } else {
    return { 
      status: 'FAILED',
      message: 'Failed to deliver message to customer.'
    };
  }
}

// Format price from cents to dollars with currency symbol
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(price / 100);
}

// Format date
export function formatDate(date: Date): string {
  return format(date, 'PPP');
}

// Create a new condition for rule builder
export function createCondition(): Condition {
  return {
    id: generateId(),
    field: 'spend',
    operator: 'greaterThan',
    value: 10000
  };
}

// Create a new rule group for campaign targeting
export function createRuleGroup(): RuleGroup {
  return {
    id: generateId(),
    conditions: [createCondition()],
    operator: 'AND'
  };
}
