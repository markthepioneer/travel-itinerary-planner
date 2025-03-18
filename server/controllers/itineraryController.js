const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find()
      .populate({
        path: 'activities.activityId',
        select: 'name category duration'
      });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate({
        path: 'activities.activityId',
        select: 'name category description duration basePrice priceDetails images'
      });
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new itinerary
exports.createItinerary = async (req, res) => {
  try {
    const itinerary = new Itinerary(req.body);
    const savedItinerary = await itinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Generate itinerary based on selected activities and dates
exports.generateItinerary = async (req, res) => {
  try {
    const { startDate, endDate, guestCount, selectedActivities } = req.body;
    
    // Validate input
    if (!startDate || !endDate || !guestCount || !selectedActivities || !Array.isArray(selectedActivities)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
    
    // Convert string dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return res.status(400).json({ message: 'Invalid date range' });
    }
    
    // Calculate number of days
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Get activity details from IDs
    const activityIds = selectedActivities.map(activity => activity.activityId);
    const activityDetails = await Activity.find({ _id: { $in: activityIds } });
    
    if (activityDetails.length !== activityIds.length) {
      return res.status(400).json({ message: 'One or more activities not found' });
    }
    
    // Map activity details to selected activities
    const enrichedActivities = selectedActivities.map(selected => {
      const details = activityDetails.find(act => act._id.toString() === selected.activityId);
      return {
        ...selected,
        details
      };
    });
    
    // Simple scheduling algorithm
    const scheduledActivities = [];
    let totalPrice = 0;
    
    // Create an array of days
    const daysArray = Array.from({ length: days }, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return date;
    });
    
    // Allocate activities to days
    enrichedActivities.forEach((activity, index) => {
      // Determine which day to schedule (simple round-robin)
      const dayIndex = index % days;
      const scheduledDate = daysArray[dayIndex];
      
      // Determine time (morning or afternoon)
      const timeSlot = index % 2 === 0 ? 'morning' : 'afternoon';
      const scheduledTime = timeSlot === 'morning' ? '09:00' : '14:00';
      
      // Calculate price based on activity details
      const { details } = activity;
      let price = details.basePrice;
      
      if (details.priceDetails) {
        if (details.duration >= 5 && details.priceDetails.fullDay) {
          price = details.priceDetails.fullDay;
        } else if (details.duration <= 4 && details.priceDetails.halfDay) {
          price = details.priceDetails.halfDay;
        }
      }
      
      // Multiply by guest count if price is per person
      const totalActivityPrice = details.priceDetails && details.priceDetails.perPerson ? 
        price * guestCount : price;
      
      // Add to total price
      totalPrice += totalActivityPrice;
      
      // Add to scheduled activities
      scheduledActivities.push({
        activityId: details._id,
        scheduledDate,
        scheduledTime,
        duration: details.duration,
        price: totalActivityPrice,
        participants: guestCount
      });
    });
    
    // Create itinerary object
    const generatedItinerary = {
      startDate: start,
      endDate: end,
      guestCount,
      activities: scheduledActivities,
      totalPrice
    };
    
    res.status(200).json(generatedItinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update itinerary
exports.updateItinerary = async (req, res) => {
  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.id);
    
    if (!deletedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
