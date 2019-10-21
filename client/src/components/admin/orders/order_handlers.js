import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };

export const menus = ( ( ) => ({
        getOrderMenu : ( ) => {
            return new Promise( ( resolve , reject ) => {
                  axios.get('/api/order/menu/')
                    .then ( res  => res.data )
                    .then ( arr  => resolve( arr ))
                    .catch( err  => reject( err.response.data ));
            });
        },

        postOrderMenu : ( el ) => {
             const body = JSON.stringify( { section: el } );
             return new Promise( ( resolve , reject ) => {
                 axios.post('/api/order/menu/' , body , config )
                      .then(  res => res.data )
                      .then(  obj => resolve( obj ))
                      .catch( err => reject( err.response.data ));
             });
        },

        postOrderMenuItem : ( arr ) => {
            const { product , price , id } = arr;
            const body = JSON.stringify( { product , price } );

            return new Promise( ( resolve , reject ) => {
                  axios.post('/api/order/menu/item?id='+id , body , config )
                       .then(  res => res.data )
                       .then( data => resolve( data ))
                      .catch(  err => reject(  err.response.data ));
            });
         },

         alterOrderMenu : ( id , type , string ) => {
             return new Promise( ( resolve , reject ) => {
                  axios( { url : '/api/order/menu/alter?id='+id , method : type , data: {  value: string  } })
                      .then(  res => res.data )
                      .then( data => resolve( data ))
                     .catch(  err => reject(  err ));
             });
         }
}))();





//
