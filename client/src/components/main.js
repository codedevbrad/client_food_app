import React, { Fragment , useState , useEffect } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import AdminDashboard from './admin';
import Login from './login/login';

const Error = ( props ) => {
    const clearError = useStoreActions( actions => actions.clearError );
    const removeError = ( e ) => {
      clearError();
    }
    return (
      <Fragment>
          <div className="error" onClick={ e => removeError() }>
            <p> { props.msg } </p>
            <p className="error_message">  the app seems to not be working as intended. please refresh your browser. </p>
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
       clearErrors();
       getUser();
       // eslint-disable-next-line
     }, []);

    return (
       <Fragment>

           { !Object.keys(error).length === false &&
             <Error msg={ error.msg }/>
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
