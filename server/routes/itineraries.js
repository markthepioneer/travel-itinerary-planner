const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// GET all itineraries
router.get('/', itineraryController.getAllItineraries);

// GET single itinerary by ID
router.get('/:id', itineraryController.getItineraryById);

// POST new itinerary
router.post('/', itineraryController.createItinerary);

// POST generate itinerary
router.post('/generate', itineraryController.generateItinerary);

// PUT/update itinerary
router.put('/:id', itineraryController.updateItinerary);

// DELETE itinerary
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;
