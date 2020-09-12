const HttpError = require('../models/http-error');
const uuid = require('uuid');
const mongoose = require('mongoose')
const {validationResult} = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')
const User = require('../models/user');
const mongooseUniqueValidator = require('mongoose-unique-validator');
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

const getPlaceById = async(req,res,next)=>{


    console.log('GEt Request in Places');
    const placeId = req.params.placeId;//{pid  : 'p1'}
    console.log(placeId);
    // const place = DUMMY_PLACES.find(p=> {
    //     return p.id === placeId
    // })
    let place;
    try{
         place =await Place.findById(placeId).exec();
    }catch(err){
        const error = new HttpError(
            'Sometings went wrong, could not find a place',500
        );
        return next(error)
    }
    
    if(!place){
      //calling the error handler next(error) or throw(err)
      //for asynchrounous code use return next(err)
      //for synchrounous code use throw(err)
      throw new HttpError('Could not find a place for the provided id ',404)
       
    }
    //changing the mongoose return object to bject
        res.json({place: place.toObject({getters: true})});
    
   
};


const getPlacesByUserId =async(req,res,next)=>{
    
    const userId = req.params.userId;//{pid  : 'p1'}
    // const user = DUMMY_PLACES.filter(p=> {
    //     return p.creator === userId
    // })
    // let places;
    let userWithPlaces;
    try{
        userWithPlaces = await User.findById(userId).populate('places')
    }catch(err){
        const error = new HttpError(
            'Sometings went wrong, could not find a userId',500
        );
        return next(error)
    }

    if(!userWithPlaces || userWithPlaces.length ===0){
      
        return next(new HttpError('Could not find a place for the provided user id ', 404));
        
      }
    res.json({places: userWithPlaces.places.map(place => place.toObject({getters:true}))});
};

const createPlace =async (req, res, next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors)
        next(new HttpError('Invalid input pass please check ur data',422));
    }
  const {title, description, location,address, creator} = req.body;
    // let coordinates;
  try{
    // const coordinates= await getCoordsForAddress(address);
}
catch(error) {
   next(error);
}
  

  const createdPlace = new Place({
      title,
      description,
      address,
      location,
      image: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
      creator

  })
//   DUMMY_PLACES.push(createPlace);
//cheking user is exist or not then only allow to add place
let user;
try{
user =await User.findById(creator)
}catch(err){
    const  error = new HttpError(
        'Creating Place Failed, Please try again',
        500
    )
}
if(!user){
    const error =new HttpError('Could not find user  for provided Id',500)
    return next(error)
}
console.log(user);
try{
    //here we are doing two thing saving place and saving 
    //user Id in place if any of these failed it should 
    //undo all the  changes so using session and transation
    const sess= await mongoose.startSession();
    //start transaction
    sess.startTransaction();
    
    //part 1 saving place
    await createdPlace.save({session: sess});

    //part 2  adding place id in user
    user.places.push(createdPlace);
    await user.save({session: sess})

    //if everything on now save all in db or changes will undo
    await sess.commitTransaction();

}
catch(err){
    const error =new HttpError('Creating place is falied'+err, 500)
    return next(error)
}

  res.status(201).json({place: createdPlace});
}

const updatePlace =async (req,res,next)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors)
        throw new HttpError('Invalid input pass please check ur data',422);
    }
    const {title, description} = req.body;
    const placeId = req.params.pid;

    // const updatePlace = {...DUMMY_PLACES.find(p=> p.id === placeId)};
    // const placeIndex = DUMMY_PLACES.findIndex(p=> p.pid === placeId)
    
    let place;
    try{
        place = await Place.findById(placeId);
    }catch(err){
        const error = new HttpError(
            'Sometings went wrong, could not update a userId',500
        );
        return next(error)
    }
    place.title = title;
    place.description = description;

    // DUMMY_PLACES[placeIndex] = updatePlace;
    //storing data
    try{
        await place.save();

    }catch(err){
        const error = new HttpError(
            'Sometings went wrong, could not update a userId',500
        );
        return next(error)
    }
    res.status(200).json({place : place.toObject({getters:true})})

};

const deletePlace = async (req,res,next)=> {
    const placeId = req.params.pid;
    // if(!DUMMY_PLACES.find(p=> p.id === placeId)){
    //     throw new HttpError('Could not find a place',404)
    // }
    // DUMMY_PLACES=DUMMY_PLACES.filter(p=> p.id !== placeId);
    let place;
    try{
        place = await  Place.findById(placeId).populate('creator');
    }catch(err){
        const error = new HttpError(
            'Sometings went wrong, could not update a userId',500
        );
        return next(error)
    }
    //if place exist
    if(!place){
        const error = new HttpError('could not find place',404)
        return next(error);
    }


   try{
       const sess = await mongoose.startSession();
       sess.startTransaction();
       await place.remove({session: sess});
       place.creator.places.pull(place);
       await place.creator.save({session: sess});
       await sess.commitTransaction();
   }
   catch(err){
    const error = new HttpError(
        'Sometings went wrong, could not update a userId',500
    );
    return next(error)
}
    res.status(200).json({message: 'Deleted place' })
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId =getPlacesByUserId;
exports.createPlace =createPlace;
exports.updatePlace =updatePlace;
exports.deletePlace = deletePlace;