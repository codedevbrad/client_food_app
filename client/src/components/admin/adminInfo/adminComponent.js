import React, { Component , Fragment , useEffect , useState , useRef } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
import axios from 'axios';
import Accordition from './accordition/module_component';

import './adminStyles.scss';


const AdminInfo = ( { } ) => {

  const [ apikeysUsed , setApikeysUsed ] = useState( [ ] );

  useEffect( ( ) => {
        axios.get( '/api/app/shopDetails')
             .then(  res => res.data )
             .then( data => setApikeysUsed( data.apisUsed ) )
             .catch( err => console.log( err ) );
  }, []);

  return (
      <div id="admin_info_container">
          <h2> api's used  </h2>
          <div id="apisUsed">
              { apikeysUsed.map( ( eachKey , index ) =>
                  <Accordition title={
                      <h1> { eachKey.name } <span className={ eachKey.isPublic ? 'public' : 'private' }> { eachKey.isPublic ? '( public )' : '( private )' } </span> </h1> } 
                      containerClass="eachAPIkey">

                      <div className="eachAPIkey_info">
                        <a href={ eachKey.link }> { eachKey.link } </a>
                        <p> { eachKey.description } </p>
                      </div>
                  </Accordition>
              )}
          </div>
      </div>
  )
}

export default AdminInfo;
