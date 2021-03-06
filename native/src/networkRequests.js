import axios from 'axios';

const localPort = 'http://192.168.1.64:5000';

const config = { headers: { 'Content-Type': 'application/json' } };

export const TablesApi = ( ( ) => ({
      postTable: ( data ) => {
          let body = JSON.stringify( data );
          return new Promise( ( resolve , reject ) => {
              axios.post( `${ localPort }/api/client/bookTable/` , body , config )
                   .then(   res => res.data )
                   .then(  data => resolve( data ))
                   .catch(  err => reject( err.response.data ) );
          });
      }
}))();

export const ShoppingApi = ( ( ) => ({

      addressLookup: ( query ) => {
        return new Promise( ( resolve , reject ) => {
            axios.get( `${ localPort }/api/client/addresslookup?address=${ query }`)
                 .then(   res => res.data )
                 .then(  data => resolve( data ))
                 .catch(  err => reject( err.response.data ) );
        });
      },

      populateOrderTimes: ( ) => {
          return new Promise( ( resolve , reject ) => {
              axios.get( localPort + '/api/client/orderTimes')
                   .then(   res => res.data )
                   .then( times => resolve( times ))
                   .catch(  err => reject(err.response.data) );
          });
      },

      getMenu: ( ) => {
        return new Promise( ( resolve , reject ) => {
            axios.get( localPort + '/api/client/getMenu')
                 .then(  res => res.data )
                 .then( food => resolve( food ))
                 .catch( err => reject( err.response.data ));
        });
      },

      makeOrderPurchase: ( orderUser , orderIsMade ) => {
            // properties of orderUnclean = _id , sectionId , quantity from order.
            let order = orderIsMade.map( ( { quantity , sectionId , _id } ) => {
               return { quantity , menuSection : sectionId , menuItemId : _id }
            });

           let obj = { user : orderUser , orderUnclean: order } ,
              body = JSON.stringify( obj );

          return new Promise( ( resolve , reject ) => {
                axios.post( localPort + '/api/client/order' , body , config )
                     .then(  res => res.data )
                     .then( data => resolve( data ))
                    .catch(  err => reject(  err.response.data ));
          });
       },
}))();
