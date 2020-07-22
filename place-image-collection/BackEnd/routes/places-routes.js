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
router.route.
get('/:placeId',(req,res,next)=>{
    console.log('GEt Request in Places');
    const placeId = req.params;//{pid  : 'p1'}
    console.log(placeId);
    const place = DUMMY_PLACES.find(p=> {
        return p.id === placeId.placeId
    })
    console.log(place);
    res.json({place});
})



module.exports = router;