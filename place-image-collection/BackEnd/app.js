const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

//CORS POLICY
app.use((req,res,next)=>{
    //allow any domain to send request
    res.setHeader('Access-Control-Allow-Origin','*');

    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH,GET, POST, DELETE')
    next();
})

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

// app.listen(5000);
// mongoose
//   .connect('mongodb+srv://Gbanerjee:Gourab@007@cluster0.dbqee.gcp.mongodb.net/places?retryWrites=true&w=majority',
//   { useNewUrlParser: true } )
//   .then(()=>{
//     app.listen(5000);
///   })
///   .catch((err)=> console.log(err +' failed'))

const url ='mongodb+srv://Gourab:Gourab@007@cluster0.dbqee.gcp.mongodb.net/mern?retryWrites=true&w=majority';
mongoose.connect(url, { useUnifiedTopology: true ,useNewUrlParser: true }).then(()=>{
    console.log('Connected  to DB');
    app.listen(5000);
    // console.log('Connected  to backend express server');
}).catch(()=>{
    console.log('connection Failed')
});