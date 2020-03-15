
const Menus = require('./feature_models/order_menu');

module.exports.arrangeMenu = async( req , res , next ) => {
          const menuPositions = req.body.menu;
          for ( i = 0; i < menuPositions.length; i++ ) {
              let updateObj = await Menus.findOneAndUpdate( { _id: menuPositions[i].sectionId } , { posIndex : menuPositions[i].posIndex } , { new : true })
                      .catch( err => { return { code: 500 , msg: 'err, something went wrong'}});
              if ( updateObj.code == 500 ) {
                 return next( updateObj.msg )
              }
          };
          res.status( 200 ).send( 'success' );
}

module.exports.menuGet = ( req , res , next ) => {
      Menus.find()
           .sort({ posIndex: + 1 })
           .then( menus => res.status( 200 ).send( menus ))
           .catch( next );
}

module.exports.menuPost = ( req , res , next ) => {
       const { section , posIndex } = req.body;
       console.log( posIndex );
       if ( section === undefined || posIndex === undefined ) { throw new Error('error with request') };

       // res.status(200).send('success');
       const newMenu = new Menus({
             sectionName: section , sectionItems: [ ] , posIndex: posIndex
       });
       newMenu.save( )
              .then( menu => res.status( 200 ).send( menu ) )
              .catch( next );
}

module.exports.menuAlter_post = ( req , res , next ) => {
     const id = req.query.id;
     const { value } = req.body;
     Menus.findOneAndUpdate( { _id : id }, { sectionName : value } , { new : true })
           .then(  menu => res.status( 200 ).send( menu ))
           .catch( next );
}

module.exports.menuAlter_delete = ( req , res , next ) => {
     const id = req.query.id;
     Menus.findOneAndRemove( { _id : id })
          .then(  menu => res.status( 200 ).send( menu ))
          .catch( next );
}

module.exports.menuItem_post = ( req , res , next ) => {
     const id = req.query.id;
     const { product , price , imgUrl } = req.body;
     const newItem = { product , price , inStock : true , menuShow : true , imgUrl };
     // add a new id value to the item for tracing...
     Menus.findOneAndUpdate( { _id : id } , { $push: { sectionItems : newItem } } , { new : true } )
          .then( menu => res.status( 200 ).send( newItem ))
          .catch( next );
}

module.exports.menuItem_alter = ( req , res , next ) => {

    const { sectionId , itemId } = req.query;
    const obj = { product , price , inStock , menuShow , imgUrl } = req.body;

    Menus.findOneAndUpdate( { "sectionItems._id" : itemId } , { "$set" : { "sectionItems.$" : obj }} , { new : true } )
          .then( array => res.status( 200 ).send( array ))
          .catch( next );
}

module.exports.menuItem_delete = ( req , res , next ) => {

    const { sectionId , itemId } = req.query;
    Menus.findOneAndUpdate( { "sectionItems._id" : itemId } , { "$pull" : { sectionItems : { _id : itemId } }} , { new : true } )
          .then( array => res.status( 200 ).send( array ))
          .catch( next );
}


//
