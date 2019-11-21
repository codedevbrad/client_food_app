import axios from 'axios';

// const config = { headers: { 'Content-Type': 'application/json' } };

export const handleTables = ( ( ) => ({

        getReservations : ( filter ) => {
            return new Promise( ( resolve , reject ) => {
                axios.get('/api/customer/reserve?filter='+ filter )
                      .then(  res => resolve( res.data ))
                      .catch( err => resolve( err.response.data ));
            });
        }
}))();

export const handleOrders = ( ( ) => ({

        getOrders : ( filter ) => {
            return new Promise( ( resolve , reject ) => {
                axios.get('/api/customer/collect/get?filter='+ filter )
                     .then(  res => resolve( res.data ))
                     .catch( err => reject( err.response.data ));
            });
        }
}))();
