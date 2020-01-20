import React, { Fragment , useState , useEffect } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
import axios from 'axios';

import AdminDashboard from './admin';
import Login from './login/login';

const Error = ( { error } ) => {
    const clearError = useStoreActions( actions => actions.clearError );
    const removeError = ( e ) => {
      clearError();
    }
    return (
      <Fragment>
          <div className="error" onClick={ e => removeError() }>
            <p> { error.msg } </p>
            <p className="error_message"> { error.portMsg } </p>
          </div>
      </Fragment>
    );
}

const MainApp = () => {

     const clearErrors = useStoreActions( actions => actions.clearAllErrors );
     const error       = useStoreState( state => state.error );

     const getUser  = useStoreActions( actions => actions.getUser );
     const isLogged = useStoreState( state => state.isUserAuth );

     useEffect(() => {
       console.log( 'loading component main' );

       axios.get('/api/test')
          .then(  msg => console.log( msg.data ))
          .catch( err => console.log( err.response.data ));

       clearErrors();
       getUser();
       // eslint-disable-next-line
     }, []);

    return (
       <Fragment>

           { !Object.keys(error).length === false &&
             <Error error={ error } />
           }

           <div className="main">
                 { !isLogged ? (
                     <Login />
                 ): (
                 <Fragment>
                     <AdminDashboard />
                 </Fragment>
                 )}
           </div>
       </Fragment>
    );
}

export default MainApp;
