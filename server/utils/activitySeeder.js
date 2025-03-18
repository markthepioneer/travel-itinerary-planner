const mongoose = require('mongoose');
require('dotenv').config();
const Activity = require('../models/Activity');

// Import activity data from Summer/Fall 2024-2025 guide
const activities = [
  {
    name: 'Full Day Fly Fishing (Missouri River)',
    description: 'Experience world-class fly fishing on the Missouri River with professional guides from Dry Fly Outfitters.',
    category: 'Fishing',
    duration: 8,
    basePrice: 700,
    priceDetails: {
      fullDay: 700,
      halfDay: null,
      perPerson: false,
      additionalOptions: []
    },
    availability: {
      seasonStart: new Date('2024-05-01'),
      seasonEnd: new Date('2025-10-31'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['fly-fishing-missouri.jpg'],
    capacity: {
      min: 1,
      max: 2
    }
  },
  {
    name: 'Half Day Fly Fishing (Missouri River)',
    description: 'A half-day guided fly fishing experience on the Missouri River with Dry Fly Outfitters.',
    category: 'Fishing',
    duration: 4,
    basePrice: 550,
    priceDetails: {
      fullDay: null,
      halfDay: 550,
      perPerson: false,
      additionalOptions: []
    },
    availability: {
      seasonStart: new Date('2024-05-01'),
      seasonEnd: new Date('2025-10-31'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['fly-fishing-half-day.jpg'],
    capacity: {
      min: 1,
      max: 2
    }
  },
  {
    name: 'Full Day Belt Creek Fly Fishing',
    description: 'Full day guided fly fishing experience on the scenic Belt Creek.',
    category: 'Fishing',
    duration: 8,
    basePrice: 600,
    priceDetails: {
      fullDay: 600,
      halfDay: null,
      perPerson: true,
      additionalOptions: [
        {
          name: 'All-inclusive upgrade',
          price: 300
        }
      ]
    },
    availability: {
      seasonStart: new Date('2024-05-01'),
      seasonEnd: new Date('2025-10-31'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['belt-creek-fishing.jpg'],
    capacity: {
      min: 1,
      max: 4
    }
  },
  {
    name: 'Half Day Belt Creek Fly Fishing',
    description: 'A half-day fly fishing adventure on Belt Creek with professional guides.',
    category: 'Fishing',
    duration: 4,
    basePrice: 400,
    priceDetails: {
      fullDay: null,
      halfDay: 400,
      perPerson: true,
      additionalOptions: [
        {
          name: 'All-inclusive upgrade',
          price: 200
        }
      ]
    },
    availability: {
      seasonStart: new Date('2024-05-01'),
      seasonEnd: new Date('2025-10-31'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['belt-creek-half-day.jpg'],
    capacity: {
      min: 1,
      max: 4
    }
  },
  {
    name: 'Half Day Raft Trip (Small Group)',
    description: 'Scenic half-day raft trip with Prairie Mountain River Adventures for small groups of 1-3 people.',
    category: 'Water Adventures',
    duration: 4,
    basePrice: 395,
    priceDetails: {
      fullDay: null,
      halfDay: 395,
      perPerson: false,
      additionalOptions: []
    },
    availability: {
      seasonStart: new Date('2024-05-15'),
      seasonEnd: new Date('2025-09-30'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['raft-trip-small.jpg'],
    capacity: {
      min: 1,
      max: 3
    }
  },
  {
    name: 'Full Day Raft Trip (Small Group)',
    description: 'Full day river rafting adventure for groups of 1-3 people with Prairie Mountain River Adventures.',
    category: 'Water Adventures',
    duration: 8,
    basePrice: 495,
    priceDetails: {
      fullDay: 495,
      halfDay: null,
      perPerson: false,
      additionalOptions: []
    },
    availability: {
      seasonStart: new Date('2024-05-15'),
      seasonEnd: new Date('2025-09-30'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['full-day-raft.jpg'],
    capacity: {
      min: 1,
      max: 3
    }
  },
  {
    name: 'Bearcat Canyon Trail Ride',
    description: 'A 1-hour horseback riding experience through the beautiful Bearcat Canyon.',
    category: 'Horseback Riding',
    duration: 1,
    basePrice: 175,
    priceDetails: {
      perPerson: true,
      additionalOptions: []
    },
    availability: {
      seasonStart: new Date('2024-04-01'),
      seasonEnd: new Date('2025-11-15'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['bearcat-trail.jpg'],
    capacity: {
      min: 1,
      max: 8
    }
  },
  {
    name: 'Cliff-Side Dinner for Two',
    description: 'Romantic cliff-side dinner for two with breathtaking views and premium service.',
    category: 'Dining',
    duration: 3,
    basePrice: 600,
    priceDetails: {
      perPerson: false,
      additionalOptions: [
        {
          name: 'All-inclusive upgrade',
          price: 300
        }
      ]
    },
    availability: {
      seasonStart: new Date('2024-05-01'),
      seasonEnd: new Date('2025-10-15'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['cliff-dinner-two.jpg'],
    capacity: {
      min: 2,
      max: 2
    }
  },
  {
    name: 'Deep Tissue Treatment (90 min)',
    description: 'Extended 90-minute deep tissue massage therapy for comprehensive muscle tension relief.',
    category: 'Spa',
    duration: 1.5,
    basePrice: 210,
    priceDetails: {
      perPerson: true,
      additionalOptions: []
    },
    availability: {
      seasonStart: new Date('2024-01-01'),
      seasonEnd: new Date('2025-12-31'),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    images: ['deep-tissue-90.jpg'],
    capacity: {
      min: 1,
      max: 1
    }
  }
];

// Function to seed the database
const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Delete existing activities
    await Activity.deleteMany({});
    console.log('Deleted existing activities');

    // Insert new activities
    await Activity.insertMany(activities);
    console.log(`Inserted ${activities.length} activities`);

    // Disconnect
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
