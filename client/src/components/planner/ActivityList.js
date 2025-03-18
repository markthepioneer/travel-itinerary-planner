import React from 'react';
import ActivityCard from './ActivityCard';

function ActivityList({ activities, selectedActivities, onSelectActivity }) {
  // Check if an activity is already selected
  const isSelected = (activity) => {
    return selectedActivities.some(selected => selected._id === activity._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Available Activities</h2>
      
      {activities.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No activities found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              isSelected={isSelected(activity)}
              onSelect={onSelectActivity}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivityList;
