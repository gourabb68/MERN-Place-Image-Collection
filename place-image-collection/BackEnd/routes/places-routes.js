const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const DUMMY_PLACES =[
    {
        id: 'p1',
        title: 'Empire State Building',
        Description: 'One of the most famous ',
        imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u1'
        
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        Description: 'One of the most famous ',
        imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u2'
        
    }
]

router.get('/user/:userId',(req,res,next)=>{
    
    const userId = req.params.userId;//{pid  : 'p1'}
    console.log(userId);
    const user = DUMMY_PLACES.find(p=> {
        return p.creator === userId
    })
    if(!user){
        const error = new Error('Could not find a place for the provided user id ')
        error.code = 404;
        return next(error);
      }
    res.json({user});
})


router.get('/:placeId',(req,res,next)=>{
    console.log('GEt Request in Places');
    const placeId = req.params.placeId;//{pid  : 'p1'}
    console.log(placeId);
    const place = DUMMY_PLACES.find(p=> {
        return p.id === placeId
    })
    if(!place){
      //calling the error handler next(error) or throw(err)
      //for asynchrounous code use return next(err)
      //for synchrounous code use throw(err)
      const error = new Error('Could not find a place for the provided id ')
      error.code = 404;
      throw error;
    }
        res.json({place});
    
   
})





module.exports = router;