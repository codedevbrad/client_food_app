
let cloudinary = require('cloudinary')
const Detail   = require('./feature_models/detail').infoDetails;
const Cms      = require('./feature_models/detail').cms;

const config   = require('../../../config/services.js') ,
     cloudKeys = config.cloudinaryConfig();
    cloudinary.config( cloudKeys );

module.exports.appDetails_get = ( req , res , next ) => {
    Detail.find( { type : req.query.type } )
          .then( detail => res.status( 200 ).send( detail ))
          .catch( next );
};

module.exports.appDetails_post = ( req , res , next ) => {
    const { infoDetail , type , idType } = req.body;
    const newDetail = new Detail( { infoDetail , type , idType } );
    newDetail.save( )
             .then(  detail => res.status( 200 ).send( detail ) )
             .catch( next );
};

module.exports.appDetails_edit = ( req , res , next ) => {
    Detail.findOneAndUpdate( { _id : req.query.id } , { infoDetail : req.body.string } , { new : true } )
         .then( detail => res.status( 200 ).send( detail ))
         .catch( next );
};

module.exports.appDetails_delete = ( req , res , next ) => {
    const id = req.query.id;
    Detail.findOneAndRemove( { _id : id })
         .then(    id => res.status( 200 ).send( id ))
         .catch( next );
};

module.exports.appCMS_get = ( req , res , next ) => {
     // what to search and what filter to add.
     const { belongsTo } = req.query;
     Cms.find( { belongsTo } )
        .then( array => res.status(200).send(array ))
        .catch( next );
}

module.exports.appCMS_delete = ( req , res , next ) => {
     const { id } = req.query;
     Cms.findOneAndRemove( { _id : id })
       .then( arr => res.status( 200 ).send( arr ))
       .catch( next );
};

module.exports.app_cloudinary_file = async ( req , res , next ) => {
       const { belongsTo } = req.query;
       // infodetail = description
       // belongsTo  = menu , photo
       // attachment = pdf or image string
       const values = Object.values( req.files ) ,
             upload = values.map( image => cloudinary.uploader.upload( image.path ));

      let uploadRes = await Promise.all( upload )
                                   .catch( next );
       const cmsObj = new Cms( { infoDetail : 'placehold_change' , belongsTo , attachment : uploadRes[0].url } );
       cmsObj.save()
          .then( fileObj => res.status( 200 ).send( fileObj ))
          .catch( next );
}

module.exports.app_cloudinary_image = ( req , res , next ) => {
    const { sectionId , itemId } = req.query;
    const values = Object.values( req.files );
    const upload = values.map( image => cloudinary.uploader.upload( image.path ));
    Promise.all( upload )
           .then( image => { res.status( 200 ).send( image[0].url )})
           .catch( next );
}


//
