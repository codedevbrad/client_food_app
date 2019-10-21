import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };

export const details = ( ( ) => ({

      getDetails : ( detailType ) => {
          return new Promise( ( resolve , reject ) => {
              axios.get('/api/app/details?type='+ detailType )
                   .then(  res => res.data )
                   .then ( arr => resolve( arr ))
                   .catch( err => reject( err.response.data ));
          });
      } ,

      postDetails : ( infoDetail , type , idType ) => {
          const body = JSON.stringify( { infoDetail , type , idType } );
          return new Promise( ( resolve , reject ) => {
              axios.post('/api/app/details/' , body , config )
                   .then(  res  => res.data )
                   .then ( item => resolve( item ))
                   .catch( err  => reject( err.response.data ));
          });
      } ,

      updateDetails : ( value , id ) => {
          const body = JSON.stringify( { string : value } );
          return new Promise( ( resolve , reject ) => {
              axios.post('/api/app/details/edit?id='+id , body , config )
                   .then(  res  => res.data )
                   .then ( item => resolve( item ))
                   .catch( err  => reject( err.response.data ));
          });
      } ,

      deleteDetails : ( id ) => {
          return new Promise( ( resolve , reject ) => {
              axios.delete('/api/app/details/edit?id='+id )
                   .then(  res  => res.data )
                   .then ( item => resolve( item ))
                   .catch( err  => reject( err.response.data ));
        });
      }

}))();
