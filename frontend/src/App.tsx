import { useState, lazy, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { Itinerary } from './lib/types';
import { ItineraryDisplay } from './components/ItineraryDisplay';

// This correctly lazy-loads the map component for faster initial load times
const Map = lazy(() => import('./components/map/Map'));

function App() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Default the map center to Paris, since our mock backend data is for Paris
  const [mapCenter, setMapCenter] = useState<[number, number]>([48.8566, 2.3522]);

  const handlePlanGenerated = (newItinerary: Itinerary) => {
    setItinerary(newItinerary);
    // In a real app, you would get coordinates from the backend or a geocoding API
    if (newItinerary.destination.toLowerCase() === 'paris') {
      setMapCenter([48.8566, 2.3522]);
    } else {
      // A fallback for other potential destinations
      setMapCenter([20.5937, 78.9629]); 
    }
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        setItinerary={handlePlanGenerated}
        setIsLoading={setIsLoading}
        setError={setError}
        isLoading={isLoading}
      />
      <div className="flex-grow h-full relative">
        {/* Suspense provides a loading fallback while the map component is being loaded */}
        <Suspense fallback={<div className="flex items-center justify-center h-full bg-gray-200"><p>Loading map...</p></div>}>
          <Map center={mapCenter} />
        </Suspense>

        {error && (
          <div className="absolute top-4 right-4 bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-[1000]" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {itinerary && !isLoading && (
          <ItineraryDisplay itinerary={itinerary} />
        )}
      </div>
    </main>
  );
}

export default App;