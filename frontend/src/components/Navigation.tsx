import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { UserRound, ShoppingBag, Mail } from 'lucide-react';

const Navigation = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-800">Mini CRM</Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/products">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ShoppingBag className="mr-1 h-4 w-4" />
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            {isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <Link to="/campaigns">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Campaigns
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/my-orders">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      My Orders
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {!isAdmin && (
                  <NavigationMenuItem>
                    <Link to="/delivery-receipts">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Mail className="mr-1 h-4 w-4" />
                        My Messages
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
                
                {isAdmin && (
                  <>
                    <NavigationMenuItem>
                      <Link to="/campaigns/new">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Create Campaign
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/customers">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Customers
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </>
                )}
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserRound className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
