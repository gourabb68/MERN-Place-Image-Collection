const uuid = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/user');
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Gourab',
        email: 'gourabb68@gmail.com',
        password: 'tester'
    }
]

const getUsers =async (req,res,next)=> {
    
    let users;
    try{
        users =await User.find({}, '-password')
    }
    catch(err){
        const error = new HttpError(
            'Fetching users failed, please try again',500
        )
        return next(error)

    }
    
//    res.status(200).json({users: DUMMY_USERS})
res.json({users: users.map( user => user.toObject({getters:true}))})
};


const signup =async (req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors)
        return next(
    new HttpError('Invalid input pass please check ur data',422)
        );
    }
const { name ,email,password}= req.body;
let existingUser;
try{
     existingUser  =User.findOne({email: email})

}catch(err){
    const error = new HttpError('Signing up failed. Please try again later',500)
}
if(existingUser) {
    const error = new HttpError(
        'User exist alredy, Please login instead',422
    )
}


// const hasUser =DUMMY_USERS.find(u=> u.email === email);

// if(hasUser){
//     throw new HttpError('Could not create user as email already exist',422);
// }

const createdUser = new User({
    name,
    email,
    password,
    image:'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
    places:[]
})
// DUMMY_USERS.push(createdUser);
try{
    await createdUser.save();

}
catch(err){
    const error =new HttpError('Creating user is falied'+err, 500)
    return next(error)
}
res.status(201).json({user: createdUser.toObject({getters:true})});

}

const login = async(req,res,next)=>{
   const {email,password} = req.body;
//    const identifiedUser = DUMMY_USERS.find(u=> u.email === email);
//    if(!identifiedUser || identifiedUser.password !== password){
//     return (
//          new HttpError('Could not identify user credential seems to be wrong',401)
//     )
//    }
let existingUser;
try{
     existingUser  =await User.findOne({email: email})

}catch(err){
    const error = new HttpError('Signing up failed. Please try again later',500)
}
console.log
if(!existingUser || existingUser.password !== password) {
    const error = new HttpError(
        'Invalid credential, could not login',422
    )
    return next(error)
}


   res.json({message : 'Logged In'});
}

exports.getUsers =getUsers;
exports.signup =signup;
exports.login = login ;