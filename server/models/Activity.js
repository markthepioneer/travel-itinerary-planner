const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Fishing',
      'Water Adventures',
      'Horseback Riding',
      'ATV',
      'Sporting',
      'Dining',
      'Kids Activities',
      'Other Adventures',
      'Spa'
    ]
  },
  duration: {
    type: Number, // in hours
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  priceDetails: {
    fullDay: Number,
    halfDay: Number,
    perPerson: {
      type: Boolean,
      default: true
    },
    additionalOptions: [{
      name: String,
      price: Number
    }]
  },
  availability: {
    seasonStart: Date,
    seasonEnd: Date,
    daysOfWeek: [Number] // 0 = Sunday, 1 = Monday, etc.
  },
  images: [String],
  capacity: {
    min: {
      type: Number,
      default: 1
    },
    max: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);
