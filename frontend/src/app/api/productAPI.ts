import { Product, Order, OrderItem } from "@/types";
import { mockDB } from "@/lib/mockDB";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  return mockDB.getProducts();
};

// Get a specific product by ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  return mockDB.getProductById(id);
};

// Create a new order
export const createOrder = async (items: OrderItem[], customerId: number): Promise<Order> => {
  // Calculate total order amount
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create order object
  const order = {
    customerId,
    items,
    total,
    status: 'completed' as const
  };
  
  return mockDB.createOrder(order);
};

// Get orders for a specific customer
export const getCustomerOrders = async (customerId: number): Promise<Order[]> => {
  return mockDB.getOrdersByCustomerId(customerId);
};

// Get all orders (admin only)
export const getAllOrders = async (): Promise<Order[]> => {
  return mockDB.getAllOrders();
};
