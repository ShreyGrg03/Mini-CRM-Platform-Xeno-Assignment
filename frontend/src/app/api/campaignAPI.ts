import { Campaign, CommunicationLog, Customer, DeliveryStatus, RuleGroup } from "@/types";
import { generateId, simulateDelivery } from "@/lib/utils";
import { mockCustomers, mockDB } from "@/lib/db";

// Evaluate rules against the customer database and return matching customers
export const evaluateAudience = async (rules: RuleGroup): Promise<Customer[]> => {
  // In a real app, this would query MongoDB using aggregation
  return mockCustomers.filter(customer => {
    try {
      return evaluateCustomerAgainstRules(customer, rules);
    } catch (error) {
      console.error("Error evaluating customer:", error);
      return false;
    }
  });
};

// Evaluate a single customer against the rule set
const evaluateCustomerAgainstRules = (customer: Customer, ruleGroup: RuleGroup): boolean => {
  // Evaluate all conditions in the group
  const conditionResults = ruleGroup.conditions.map(condition => {
    const { field, operator, value } = condition;
    
    // Handle special case for inactivity days
    if (field === "inactive") {
      const daysInactive = Math.floor((Date.now() - customer.lastActive.getTime()) / (1000 * 60 * 60 * 24));
      return operator === "greaterThan" ? daysInactive > Number(value) : daysInactive < Number(value);
    }
    
    // Handle other fields
    if (field === "spend") {
      if (operator === "greaterThan") return customer.spend > Number(value);
      if (operator === "lessThan") return customer.spend < Number(value);
      if (operator === "equals") return customer.spend === Number(value);
    }
    
    if (field === "visits") {
      if (operator === "greaterThan") return customer.visits > Number(value);
      if (operator === "lessThan") return customer.visits < Number(value);
      if (operator === "equals") return customer.visits === Number(value);
    }
    
    return false;
  });
  
  // Evaluate all nested groups (if any)
  const groupResults = ruleGroup.groups?.map(group => evaluateCustomerAgainstRules(customer, group)) || [];
  
  // Combine results based on the logical operator
  const allResults = [...conditionResults, ...groupResults];
  
  if (allResults.length === 0) return false;
  
  return ruleGroup.operator === "AND" 
    ? allResults.every(Boolean) 
    : allResults.some(Boolean);
};

// Create a new campaign and deliver messages
export const createCampaign = async (
  name: string,
  rules: RuleGroup,
  message: string
): Promise<Campaign> => {
  const audience = await evaluateAudience(rules);
  
  const campaign: Campaign = {
    id: generateId(),
    name,
    rules,
    createdAt: new Date(),
    audienceSize: audience.length,
    sent: 0,
    failed: 0,
    message
  };
  
  // Save campaign using our mockDB
  await mockDB.saveCampaign(campaign);
  
  // Process delivery in the background
  deliverCampaign(campaign, audience);
  
  return campaign;
};

// Deliver messages to the audience
const deliverCampaign = async (campaign: Campaign, audience: Customer[]): Promise<void> => {
  const deliveryLogs: CommunicationLog[] = [];
  let sent = 0;
  let failed = 0;
  
  // Deliver to each customer
  for (const customer of audience) {
    // Simulate API delivery (90% success rate)
    const result = simulateDelivery();
    const status: DeliveryStatus = result.status;
    
    // Create a log
    const log: CommunicationLog = {
      id: generateId(),
      campaignId: campaign.id,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      message: campaign.message.replace('{name}', customer.name),
      sentAt: new Date(),
      status
    };
    
    deliveryLogs.push(log);
    
    // Update counters
    if (status === 'SENT') {
      sent++;
    } else {
      failed++;
    }
  }
  
  // Update campaign stats
  const updatedCampaign = {
    ...campaign,
    sent,
    failed
  };
  
  // Save logs to our mock database
  await mockDB.saveCommunicationLogs(deliveryLogs);
  
  // Update campaign
  await mockDB.saveCampaign(updatedCampaign);
};

// Get a list of all campaigns
export const getCampaigns = async (): Promise<Campaign[]> => {
  return mockDB.getCampaigns();
};

// Get a specific campaign by ID
export const getCampaign = async (id: string): Promise<Campaign | undefined> => {
  return mockDB.getCampaign(id);
};

// Get communication logs for a campaign
export const getCampaignLogs = async (campaignId: string): Promise<CommunicationLog[]> => {
  return mockDB.getCampaignLogs(campaignId);