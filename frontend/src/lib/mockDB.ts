import { Customer, Campaign, CommunicationLog, Product, Order } from "@/types";
import { generateId } from "@/lib/utils";

// Mock data for customers
export const mockCustomers: Customer[] = [
  { id: 1, name: 'Mohit Sharma', email: 'mohit@example.com', spend: 15000, visits: 8, lastActive: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', spend: 8000, visits: 4, lastActive: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
  { id: 3, name: 'Raj Kumar', email: 'raj@example.com', spend: 12000, visits: 2, lastActive: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000) },
  { id: 4, name: 'Anita Desai', email: 'anita@example.com', spend: 20000, visits: 10, lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { id: 5, name: 'Vikram Patel', email: 'vikram@example.com', spend: 5000, visits: 3, lastActive: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000) },
  { id: 6, name: 'Nisha Joshi', email: 'nisha@example.com', spend: 9000, visits: 5, lastActive: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
  { id: 7, name: 'Amit Verma', email: 'amit@example.com', spend: 18000, visits: 7, lastActive: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
  { id: 8, name: 'Sunita Agarwal', email: 'sunita@example.com', spend: 7000, visits: 2, lastActive: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000) },
];

// Mock products
export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Premium Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Accessories",
    stock: 45
  },
  {
    id: "prod-2",
    name: "Smart Fitness Watch",
    description: "Water-resistant fitness tracker with heart rate monitoring, sleep tracking, and smartphone notifications.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    stock: 30
  },
  {
    id: "prod-3",
    name: "Organic Cotton T-Shirt",
    description: "Eco-friendly, soft organic cotton t-shirt with minimalist design. Sustainable and ethically sourced.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    category: "Clothing",
    stock: 100
  },
  {
    id: "prod-4",
    name: "Wireless Bluetooth Earbuds",
    description: "Noise-canceling wireless earbuds with long battery life and crystal-clear sound quality.",
    price: 4499,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    stock: 25
  },
  {
    id: "prod-5",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 hand-painted ceramic coffee mugs, microwave and dishwasher safe.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww",
    category: "Home",
    stock: 60
  },
  {
    id: "prod-6",
    name: "Bamboo Cutting Board",
    description: "Eco-friendly bamboo cutting board with juice groove and non-slip feet.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1584323602397-8e99d0240243?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0dGluZyUyMGJvYXJkfGVufDB8fDB8fHww",
    category: "Kitchen",
    stock: 40
  }
];

// In-memory storage for campaigns and logs (would be a database in production)
let campaigns: Campaign[] = [];
let communicationLogs: CommunicationLog[] = [];
let orders: Order[] = [];

export const getMockDB = () => ({
  // Customer operations
  getCustomers: async (): Promise<Customer[]> => {
    return [...mockCustomers];
  },
  
  getCustomerById: async (id: number): Promise<Customer | undefined> => {
    return mockCustomers.find(customer => customer.id === id);
  },
  
  // Campaign operations
  getCampaigns: async (): Promise<Campaign[]> => {
    return [...campaigns];
  },
  
  getCampaign: async (id: string): Promise<Campaign | undefined> => {
    return campaigns.find(campaign => campaign.id === id);
  },
  
  saveCampaign: async (campaign: Campaign): Promise<Campaign> => {
    // If campaign exists, update it, otherwise add it
    const index = campaigns.findIndex(c => c.id === campaign.id);
    if (index >= 0) {
      campaigns[index] = campaign;
    } else {
      campaigns.unshift(campaign); // Add to beginning for "most recent first"
    }
    return campaign;
  },
  
  // Communication log operations
  saveCommunicationLog: async (log: CommunicationLog): Promise<CommunicationLog> => {
    communicationLogs.push(log);
    return log;
  },
  
  saveCommunicationLogs: async (logs: CommunicationLog[]): Promise<CommunicationLog[]> => {
    communicationLogs = [...communicationLogs, ...logs];
    return logs;
  },
  
  getCampaignLogs: async (campaignId: string): Promise<CommunicationLog[]> => {
    return communicationLogs.filter(log => log.campaignId === campaignId);
  },

  // Product operations
  getProducts: async (): Promise<Product[]> => {
    return [...mockProducts];
  },
  
  getProductById: async (id: string): Promise<Product | undefined> => {
    return mockProducts.find(product => product.id === id);
  },
  
  // Order operations
  createOrder: async (order: Omit<Order, "id" | "orderDate">): Promise<Order> => {
    const newOrder: Order = {
      ...order,
      id: generateId(),
      orderDate: new Date()
    };
    orders.push(newOrder);
    
    // Update customer spend
    const customerIndex = mockCustomers.findIndex(c => c.id === order.customerId);
    if (customerIndex !== -1) {
      mockCustomers[customerIndex].spend += order.total;
      mockCustomers[customerIndex].visits += 1;
      mockCustomers[customerIndex].lastActive = new Date();
    }
    
    return newOrder;
  },
  
  getOrdersByCustomerId: async (customerId: number): Promise<Order[]> => {
    return orders.filter(order => order.customerId === customerId)
      .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime()); // Most recent first
  },
  
  getAllOrders: async (): Promise<Order[]> => {
    return [...orders].sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
  }
});

export type MockDB = ReturnType<typeof getMockDB>;

// Create and export a singleton instance
export const mockDB = getMockDB();
