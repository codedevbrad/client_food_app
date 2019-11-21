import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };
const configFile = { headers: {'Content-Type': 'multipart/form-data' }};

export const cmsHandle = ( ( ) => ({

      getCmsContent: ( type ) => {
          return new Promise( ( resolve , reject ) => {
              axios.get('/api/app/cms?belongsTo='+ type )
                   .then(  res => res.data )
                   .then ( arr => resolve( arr ))
                   .catch( err => reject( err.response.data ));
          });
      },

      postCmsContent: ( ) => { } ,

      editCmsContent: ( ) => {

      },

      cloudinaryUpload: ( file , type ) => {
          var formData = new FormData();
              formData.append('file' , file );
          return new Promise( ( resolve , reject ) => {
                  axios({  method: 'post', url: '/api/app/cms/file?belongsTo='+type , data: formData , config: configFile })
                     .then(  obj => resolve( obj.data ))
                     .catch( err => reject( err.response.data ));
          });
      }
}))();

export const detailsHandle = ( ( ) => ({

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
