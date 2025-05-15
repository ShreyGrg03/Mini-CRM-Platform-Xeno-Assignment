import { DeliveryReceipt } from "@/types";
import { generateId } from "@/lib/utils";
import { mockDB } from "@/lib/db";

// Mock delivery receipts
const mockDeliveryReceipts: DeliveryReceipt[] = [
  {
    id: "dr1",
    campaignId: "camp1",
    campaignName: "Summer Sale 2025",
    customerId: 2,
    customerName: "Customer User",
    messageContent: "Hi Customer User! Check out our amazing summer deals with 20% off all products.",
    status: "SENT",
    sentAt: new Date(2025, 4, 10, 9, 30)
  },
  {
    id: "dr2",
    campaignId: "camp2",
    campaignName: "Product Launch",
    customerId: 2,
    customerName: "Customer User",
    messageContent: "Hello Customer User, we've just launched our new product line!",
    status: "PENDING",
    sentAt: new Date(2025, 4, 12, 15, 45)
  },
  {
    id: "dr3",
    campaignId: "camp3",
    campaignName: "Loyalty Rewards",
    customerId: 2,
    customerName: "Customer User",
    messageContent: "Thanks for being a loyal customer! Here's a special discount code: LOYAL25",
    status: "FAILED",
    sentAt: new Date(2025, 4, 8, 11, 20)
  }
];

// Get all delivery receipts for a customer
export const getCustomerDeliveryReceipts = async (customerId: number): Promise<DeliveryReceipt[]> => {
  // In a real app, this would be fetched from the database
  // For now, filter the mock data based on customerId
  return mockDeliveryReceipts.filter(receipt => receipt.customerId === customerId);
};

// Get a specific delivery receipt by ID
export const getDeliveryReceipt = async (id: string): Promise<DeliveryReceipt | undefined> => {
  return mockDeliveryReceipts.find(receipt => receipt.id === id);
};

// Update a delivery receipt status
export const updateDeliveryReceiptStatus = async (
  id: string, 
  status: "PENDING" | "SENT" | "FAILED"
): Promise<DeliveryReceipt | undefined> => {
  const receipt = mockDeliveryReceipts.find(r => r.id === id);
  
  if (receipt) {
    receipt.status = status;
    return receipt;
  }
  
  return undefined;
};