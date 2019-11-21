
import Pusher from 'pusher-js';

export const pusherState = ( subscription ) => {
       let pusher  = new Pusher( process.env.REACT_APP_PUSHER_CLIENTID , { cluster: 'eu' , forceTLS: true } );
       let channel = pusher.subscribe( subscription );

       return new Promise( ( resolve , reject ) => {
           pusher.connection.bind('connected' , () => {
                resolve( channel );
           });
           pusher.connection.bind('error', ( err ) => {
               reject( err );
           });
       });
}
