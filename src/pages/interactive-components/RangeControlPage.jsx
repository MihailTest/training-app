
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const allProducts = [
    { id: 1, name: 'Basic Headphones', price: 29 },
    { id: 2, name: 'Wireless Mouse', price: 49 },
    { id: 3, name: 'Mechanical Keyboard', price: 120 },
    { id: 4, name: 'Smart Watch', price: 250 },
    { id: 5, name: 'Noise Cancelling Headphones', price: 350 },
    { id: 6, name: 'Tablet', price: 499 },
    { id: 7, name: 'Smartphone', price: 799 },
    { id: 8, name: 'High-End Laptop', price: 999 }
];

export default function RangeControlPage() {
  const [maxPrice, setMaxPrice] = useState(500);

  const filtered = allProducts.filter(p => p.price <= maxPrice);

  return (
    <>
      <Helmet>
        <title>Price Filter Slider - UI Practice Hub</title>
        <meta name="description" content="Filter products by price range" />
      </Helmet>

      <PageHeader title="Price Filter Slider" subtitle="Filter products by price range" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-slider-container">
        <ControlPanel title="Price Range">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Max Price</span>
                  <span className="text-2xl font-bold text-primary">${maxPrice}</span>
              </div>
              <input
                type="range"
                id="slider"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                data-testid="input-slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1000</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => setMaxPrice(100)} size="sm" variant="outline" data-testid="button-set-0">Under $100</Button>
              <Button onClick={() => setMaxPrice(500)} size="sm" variant="outline" data-testid="button-set-50">Under $500</Button>
              <Button onClick={() => setMaxPrice(1000)} size="sm" variant="outline" data-testid="button-set-100">Show All</Button>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title={`Products (${filtered.length})`}>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2" data-testid="result-panel-slider-value">
            {filtered.length > 0 ? filtered.map(product => (
                <div key={product.id} className="flex justify-between items-center p-3 border rounded-lg bg-card hover:bg-accent/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded text-primary">
                            <ShoppingCart className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                    </div>
                    <span className="font-bold">${product.price}</span>
                </div>
            )) : (
                <p className="text-center text-muted-foreground py-8">No products in this price range</p>
            )}
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
