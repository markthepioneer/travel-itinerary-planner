import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateSelector from '../components/planner/DateSelector';
import GuestCounter from '../components/planner/GuestCounter';
import ActivityFilter from '../components/planner/ActivityFilter';
import ActivityList from '../components/planner/ActivityList';
import SelectedActivities from '../components/planner/SelectedActivities';
import ItineraryPreview from '../components/planner/ItineraryPreview';
import { fetchActivities, generateItinerary, saveItinerary } from '../services/api';

function PlannerPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Trip details state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  
  // Activities state
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  
  // Generated itinerary state
  const [generatingItinerary, setGeneratingItinerary] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // Load activities on component mount
  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        setActivities(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(activity => activity.category))];
        setCategories(uniqueCategories);
        
        setFilteredActivities(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load activities. Please try again later.');
        setLoading(false);
      }
    };
    
    loadActivities();
  }, []);
  
  // Filter activities when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredActivities(activities.filter(activity => activity.category === selectedCategory));
    } else {
      setFilteredActivities(activities);
    }
  }, [selectedCategory, activities]);
  
  // Handle date change
  const handleDateChange = ({ startDate: newStartDate, endDate: newEndDate }) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  
  // Handle selecting an activity
  const handleSelectActivity = (activity) => {
    const alreadySelected = selectedActivities.some(selected => selected._id === activity._id);
    
    if (alreadySelected) {
      setSelectedActivities(selectedActivities.filter(selected => selected._id !== activity._id));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };
  
  // Handle removing a selected activity
  const handleRemoveActivity = (activity) => {
    setSelectedActivities(selectedActivities.filter(selected => selected._id !== activity._id));
  };
  
  // Handle generating itinerary
  const handleGenerateItinerary = async () => {
    // Validate required inputs
    if (!startDate || !endDate) {
      setError('Please select both arrival and departure dates.');
      return;
    }
    
    if (selectedActivities.length === 0) {
      setError('Please select at least one activity.');
      return;
    }
    
    try {
      setGeneratingItinerary(true);
      setError(null);
      
      // Prepare data for API
      const itineraryData = {
        startDate,
        endDate,
        guestCount,
        selectedActivities: selectedActivities.map(activity => ({
          activityId: activity._id,
          preferredTime: null // Could add preference in the future
        }))
      };
      
      // Generate itinerary
      const generatedData = await generateItinerary(itineraryData);
      setGeneratedItinerary(generatedData);
      setGeneratingItinerary(false);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
      setGeneratingItinerary(false);
    }
  };
  
  // Handle saving and navigating to itinerary
  const handleSaveItinerary = async () => {
    try {
      const savedItinerary = await saveItinerary(generatedItinerary);
      navigate(`/itinerary/${savedItinerary._id}`);
    } catch (err) {
      setError('Failed to save itinerary. Please try again.');
    }
  };
  
  // Handle editing itinerary (reset generated itinerary)
  const handleEditItinerary = () => {
    setGeneratedItinerary(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Plan Your Trip</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* Show itinerary preview if generated */}
      {generatedItinerary ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ItineraryPreview 
              itinerary={generatedItinerary} 
              onEditItinerary={handleEditItinerary}
            />
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveItinerary}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Save & View Itinerary
              </button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Selections</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Dates</h3>
                  <p className="text-gray-600">
                    {startDate && endDate 
                      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                      : 'Not selected'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Guests</h3>
                  <p className="text-gray-600">{guestCount} {guestCount === 1 ? 'person' : 'people'}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Activities</h3>
                  <ul className="text-gray-600 list-disc pl-5">
                    {selectedActivities.map(activity => (
                      <li key={activity._id}>{activity.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Trip planning form */}
            <DateSelector 
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
            />
            
            <GuestCounter
              guestCount={guestCount}
              onChange={setGuestCount}
            />
            
            <ActivityFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                Loading activities...
              </div>
            ) : (
              <ActivityList
                activities={filteredActivities}
                selectedActivities={selectedActivities}
                onSelectActivity={handleSelectActivity}
              />
            )}
          </div>
          
          <div>
            {/* Selected activities and summary */}
            <div className="sticky top-6">
              <SelectedActivities
                activities={selectedActivities}
                onRemove={handleRemoveActivity}
                onGenerateItinerary={handleGenerateItinerary}
                isGenerating={generatingItinerary}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlannerPage;
