const express = require('express');
const bodyParser = require('body-parser');

const  {check}= require('express-validator');

const router = express.Router();

const placesControllers = require('../controllers/places-controllers')





router.get('/user/:userId',placesControllers.getPlacesByUserId)

router.get('/:placeId',placesControllers.getPlaceById)

router.post('/',
   check('title')
   .not()
   .isEmpty(),
   check('description').isLength({min: 5}),
   check('address').not().isEmpty(),

   placesControllers.createPlace)

router.post('/:pid',
  check('title').not().isEmpty(),
  check('description').isLength({min: 5}),


placesControllers.updatePlace)

router.delete('/:pid',placesControllers.deletePlace)

module.exports = router;