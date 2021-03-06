const API_KEY  = 'AIzaSyBFpPmt3n95UZPxyxCApIcx_x0vse09qgA';
const axios = require('axios');
const HttpError = require('../models/http-error');
//convert address to coordinate

async function getCoordsForAddress (address) {
    //   await 
   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}key=${API_KEY}`)
    const data  = response.data;
    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('Could not find the location',422);
        throw error;
    }
    console.log('data ' +JSON.stringify(data))
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;