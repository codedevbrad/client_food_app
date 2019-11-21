
import { action , thunk } from 'easy-peasy';
import axios from 'axios';

export default {

      order_menu: [] ,

      isUserAuth: false ,
      user:  { } ,
      authError: {  } ,
      error: { } ,

      adminPage: 0 ,
      incomingTab: [ 0 , 'orders' ] ,

      // pusher checks ...

      pusherNotifyState: false ,
      updateNotifyState: action(( state , boolean) => { state.pusherNotifyState = boolean  }),

      pusher_OrderState: false ,
      updateOrderState:  action(( state , boolean ) => { state.pusher_OrderState = boolean; }),

      pusher_TableState:  false ,
      update_TableState: action(( state , boolean ) => { state.pusher_TableState = boolean; }),

      // chamge component views
      updateComponent   : action(( state , el ) => { state.adminPage   = el; }),
      updateIncomingTab : action(( state , el ) => { state.incomingTab = el; }),

      // actions / thunks
      loginUser: thunk( ( actions , user ) => {
            // headers
            const config = { headers: { 'Content-Type': 'application/json' } };
            const body   = JSON.stringify( user );

            axios.post('/api/staff/login', body , config )
                  .then ( res =>  { return res.data })
                  .then ( user => {
                        actions.authenticate( user );
                   })
                  .catch( err => {
                    actions.setAuthError( err.response.data );
                  });
       }),

       getUser: thunk( actions => {
         axios.get('/api/staff/get')
           .then ( res  => res.data )
           .then ( obj  => {
               actions.authenticate( obj );
           })
           .catch( err  => {
               actions.logError( err.response.data );
           });
       }),

       authenticate: action( ( state , user ) => {
            state.user = user;
            state.isUserAuth = true;
       }),

       setAuthError: action( ( state , error ) => {
            state.authError = error;
       }),

       logError: action( ( state , error ) => {
            state.error = error;
       }),

       clearError: action( ( state ) => {
          state.error = { };
       }),

       clearAllErrors: action( ( state ) => {
            state.authError = {};
            state.error = {};
       })


       // new orders
}
