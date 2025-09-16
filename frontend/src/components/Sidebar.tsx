import { useState } from 'react';
import { Itinerary } from '@/lib/types';
import { generatePlan } from '@/services/api';
import { Plane } from 'lucide-react';
import { Button } from './ui/Button';
import { Loader } from './ui/Loader';

interface SidebarProps {
  setIsLoading: (loading: boolean) => void;
  setItinerary: (itinerary: Itinerary) => void; // Changed to expect an Itinerary object
  setError: (error: string | null) => void;
  isLoading: boolean;
}

export function Sidebar({ setIsLoading, setItinerary, setError, isLoading }: SidebarProps) {
  const [query, setQuery] = useState('Plan a 5-day trip to Paris for a couple interested in art, history, and fine dining with a budget of $2500.');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await generatePlan(query);
      setItinerary(result); // Pass the full itinerary object up to App.tsx
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-full md:w-1/3 max-w-lg h-screen bg-white p-6 shadow-2xl z-10 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-600 p-3 rounded-xl shadow-md">
            <Plane className="text-white h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Travel AI</h1>
          <p className="text-gray-500 text-sm">Your intelligent trip architect</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="space-y-6 mt-4">
            <div>
              <label htmlFor="query" className="block text-sm font-semibold text-gray-800 mb-2">
                Describe Your Perfect Trip
              </label>
              <textarea
                id="query"
                rows={5}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., A 7-day family adventure in Costa Rica focused on wildlife and nature."
              />
            </div>
        </div>
        
        <div className="mt-auto pt-6">
            {isLoading && <div className="mb-4"><Loader /></div>}
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                Generate Itinerary
            </Button>
        </div>
      </form>
    </aside>
  );
}