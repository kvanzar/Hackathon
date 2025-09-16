import { Itinerary } from '@/lib/types';
import { MapPin, DollarSign, CalendarDays, ShipWheel } from 'lucide-react';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 max-h-[50%] bg-white/80 backdrop-blur-sm p-6 shadow-t-2xl rounded-t-lg overflow-y-auto z-[999]">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.title}</h2>
      
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{itinerary.destination}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{itinerary.budget_summary.total} {itinerary.budget_summary.currency}</span>
          </div>
          {itinerary.transport_details?.description && (
            <div className="flex items-center gap-1.5">
              <ShipWheel className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{itinerary.transport_details.description}</span>
            </div>
          )}
      </div>

      <div className="space-y-4">
        {itinerary.daily_plan.map((day) => (
          <div key={day.day} className="p-4 border rounded-lg bg-gray-50/80 shadow-sm">
            <h3 className="font-bold text-indigo-700 flex items-center gap-2 mb-2">
                <CalendarDays className="h-5 w-5" />
                Day {day.day}: {day.title}
            </h3>
            <p className="text-gray-800 leading-relaxed text-sm">{day.activities}</p>
            {day.accommodation && (
              <p className="text-xs text-gray-500 mt-2"><b>Stay:</b> {day.accommodation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}