import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
});

// Activities API
export const fetchActivities = async (category) => {
  try {
    const params = category ? { category } : {};
    const response = await api.get('/activities', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const fetchActivityById = async (id) => {
  try {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activity ${id}:`, error);
    throw error;
  }
};

// Itineraries API
export const generateItinerary = async (itineraryData) => {
  try {
    const response = await api.post('/itineraries/generate', itineraryData);
    return response.data;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
};

export const saveItinerary = async (itineraryData) => {
  try {
    const response = await api.post('/itineraries', itineraryData);
    return response.data;
  } catch (error) {
    console.error('Error saving itinerary:', error);
    throw error;
  }
};

export const fetchItineraryById = async (id) => {
  try {
    const response = await api.get(`/itineraries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching itinerary ${id}:`, error);
    throw error;
  }
};

export const updateItinerary = async (id, itineraryData) => {
  try {
    const response = await api.put(`/itineraries/${id}`, itineraryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating itinerary ${id}:`, error);
    throw error;
  }
};

export const deleteItinerary = async (id) => {
  try {
    const response = await api.delete(`/itineraries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting itinerary ${id}:`, error);
    throw error;
  }
};
