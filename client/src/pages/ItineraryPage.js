import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import ItineraryView from '../components/itinerary/ItineraryView';
import { fetchItineraryById, deleteItinerary } from '../services/api';
import { ArrowLeftIcon, DocumentArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';

function ItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const itineraryRef = useRef();

  // Handle printing/downloading PDF
  const handlePrint = useReactToPrint({
    content: () => itineraryRef.current,
    documentTitle: `Travel_Itinerary_${id}`,
    onAfterPrint: () => console.log('Printed successfully')
  });

  // Handle itinerary deletion
  const handleDelete = async () => {
    try {
      await deleteItinerary(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete itinerary. Please try again.');
    }
  };

  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setLoading(true);
        const data = await fetchItineraryById(id);
        setItinerary(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load itinerary. It may have been removed or does not exist.');
        setLoading(false);
      }
    };
    
    loadItinerary();
  }, [id]);

  // Format dates for display
  const formatDateRange = () => {
    if (!itinerary) return '';
    
    const startDate = new Date(itinerary.startDate);
    const endDate = new Date(itinerary.endDate);
    
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link 
            to="/planner" 
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Your Itinerary</h1>
        </div>
        
        {itinerary && (
          <div className="flex space-x-4">
            <button 
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download PDF
            </button>
            
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
      
      {itinerary && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 text-blue-800">
            <div>
              <span className="font-semibold">Dates:</span> {formatDateRange()}
            </div>
            <div>
              <span className="font-semibold">Guests:</span> {itinerary.guestCount}
            </div>
            <div>
              <span className="font-semibold">Activities:</span> {itinerary.activities.length}
            </div>
            <div>
              <span className="font-semibold">Total Price:</span> ${itinerary.totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="p-8 text-center">
          <p className="text-lg">Loading itinerary...</p>
        </div>
      ) : (
        <div className="print-container" ref={itineraryRef}>
          <ItineraryView itinerary={itinerary} />
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Itinerary</h3>
            <p className="mb-6">Are you sure you want to delete this itinerary? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItineraryPage;
