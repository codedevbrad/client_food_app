
const StaffQueries  = require('./queries').query;
const StaffMutation = require('./queries').mutation;

require('../graphObj');

// root Query
const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType' ,
    fields: {
      customer:  StaffQueries( ).Getcustomer() ,
      customers: StaffQueries( ).Getcustomers()
    }
});

// mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation' ,
    fields: {
        addCustomer:    StaffMutation( ).Addcustomer(),
        removeCustomer: StaffMutation( ).removeCustomer()
    }
});

module.exports = new GraphQLSchema ({
    query:    RootQuery ,
    mutation: Mutation
});
