const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json())

app.use('/api/places',placesRoutes);
app.use('/api/users',userRoutes);

app.use((req,res,next)=>{
    const error = new HttpError('could not found the route',404);
    throw error;
})

//default error handler middleware
//if a middleware is taking 4 param then express treat it as 
//error handler middleware
app.use((error,req,res,next)=>{
    //checking response has already been sent
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured'})
})

app.listen(5000);