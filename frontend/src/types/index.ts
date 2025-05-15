// Customer types
export interface Customer {
  id: number;
  name: string;
  email: string;
  spend: number;
  visits: number;
  lastActive: Date;
}

// Rule types
export type ConditionOperator = 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'contains' | 'notContains';
export type LogicalOperator = 'AND' | 'OR';

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string | number;
}

export interface RuleGroup {
  id: string;
  conditions: Condition[];
  operator: LogicalOperator;
  groups?: RuleGroup[];
}

// Campaign types
export interface Campaign {
  id: string;
  name: string;
  rules: RuleGroup;
  createdAt: Date;
  audienceSize: number;
  sent: number;
  failed: number;
  message: string;
}

// Delivery status
export type DeliveryStatus = 'SENT' | 'FAILED' | 'PENDING';

export interface CommunicationLog {
  id: string;
  campaignId: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  message: string;
  sentAt: Date;
  status: DeliveryStatus;
}

// Delivery receipt
export interface DeliveryReceipt {
  id: string;
  campaignId: string;
  campaignName: string;
  customerId: number;
  customerName: string;
  messageContent: string;
  status: DeliveryStatus;
  sentAt: Date;
}

// E-commerce types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: number;
  orderDate: Date;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}
