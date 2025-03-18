import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

function ItineraryPreview({ itinerary, onEditItinerary }) {
  if (!itinerary) return null;

  // Group activities by date
  const activitiesByDate = itinerary.activities.reduce((acc, activity) => {
    const date = new Date(activity.scheduledDate);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    
    acc[dateStr].push(activity);
    return acc;
  }, {});
  
  // Get sorted dates
  const sortedDates = Object.keys(activitiesByDate).sort();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-800 text-white">
        <h2 className="text-xl font-semibold mb-2">Generated Itinerary</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>
              {format(new Date(itinerary.startDate), 'MMM d, yyyy')} - {format(new Date(itinerary.endDate), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-1" />
            <span>{itinerary.guestCount} {itinerary.guestCount === 1 ? 'guest' : 'guests'}</span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
            <span>Total: ${itinerary.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {sortedDates.map(dateStr => {
          const date = new Date(dateStr);
          const formattedDate = format(date, 'EEEE, MMMM d');
          const activities = activitiesByDate[dateStr];
          
          return (
            <div key={dateStr} className="mb-4">
              <h3 className="font-semibold text-lg border-b pb-1 mb-2">{formattedDate}</h3>
              
              <div className="space-y-2">
                {activities.map(activity => {
                  const activityDetails = activity.activityId;
                  
                  return (
                    <div 
                      key={activity._id || Math.random().toString()} 
                      className="flex items-center px-2 py-1 text-sm"
                    >
                      <div className="w-16 font-medium">
                        {activity.scheduledTime}
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{activityDetails.name}</div>
                        <div className="text-gray-600">
                          ${activity.price.toFixed(2)} - {activity.duration} {activity.duration === 1 ? 'hour' : 'hours'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${itinerary.totalPrice.toFixed(2)}</span>
        </div>
        
        {itinerary.guestCount > 1 && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Per person:</span>
            <span>${(itinerary.totalPrice / itinerary.guestCount).toFixed(2)}</span>
          </div>
        )}
        
        <button
          onClick={onEditItinerary}
          className="mt-3 w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Itinerary
        </button>
      </div>
    </div>
  );
}

export default ItineraryPreview;
