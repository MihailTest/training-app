
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { Plane, MapPin, DollarSign, Calendar } from 'lucide-react';

const destinations = ['Paris', 'Tokyo', 'New York', 'Dubai', 'Barcelona'];
const travelTypes = ['Solo', 'Couple', 'Family', 'Group'];
const budgets = ['Budget', 'Standard', 'Premium', 'Luxury'];

export default function DropdownSelectionPage() {
  const [destination, setDestination] = useState('');
  const [filters, setFilters] = useState([]);

  const handleReset = () => {
    setDestination('');
    setFilters([]);
  };

  return (
    <>
      <Helmet>
        <title>Travel Booking Filters - UI Practice Hub</title>
        <meta name="description" content="Find your perfect travel package" />
      </Helmet>

      <PageHeader title="Travel Booking Filters" subtitle="Find your perfect travel package" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-select-menu-container">
        <ControlPanel title="Search Filters">
          <div className="space-y-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Destination
              </label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="select-country" // Mapping
              >
                <option value="">Select Destination</option>
                {destinations.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="types" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Plane className="h-4 w-4" /> Travel Types (Select Multiple)
              </label>
              <select
                id="types"
                multiple
                value={filters}
                onChange={(e) => setFilters(Array.from(e.target.selectedOptions, opt => opt.value))}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground h-32"
                data-testid="select-languages" // Mapping
              >
                {travelTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <ResetButton onClick={handleReset} />
          </div>
        </ControlPanel>

        <ResultPanel title="Found Packages">
          <div className="space-y-4" data-testid="result-panel-selected-values">
            {destination ? (
                <div className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{destination} Getaway</h3>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">Best Value</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Experience the magic of {destination} with our exclusive 
                        {filters.length > 0 ? ` ${filters.join(' & ')} ` : ' '} 
                        package.
                    </p>
                    <div className="flex gap-4 text-sm font-medium">
                        <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 7 Days</div>
                        <div className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> $1,299</div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                    <Plane className="h-10 w-10 mb-2 opacity-20" />
                    <p>Select a destination to view packages</p>
                </div>
            )}
            
            {destination && (
                <div className="text-xs text-center text-muted-foreground mt-4">
                    Showing results for: <strong>{destination}</strong> 
                    {filters.length > 0 && <span> + {filters.join(', ')}</span>}
                </div>
            )}
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
