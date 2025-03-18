const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// GET all activities or by category
router.get('/', activityController.getAllActivities);

// GET single activity by ID
router.get('/:id', activityController.getActivityById);

// POST new activity
router.post('/', activityController.createActivity);

// PUT/update activity
router.put('/:id', activityController.updateActivity);

// DELETE activity
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
