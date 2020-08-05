
const AppDetails = require('./details_model');

module.exports.getAppDetails = ( req , res , next ) => {
    AppDetails.findById( { _id : "5e1b68161c9d440000d63d22" } )
              .then( obj => {
                    res.status( 200 ).send( obj );
              })
              .catch( next );
}

module.exports.setAppStatus = ( req , res , next ) => {
    let { status } = req.body;
    AppDetails.findByIdAndUpdate( { _id : '5e1b68161c9d440000d63d22' } , { statusOverride : status } , { new : true } )
              .then(   obj => res.status( 200 ).send( obj ) )
              .catch( next );
};

module.exports.setDays = ( req , res , next ) => {
    let { weekArray } = req.body;
    AppDetails.findByIdAndUpdate( { _id : '5e1b68161c9d440000d63d22' } , { openingTimes : weekArray } , { new : true } )
              .then(   obj => res.status( 200 ).send( obj.openingTimes ) )
              .catch( next );
};
