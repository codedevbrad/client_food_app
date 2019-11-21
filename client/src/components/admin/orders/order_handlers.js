import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };
const configFile = { headers: {'Content-Type': 'multipart/form-data' }};

export const menuItem = ( ( ) => ({

        postOrderMenuItem : ( data ) => {
            const { product , price , imgUrl , id } = data;
            const body = JSON.stringify( { product , price , imgUrl } );

            return new Promise( ( resolve , reject ) => {
                  axios.post('/api/order/menu/item?id='+id , body , config )
                       .then(  res => res.data )
                       .then( data => resolve( data ))
                      .catch(  err => reject(  err.response.data ));
            });
         },

        removeMenuItem: ( sectionId , itemId ) => {
            console.log('ran');
            return new Promise( ( resolve , reject ) => {
              axios.delete('/api/order/menu/item/alter?sectionId='+ sectionId + '&itemId=' + itemId )
                   .then( array => resolve( array.data ))
                   .catch(  err => reject( err.response.data ));
            });
        },

        editMenuItem : ( obj , sectionId , itemId ) => {
            const body = JSON.stringify( obj );
            return new Promise( ( resolve , reject ) => {
              axios.post('/api/order/menu/item/alter?sectionId='+ sectionId + '&itemId=' + itemId , body , config )
                   .then( array => resolve( array.data ))
                   .catch(  err => reject( err.response.data ));
            });
        },
        cloudinaryUpload: ( file ) => {
            var formData = new FormData();
                formData.append('file' , file );
            return new Promise( ( resolve , reject ) => {
                    axios({  method: 'post', url: '/api/app/file_upload' , data: formData , config: configFile })
                       .then(  img => resolve( img.data ))
                       .catch( err => reject( err.response.data ));
            });
        }
}))();

export const menus = ( ( ) => ({

        updateOrderMenuPos : ( arr ) => {
            const body = JSON.stringify( { menu : arr } );
            return new Promise( ( resolve , reject ) => {
                axios.post('/api/order/menu/arrange' , body , config )
                     .then(  res => res.data )
                     .then(  arr => resolve( arr ))
                     .catch( err => reject( err.response.data ));
            });
        },

        getOrderMenu : ( ) => {
            return new Promise( ( resolve , reject ) => {
                  axios.get('/api/order/menu/')
                    .then ( res  => res.data )
                    .then ( arr  => resolve( arr ))
                    .catch( err  => reject( err.response.data ));
            });
        },

        postOrderMenu : ( el , arrLength ) => {
             var newPos = arrLength + 1;
             const body = JSON.stringify( { section: el , posIndex : newPos } );
             return new Promise( ( resolve , reject ) => {
                 axios.post('/api/order/menu/' , body , config )
                      .then(  res => res.data )
                      .then(  obj => resolve( obj ))
                      .catch( err => reject( err.response.data ));
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
