import React from 'react';
import { ClockIcon, CurrencyDollarIcon, UserGroupIcon, PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function ActivityCard({ activity, isSelected, onSelect }) {
  const isPerPerson = activity.priceDetails?.perPerson;
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Activity Image (placeholder) */}
      <div className="h-48 bg-blue-100 flex items-center justify-center">
        <span className="text-blue-800 font-medium">{activity.name} Image</span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{activity.description}</p>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{activity.duration} {activity.duration === 1 ? 'hour' : 'hours'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <CurrencyDollarIcon className="h-4 w-4 mr-2" />
            <span>
              ${activity.basePrice} {isPerPerson ? 'per person' : 'total'}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            <span>
              {activity.capacity.min === activity.capacity.max 
                ? `${activity.capacity.max} guests max` 
                : `${activity.capacity.min}-${activity.capacity.max} guests`}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onSelect(activity)}
          className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${isSelected
            ? 'bg-green-100 text-green-800 hover:bg-green-200'
            : 'bg-blue-800 text-white hover:bg-blue-700'}`}
        >
          {isSelected ? (
            <>
              <CheckCircleIcon className="h-5 w-5 mr-1" />
              Selected
            </>
          ) : (
            <>
              <PlusCircleIcon className="h-5 w-5 mr-1" />
              Add to Itinerary
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ActivityCard;
