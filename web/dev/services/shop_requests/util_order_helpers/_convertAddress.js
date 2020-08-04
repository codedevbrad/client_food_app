
const axios = require('axios');

 const convertAddress = async ( addressQuery ) => {
   let fetched = await axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${ process.env.geoJsonKey }&searchtext= ${ addressQuery }`)
                   .then( data => data.data )
                   .then(  loc => loc );

    let filtered = fetched.Response.View[0].Result[0].Location;
    let address  = filtered.Address;
    let position = filtered.NavigationPosition[0];
    return { position };
 }

module.exports = convertAddress;
