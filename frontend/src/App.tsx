import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CampaignCreation from "./pages/CampaignCreation";
import CampaignHistory from "./pages/CampaignHistory";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import MyOrders from "./pages/MyOrders";
import DeliveryReceipts from "./pages/DeliveryReceipts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            
            {/* Protected routes for both customer and admin */}
            <Route element={<ProtectedRoute />}>
              <Route path="/campaigns" element={<CampaignHistory />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/delivery-receipts" element={<DeliveryReceipts />} />
            </Route>
            
            {/* Admin-only routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/campaigns/new" element={<CampaignCreation />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
