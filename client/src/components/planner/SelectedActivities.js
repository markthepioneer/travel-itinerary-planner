import React from 'react';
import { TrashIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

function SelectedActivities({ activities, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Selected Activities</h2>
      
      {activities.length === 0 ? (
        <div className="p-4 text-center text-gray-500 border border-dashed rounded-md">
          No activities selected yet. Browse the activities and add them to your itinerary.
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity._id}
              className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50"
            >
              <div className="flex-grow">
                <h3 className="font-medium">{activity.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{activity.duration} {activity.duration === 1 ? 'hour' : 'hours'}</span>
                  <span className="mx-2">•</span>
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  <span>
                    ${activity.basePrice} 
                    {activity.priceDetails?.perPerson ? 'per person' : 'total'}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onRemove(activity)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                title="Remove activity"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          
          <div className="mt-6 pt-4 border-t">
            <button
              className="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedActivities;
