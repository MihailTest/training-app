
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { Utensils, Coffee, IceCream, ChefHat, Plus, Trash2 } from 'lucide-react';

const menuItems = {
    appetizers: [
        { id: 'a1', name: 'Bruschetta', price: 8 },
        { id: 'a2', name: 'Calamari', price: 12 },
        { id: 'a3', name: 'Garlic Bread', price: 6 }
    ],
    mains: [
        { id: 'm1', name: 'Grilled Salmon', price: 24 },
        { id: 'm2', name: 'Ribeye Steak', price: 32 },
        { id: 'm3', name: 'Pasta Carbonara', price: 18 }
    ],
    desserts: [
        { id: 'd1', name: 'Tiramisu', price: 9 },
        { id: 'd2', name: 'Cheesecake', price: 8 },
        { id: 'd3', name: 'Gelato', price: 6 }
    ]
};

export default function MenuNavigationPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Helmet>
        <title>Restaurant Menu Browser - UI Practice Hub</title>
        <meta name="description" content="Browse and order from our menu" />
      </Helmet>

      <PageHeader title="Restaurant Menu Browser" subtitle="Browse and order from our menu" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-menu-container">
        <div className="bg-card border rounded-lg p-6 space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <ChefHat className="h-5 w-5" /> Our Menu
            </h3>
            
            <div className="flex gap-4">
                {/* Appetizers Menu */}
                <div className="relative group">
                    <Button variant="outline" className="gap-2" data-testid="button-menu-file">
                        <Utensils className="h-4 w-4" /> Appetizers
                    </Button>
                    <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-popover border rounded-lg shadow-lg min-w-[200px] z-10 p-2" data-testid="submenu-file">
                        {menuItems.appetizers.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => addToCart(item)} 
                                className="w-full text-left px-4 py-2 hover:bg-accent rounded flex justify-between group/item"
                                data-testid="menu-item-new" // Mapping
                            >
                                <span>{item.name}</span>
                                <span className="text-muted-foreground group-hover/item:text-foreground">${item.price}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mains Menu */}
                <div className="relative group">
                    <Button variant="outline" className="gap-2" data-testid="button-menu-edit">
                        <Utensils className="h-4 w-4" /> Main Courses
                    </Button>
                    <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-popover border rounded-lg shadow-lg min-w-[200px] z-10 p-2" data-testid="submenu-edit">
                        {menuItems.mains.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => addToCart(item)} 
                                className="w-full text-left px-4 py-2 hover:bg-accent rounded flex justify-between group/item"
                                data-testid="menu-item-cut" // Mapping
                            >
                                <span>{item.name}</span>
                                <span className="text-muted-foreground group-hover/item:text-foreground">${item.price}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desserts Menu */}
                <div className="relative group">
                    <Button variant="outline" className="gap-2">
                        <IceCream className="h-4 w-4" /> Desserts
                    </Button>
                    <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-popover border rounded-lg shadow-lg min-w-[200px] z-10 p-2">
                        {menuItems.desserts.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => addToCart(item)} 
                                className="w-full text-left px-4 py-2 hover:bg-accent rounded flex justify-between group/item"
                            >
                                <span>{item.name}</span>
                                <span className="text-muted-foreground group-hover/item:text-foreground">${item.price}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                <p>Hover over a category to see items. Click an item to add to your order.</p>
            </div>
        </div>

        <ResultPanel title={`Your Order ($${total})`}>
          {cart.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2" data-testid="result-panel-menu-actions">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-3">
                        <span>${item.price}</span>
                        <button onClick={() => removeFromCart(i)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground" data-testid="text-no-actions">
                <Coffee className="h-8 w-8 mb-2 opacity-50" />
                <p>Your cart is empty</p>
            </div>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
