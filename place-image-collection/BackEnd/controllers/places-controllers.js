const HttpError = require('../models/http-error');
const uuid = require('uuid');

let DUMMY_PLACES =[
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous ',
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
        description: 'One of the most famous ',
        imageUrl: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u2'
        
    }
]

const getPlaceById = (req,res,next)=>{


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
      throw new HttpError('Could not find a place for the provided id ',404)
       
    }
        res.json({place});
    
   
};


const getPlacesByUserId =(req,res,next)=>{
    
    const userId = req.params.userId;//{pid  : 'p1'}
    const user = DUMMY_PLACES.filter(p=> {
        return p.creator === userId
    })
    if(!user || user.length ===0){
      
        return next(new HttpError('Could not find a place for the provided user id ', 404));
        
      }
    res.json({user});
};

const createPlace = (req, res, next)=>{
  const {title, description, coordinates,address, creator} = req.body;
  const createdPlace ={
      id: uuid.v4(),
      title,
      description,
      location: coordinates,
      address,
      creator
  } 
  DUMMY_PLACES.push(createPlace);
  res.status(201).json({place: createdPlace});
}

const updatePlace = (req,res,next)=> {
    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatePlace = {...DUMMY_PLACES.find(p=> p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p=> p.pid === placeId)
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;
    res.status(200).json({place : updatePlace})

};

const deletePlace =  (req,res,next)=> {
    const placeId = req.params.pid;
    DUMMY_PLACES=DUMMY_PLACES.filter(p=> p.id !== placeId);
    res.status(200).json({message: 'Deleted place', place : DUMMY_PLACES})
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId =getPlacesByUserId;
exports.createPlace =createPlace;
exports.updatePlace =updatePlace;
exports.deletePlace = deletePlace;