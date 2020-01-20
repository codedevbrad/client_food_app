import axios from 'axios';

export const handleTables = ( ( ) => ({

        getReservations : ( filter ) => {
            return new Promise( ( resolve , reject ) => {
                axios.get('/api/incoming/reserve?filter='+ filter )
                      .then(  res => resolve( res.data ))
                      .catch( err => resolve( err.response.data ));
            });
        }
}))();

export const handleOrders = ( ( ) => ({

        getOrders : ( filter ) => {
            return new Promise( ( resolve , reject ) => {
                axios.get('/api/incoming/orders?filter='+ filter )
                     .then(  res => resolve( res.data ))
                     .catch( err => reject( err.response.data ));
            });
        }
}))();
