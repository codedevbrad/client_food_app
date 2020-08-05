import React, { Fragment , useEffect , useState } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import Pusher   from 'pusher-js';
import Dropdown from '../snippets/dropdown';
import './headStyles.scss';

const Notification = ( ) => {
     // 0  = notify show ' hide', 1 = notify state after x seconds , msg
     const [ notification , alertNotification ] = useState( [ false , false , { } ]);
     var audio = new Audio('./notification_Sound.mp3');

     const pusherConnection = useStoreState( state => state.pusherNotifyState );
     const updatePusherCon  = useStoreActions( actions => actions.updateNotifyState );

     useEffect( () => {
       updatePusherCon( true );
       if ( !pusherConnection ) {
             console.log('we only run notify once');
             var pusher = new Pusher( process.env.REACT_APP_PUSHER_CLIENTID , { cluster: 'eu' , forceTLS: true });
             var orders = pusher.subscribe('notification');

             orders.bind('new' , ( data ) => {
                    window.focus();
                    console.log('notification incoming');
                    alertNotification( [ true , true , { msg: data.msg } ]);
                    var playPromise = audio.play();
                    if (playPromise !== undefined) {
                    playPromise.catch( err => console.log( 'sound error') );
                    }
                    setTimeout( () => {
                        alertNotification([ true , false , {} ]);
                    }, 10000 );
             });
       }
        // eslint-disable-next-line
     }, [  ]);

    const dropdownNotification = ( ) => {
          return (
            <Fragment>
                <div className="dropdown-content">
                      <ul id="navigation">
                          <li> current </li>
                      </ul>
                </div>
            </Fragment>
          )
    }

    return (
      <div className="dropdown notification_new">
          { notification[1] && <div className="msg_not_alert"> <p> { notification[2].msg } </p> </div> }
          <Dropdown class={ notification[0] ? "nav_menu active_notification_bell" : "nav_menu" }
                    link={ <i className="far fa-bell" > </i> }
                 element={ dropdownNotification() }
          />
      </div>
    )
}

const Header = ( props ) => {
    const user = props.user;
    const logout = useStoreActions( actions => actions.logoutUser );
     useEffect(() => {
       console.log( 'loading header ');
       // eslint-disable-next-line
     }, []);

    const dropdownNavLink = ( props ) => { return (
       <Fragment>
           <h1 className="head_user_name">     { user.username } </h1>
           <div className="head_user_profile"> <h3> A </h3>     </div>
       </Fragment>
    )}

    const dropdownNavUl = ( props ) => {
      return (
          <Fragment>
            <div className="dropdown-content">
                <ul> <li onClick={ logout }> log out </li>  </ul>
            </div>
          </Fragment>
       )
    }

   const dropdownMenuUl = ( ) => {

      const changePage = useStoreActions( actions => actions.updateComponent );

      return (
          <Fragment>
              <div className="dropdown-content">
                    <ul id="navigation">
                        <li onClick={ e => changePage( 0 ) }> menu  </li>
                        <li onClick={ e => changePage( 1 ) }> cms   </li>
                        <li onClick={ e => changePage( 2 ) }> admin </li>
                    </ul>
              </div>
          </Fragment>
       )
    }

    return (
      <div className="header">
        <div id="header_top"> </div>
        <div id="header_adjust">
              <div id="head_appname">
                  <svg id="do_nav-logomark" x="0px" y="0px" viewBox="65.2 173.5 180 180" fill="currentColor">
                  <path d="M155.2,351.7v-34.2c36.2,0,64.3-35.9,50.4-74c-5.1-14.1-16.4-25.4-30.5-30.5c-38.1-13.8-74,14.2-74,50.4l0,0H67c0-57.7,55.8-102.7,116.3-83.8c26.4,8.3,47.5,29.3,55.7,55.7C257.9,295.9,213,351.7,155.2,351.7z"></path> <polygon points="155.3,317.6 121.3,317.6 121.3,283.6 121.3,283.6 155.3,283.6 155.3,283.6"></polygon> <polygon points="121.3,343.8 95.1,343.8 95.1,343.8 95.1,317.6 121.3,317.6"></polygon> <path d="M95.1,317.6H73.2l0,0v-21.9l0,0h21.9l0,0V317.6z"></path></svg>
                  <h3> the ashcott <span> ( admin ) </span> </h3>
              </div>

              <div id="head_social">
                    <Notification />
                    <Dropdown class="nav_menu"      link={ <h1> nav <i className="fas fa-sort-down"> </i> </h1> } element={ dropdownMenuUl()  } />
                    <Dropdown class="nav_head_menu" link={ dropdownNavLink()  } element={ dropdownNavUl()   } />
              </div>
        </div>
      </div>
    );
}

export default Header;
