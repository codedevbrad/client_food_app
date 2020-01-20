// test saving an object as an async function and if it fails, passing next to the .catch. does it work?.
const mongoose = require('mongoose');

const TestModel = mongoose.model('Tests', new mongoose.Schema ({
    name:    { type: String , required: true } ,
    age:     { type: Number , required: true } ,
}));

// post functions

const calculateCost = ( ) => {
    return new Promise( ( resolve , reject ) => {
          reject('sorry');
    });
}
const getPosts = async( next ) => {
    let posts = await TestModel.find( )
                   .catch( err => { return { code: 500 , msg: 'could not find data in async' }});
    if ( posts.code == 500 ) {
        return next( posts.msg );
    }
    return posts;
}

const testMe = ( next ) => {
        return TestModel.find( { _id: 50 } )
              .catch( err => next('could not find data in promise'));
}

const testLoop = ( ) => {
      return new Promise( async( resolve , reject ) => {
          for ( let i = 0; i < 5; i++ ) {
            console.log('each');
            let find = await TestModel.find( {_id : 5} )
                          .catch( err => { return { code: 500 , msg: 'err, something went wrong'}});
            if ( find.code == 500 ) { return reject( find.msg )}
          }
      });
}

// get functions

const testMeget = async ( next ) => {
        let all = [ ];
        for ( i = 0; i <= 5; i++ ) {
              console.log('looping:' , i );
              let data = await TestModel.find(  )
                            .then( data => all.push( data[0] ))
                            .catch( err => { throw new Error()});
        }
        return all;
}
const normalPromise = ( ) => {
      return TestModel.find( { _id: 5 } )
                .then( data => all.push( data[0] ))
                .catch( err => { throw new Error } );
}

module.exports.testSuite_get = async( req , res , next ) => {

      for ( let i = 0; i < 5; i++ ) {
          console.log('each');
          let find = await TestModel.find( { _id: 5 } )
                                    .then( data => all.push( data[0] ))
                                    .catch( err => { return {code: 500 , msg: 'err' } } );
          if ( find.code == 500 ) {
             return next( find.msg )
          }
      }
      console.log('after');
      res.status(200).send('success');
      //
      // normalPromise(  )
      //     .then( data => res.status( 200 ).send( data ))
      //     .catch( err => next('could not find data in promise'));
      //
      // try {
      //     let data = await testMeget( next )
      //                      .catch( err => { throw new Error('could not find an item')} );
      //     console.log( 'after' , data );
      //     res.status( 200 ).send( 'success' );
      //
      // } catch( err ) {
      //     next(err);
      // }
}

module.exports.testSuite = async( req , res , next ) => {

    // let data = await testLoop()
    //               .catch( err => { return { code: 500 , msg: 'err, something went wrong'}});
    //
    // if ( data.code == 500 ) { return next( data.msg )}
    // console.log( 'next ');

    // for ( i = 0; i <5; i++ ) {
    //      console.log( 'each' );
    //      let posts = await getPosts()
    //           .catch( err => { return { code: 500 , msg: 'err, something went wrong'}});
    //      if ( posts.code == 500 ) {
    //         return next( posts.msg )
    //      }
    // };
    // console.log( 'next' );
    //
    // let posts = await getPosts( next );
    // res.status( 200 ).send( posts );
    // testMe( next )
    //   .then( data => res.status( 200).send( data ))


    // let testme = await calculateCost()
    //                   .catch( err => { return { code: 500 , msg: err } });
    // if ( testme.code == 500 ) { return res.status(500).send({msg: 'nope'}) };

    // let model = await new TestModel( { age: '30' } )
    //                     .save( )
    //                           .then( booking => {
    //                               var bookingNew = booking.toObject();
    //                                   bookingNew.tableTime = '5000';
    //                               return bookingNew;
    //                           })
    //                         .catch( err => {  return { code: 500 , msg: 'err, something went wrong'}});
    // if ( model.code == 500 ) { return next( model.msg )};
    // res.status( 200 ).send( model );


    // console.log( 'ran after' );



    // console.log('ran after');
    //
    // if ( posts.code == 500 ) { return next( posts.msg )}
    // console.log('after');
    //  res.status(200).send( posts );
};
