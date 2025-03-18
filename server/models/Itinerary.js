const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for future user authentication
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  guestCount: {
    type: Number,
    required: true,
    default: 1
  },
  activities: [{
    activityId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Activity',
      required: true 
    },
    scheduledDate: {
      type: Date,
      required: true
    },
    scheduledTime: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    participants: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
