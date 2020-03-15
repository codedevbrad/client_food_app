const mongoose = require('mongoose');
const Staff    = require('./model');

require('../graphObj');

// customer schema
const CustomerType = new GraphQLObjectType ({
  name: 'customer' ,
  fields: () => ({
    id:    { type: GraphQLString } ,
    name:  { type: GraphQLString } ,
    email: { type: GraphQLString } ,
    age:   { type: GraphQLString }
  })
});

module.exports.query = ( ) => ({

      Getcustomers: () => ({
              type: new GraphQLList( CustomerType ) ,
              async resolve ( parentValue , args ) {
                  if ( true == true ) return new Error('authentication error example');
                  return Staff.find();
              }
      }),
      Getcustomer: () => ({
              type: CustomerType ,
              args: { id: { type: GraphQLString } },

              async resolve ( parentValue , args ) {
                  return Staff.findById( args.id );
              }
      })
});

module.exports.mutation = ( ) => ({

        Addcustomer: () => ({
              type: CustomerType ,
              args: {
                  name:  { type: new GraphQLNonNull( GraphQLString )} ,
                  email: { type: new GraphQLNonNull( GraphQLString )} ,
                  age:   { type: new GraphQLNonNull( GraphQLInt    )}
              },

              resolve( parentValue , args ) {
                  const { name , email , age } = args;

                  const newUser = new Staff( { name , email , age } );

                  return newUser.save()
                      .catch( err => {
                          throw new Error('error' , err );
                      })
              }
        }) ,

        removeCustomer: () => ({
              type: CustomerType ,
              args: { id: { type: new GraphQLNonNull( GraphQLString )} } ,

              resolve( parentValue , args ) {
                 return Staff.remove( { _id: args.id })
              }
        })
});



//
