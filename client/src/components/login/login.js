import React, { Fragment , useEffect , useState } from 'react';
import axios from 'axios';
import { useStore , useActions } from 'easy-peasy';
import './styles.scss';

const AuthErrors = ( ) => {
  const error = useStore( state => state.authError);
  return (
    <Fragment>
      { !Object.keys(error).length === false &&
            <div className="auth_error_msg"> <h3> { error.msg } </h3> </div>
      }
    </Fragment>
  )
}

const Login = () => {

    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');

    const loginUser = useActions( actions => actions.loginUser );

    return (
      <div className="app_login">
             <header>

             </header>
             <div id="login_center_contain">
                   <div className="login_container">
                          <div id="top">
                               <h2> hi . </h2>
                               <h3>login to the ashcott admin </h3>
                          </div>
                          <div id="bottom">
                              <section>
                                    <AuthErrors />
                                    <form className="auth_form" onSubmit={ e => {

                                       e.preventDefault();
                                       loginUser( { username , password });
                                     }}>
                                       <input type="text"     placeholder="username" name="username" onChange={ e => setUsername( e.target.value )} />
                                       <input type="password" placeholder="password" name="password" onChange={ e => setPassword( e.target.value )}/>
                                       <button type="submit"  className="submit_form"> Sign in </button>
                                    </form>
                              </section>
                              <section className="form_tip_container">
                                    <div className="form_tip">
                                        <p> Organise the business , take orders and view bookings. </p>
                                    </div>
                                    <div id="form_tip_vector"> </div>
                              </section>
                          </div>
                   </div>
             </div>
      </div>
    );
}

export default Login;
