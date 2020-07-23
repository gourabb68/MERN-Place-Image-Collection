const uuid = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Gourab',
        email: 'gourabb68@gmail.com',
        password: 'tester'
    }
]

const getUsers = (req,res,next)=> {
   res.status(200).json({users: DUMMY_USERS})
};


const signup =(req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors)
        throw new HttpError('Invalid input pass please check ur data',422);
    }
const { name ,email,password}= req.body;

const hasUser =DUMMY_USERS.find(u=> u.email === email);

if(hasUser){
    throw new HttpError('Could not create user as email already exist',422);
}

const createdUser ={
    id: uuid.v4(),
    name,
    email,
    password,
}
DUMMY_USERS.push(createdUser);
res.status(201).json({user: createdUser});

}

const login =(req,res,next)=>{
   const {email,password} = req.body;
   const identifiedUser = DUMMY_USERS.find(u=> u.email === email);
   if(!identifiedUser || identifiedUser.password !== password){
    throw new HttpError('Could not identify user credential seems to be wrong',401);
   }
   res.json({message : 'Logged In'});
}

exports.getUsers =getUsers;
exports.signup =signup;
exports.login = login ;