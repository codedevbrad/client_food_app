import React , { useState , useEffect , useRef } from 'react';
import Modal from '../../../snippets/modal';
import axios from 'axios';

import './weekdayStyles.scss';

const OrderDays = ( props ) => {

      const [ weekdaysActive , setWeekdaysActive ] = useState( [ ] );
      const [ weekdayTemp    , setWeekdayTemp ] = useState( { } );

      const openTimeRef = useRef( null);
      const closeTimeRef = useRef( null );

      useEffect( ( ) => {
            axios.get( '/api/app/shopDetails')
                 .then(  res => res.data )
                 .then( data => setWeekdaysActive( data.openingTimes ) )
                 .catch( err => console.log( err ) );
      }, []);

      const saveNewTimeReq = ( array ) => {
          const body = JSON.stringify( { weekArray : array } );
          const config = { headers: { 'Content-Type': 'application/json' } };

          return new Promise( ( resolve , reject ) => {
                axios.post('/api/app/shopDetails/week' , body , config )
                     .then(  res => res.data )
                     .then( data => resolve( data ))
                    .catch(  err => reject(  err.response.data ));
          });
      }

      const submitNewStatus = ( index , status ) => {
          let array = [ ...weekdaysActive ];
          let day = array[ index  ];
              day.open = status;

          saveNewTimeReq( array )
            .then( resArr => setWeekdaysActive( resArr ))
            .catch(   err => console.log( err ) );

      }

      const saveNewTimes = ( index ) => {
          let open = openTimeRef.current.value;
          let closed = closeTimeRef.current.value;

          let array = [ ...weekdaysActive ];
          let obj = array[ index  ];
              obj.day.openTime  = open;
              obj.day.closeTime = closed;

          saveNewTimeReq( array )
            .then( resArr => setWeekdaysActive( resArr ))
            .catch(   err => console.log( err ) );
      }

      return (
        <div id="orderActive_section">
            <div className="content_section_head">
                <h1 className="title-m"> decide when to take orders </h1>
                <p className="content_section_info p-m">
                    decide when you're open and how people should get in contact with your business.
                </p>
            </div>
            <ul className="orderActive_section_ul">
                { weekdaysActive.map( ( eachDay , index ) =>
                    <li className={ eachDay.open ? 'day_is_active' : '' }>
                        <p onClick={ ( ) => submitNewStatus( index , !eachDay.open ) } > { eachDay.day.name } </p>
                        <Modal link={  <i className="fas fa-edit"> </i> } id="modal_shopWeekdays">
                              <div>
                                  <h3> { eachDay.day.name } : { eachDay.open ? 'open' : 'closed'  } </h3>
                                  <h3> toggle shop status </h3>
                                  <label for="appt"> opening time : {  eachDay.day.openTime } </label>
                                  <input type="time" name="openingTime" ref={ openTimeRef }  />

                                  <label for="appt"> closing time : { eachDay.day.closeTime } </label>
                                  <input type="time" name="closingTime"  ref={ closeTimeRef }  />

                                  <div onClick={ ( ) => saveNewTimes( index ) }> save </div>
                              </div>
                        </Modal>
                    </li>
                )}
            </ul>
        </div>
      )
}


export default OrderDays;
