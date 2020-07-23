const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const placesControllers = require('../controllers/places-controllers')





router.get('/user/:userId',placesControllers.getPlacesByUserId)

router.get('/:placeId',placesControllers.getPlaceById)

router.post('/',placesControllers.createPlace)

router.patch('/:pid',placesControllers.updatePlace)

router.delete('/:pid',placesControllers.deletePlace)

module.exports = router;