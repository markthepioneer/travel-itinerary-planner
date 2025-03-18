import React from 'react';
import { format } from 'date-fns';
import { ClockIcon, CurrencyDollarIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function ItineraryView({ itinerary }) {
  if (!itinerary) {
    return <div>Loading itinerary...</div>;
  }

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
  
  // Sort activities by time for each date
  Object.keys(activitiesByDate).forEach(date => {
    activitiesByDate[date].sort((a, b) => {
      const timeA = a.scheduledTime.split(':');
      const timeB = b.scheduledTime.split(':');
      return (parseInt(timeA[0]) * 60 + parseInt(timeA[1])) - 
             (parseInt(timeB[0]) * 60 + parseInt(timeB[1]));
    });
  });
  
  // Get sorted dates
  const sortedDates = Object.keys(activitiesByDate).sort();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-blue-800 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Travel Itinerary</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>
              {format(new Date(itinerary.startDate), 'MMM d, yyyy')} - {format(new Date(itinerary.endDate), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-2" />
            <span>{itinerary.guestCount} {itinerary.guestCount === 1 ? 'guest' : 'guests'}</span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            <span>Total: ${itinerary.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {sortedDates.map(dateStr => {
          const date = new Date(dateStr);
          const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
          const activities = activitiesByDate[dateStr];
          
          return (
            <div key={dateStr} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b">{formattedDate}</h3>
              
              <div className="space-y-4">
                {activities.map(activity => {
                  const activityDetails = activity.activityId;
                  
                  return (
                    <div 
                      key={activity._id || Math.random().toString()} 
                      className="flex p-4 border rounded-md hover:bg-gray-50"
                    >
                      <div className="w-24 text-center font-medium">
                        {activity.scheduledTime}
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg">{activityDetails.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{activityDetails.description}</p>
                        
                        <div className="flex gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span>{activity.duration} {activity.duration === 1 ? 'hour' : 'hours'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            <span>
                              ${activity.price.toFixed(2)} 
                              {activityDetails.priceDetails?.perPerson ? 
                                ` (${activity.participants} ${activity.participants === 1 ? 'guest' : 'guests'})` : ''}
                            </span>
                          </div>
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
      
      {/* Price Summary */}
      <div className="p-6 bg-gray-100 border-t">
        <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
        
        <div className="space-y-2 mb-4">
          {sortedDates.map(dateStr => {
            const date = new Date(dateStr);
            const formattedDate = format(date, 'MMM d');
            const activities = activitiesByDate[dateStr];
            const dateTotal = activities.reduce((sum, activity) => sum + activity.price, 0);
            
            return (
              <div key={dateStr} className="flex justify-between">
                <span>{formattedDate}</span>
                <span>${dateTotal.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-gray-300">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${itinerary.totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <p>
              {itinerary.guestCount > 1 && (
                <>Per person: ${(itinerary.totalPrice / itinerary.guestCount).toFixed(2)}</>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="p-6 border-t flex flex-wrap gap-4 justify-end">
        <button
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          Edit Itinerary
        </button>
        
        <button
          className="px-6 py-2 bg-blue-800 text-white hover:bg-blue-700 rounded-md transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ItineraryView;
