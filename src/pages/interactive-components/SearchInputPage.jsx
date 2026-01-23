
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Search, ShoppingBag } from 'lucide-react';

const products = [
  { id: 1, name: 'MacBook Pro', category: 'Electronics', price: '$1299' },
  { id: 2, name: 'iPhone 15', category: 'Electronics', price: '$999' },
  { id: 3, name: 'iPad Air', category: 'Electronics', price: '$599' },
  { id: 4, name: 'Denim Jacket', category: 'Clothing', price: '$89' },
  { id: 5, name: 'Cotton T-Shirt', category: 'Clothing', price: '$29' },
  { id: 6, name: 'Sneakers', category: 'Clothing', price: '$120' },
  { id: 7, name: 'The Great Gatsby', category: 'Books', price: '$15' },
  { id: 8, name: 'Atomic Habits', category: 'Books', price: '$22' },
  { id: 9, name: 'React Design Patterns', category: 'Books', price: '$45' }
];

export default function SearchInputPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProducts = searchTerm 
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setShowSuggestions(false);
  };

  return (
    <>
      <Helmet>
        <title>Product Search with Autocomplete - UI Practice Hub</title>
        <meta name="description" content="Search and discover products" />
      </Helmet>

      <PageHeader title="Product Search with Autocomplete" subtitle="Search and discover products" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-autocomplete-container">
        <ControlPanel title="Product Search">
          <div className="relative">
            <label className="block text-sm font-medium mb-2">Find Product</label>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search electronics, clothing, books..."
                    className="w-full pl-9 pr-4 py-2 border rounded-lg bg-background text-foreground"
                    data-testid="select-single-subject" // Mapping to existing ID
                />
            </div>
            
            {showSuggestions && searchTerm && filteredProducts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-popover border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredProducts.map(product => (
                        <div 
                            key={product.id}
                            onClick={() => handleSelect(product)}
                            className="px-4 py-2 hover:bg-accent cursor-pointer flex justify-between items-center group"
                        >
                            <span>{product.name}</span>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground">{product.category}</span>
                        </div>
                    ))}
                </div>
            )}
            
            {showSuggestions && searchTerm && filteredProducts.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-popover border rounded-lg p-4 text-center text-muted-foreground text-sm">
                    No products found
                </div>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <label className="block text-sm font-medium mb-2">Popular Categories</label>
             {['Electronics', 'Clothing', 'Books'].map(cat => (
                 <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded">
                    <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        data-testid={`checkbox-color-${cat.toLowerCase()}`} // Mapping to existing IDs
                    />
                    <span>{cat}</span>
                 </label>
             ))}
          </div>
        </ControlPanel>

        <ResultPanel title="Product Details">
          {selectedProduct ? (
            <div className="text-center p-6" data-testid="result-panel-autocomplete-selection">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">{selectedProduct.name}</h3>
                <p className="text-muted-foreground mb-4">{selectedProduct.category}</p>
                <div className="text-2xl font-bold text-green-600 mb-6">{selectedProduct.price}</div>
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Add to Cart
                </button>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
                 <Search className="h-12 w-12 mb-3 opacity-20" />
                 <p>Search and select a product to view details</p>
             </div>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
