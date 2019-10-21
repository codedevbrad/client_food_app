import React, { Fragment , useEffect , useState } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
import axios from 'axios';

import Pusher   from 'pusher-js';
import Header   from './header/header';
import Dropdown from './snippets/dropdown';

import Orders   from './admin/orders/orders';
import Cms      from './admin/cms/details';

import { profiles } from './sidebar/etc/profiles';
import Order_profile      from './sidebar/etc/profile';
import Statistics_sideBar from './sidebar/stats_min';
import Statistics_inDepth from './sidebar/stats_depth';
import './sidebar/sidebar.scss';

const Incoming_Reservations = ( props ) => {

  const [ isLoaded , setLoad ] = useState([ false , 'hidden' ]);
  const pusherConnection = useStoreState( state => state.pusher_TableState );
  const updatePusherCon  = useStoreActions( actions => actions.update_TableState );
  const [ tablesNew , loadTables] = useState([]);

  useEffect(() => {
       updatePusherCon( true );
       console.log('incoming reservations');
       axios.get('/api/customer/reserve?filter='+ props.filter[1] )
             .then( res => res.data )
             .then( tables => {
                 loadTables( tables );
                 setTimeout( () => {
                      setLoad([ true , 'animated fadeIn']);
                 }, 1000 );
             })
             .catch( err => console.log( err ));

       if ( !pusherConnection ) {
             console.log('we only run once');
             var pusher = new Pusher( process.env.REACT_APP_PUSHER_CLIENTID , { cluster: 'eu' , forceTLS: true });
             var orders = pusher.subscribe('reservations');

             orders.bind('new' , ( data ) => {
                   axios.get('/api/customer/reserve?filter='+ props.filter[1] )
                        .then(    res => res.data )
                        .then( tables => loadTables( tables ))
                        .catch(   err => console.log( err ));
             });
       }
       // eslint-disable-next-line
  }, [ props.filter ]);

  return (
      <div className="reservation_incoming_sidebar component_load_contain">

            { tablesNew.length == 0 && <div className="incoming_empty"> <p> no tables booked today </p> </div> }
            { !isLoaded[0] && tablesNew.length != 0 ? (
                <div className="component_load">  <i className="fas fa-circle-notch fa-spin"></i>  </div>
            ) : (
                <ul className={ isLoaded[1] }>
                    { tablesNew.map( ( table , index ) =>
                          <Order_profile key={ index } unique={ index } profile={ {
                             id : table._id ,
                             name: table.bookedName ,
                             imgUrl: profiles[0].profile ,
                             dates: [ table.tableTime , 'table ' + table.tableNumber ] ,
                             request : table.notes }
                          }/>
                    )}
                </ul>
            )}
      </div>
  )
}

const Incoming_orders = ( props ) => {

      const [ isLoaded , setLoad ] = useState([ false , 'hidden' ]);
      const pusherConnection = useStoreState( state => state.pusher_OrderState );
      const updatePusherCon  = useStoreActions( actions => actions.updateOrderState );
      const [ ordersNew , loadOrders ] = useState([]);

      useEffect(() => {
           updatePusherCon( true );
           axios.get('/api/customer/collect/get?filter='+ props.filter[1] )
                .then( res => res.data )
                .then( orders => {
                    loadOrders( orders );
                    setTimeout( () => {
                         setLoad([ true , 'animated fadeIn']);
                    }, 1000 );
                })
                .catch( err => console.log( err ));

           if ( !pusherConnection ) {
                var pusher = new Pusher( process.env.REACT_APP_PUSHER_CLIENTID , { cluster: 'eu' , forceTLS: true });
                var orders = pusher.subscribe('orders');

                orders.bind('new' , ( data ) => {
                      axios.get('/api/customer/collect/get?filter='+ props.filter[1] )
                           .then( res => res.data )
                           .then( orders => {
                              loadOrders( orders );
                           })
                           .catch( err => console.log( err ));
                });
           }
           // eslint-disable-next-line
      }, [ props.filter ]);

      return (
        <div className="orders_incoming_sidebar component_load_contain">
            { ordersNew.length === 0 && <div className="incoming_empty"> <p> no orders today </p> </div> }

            { !isLoaded[0] && ordersNew.length != 0 ? (
                <div className="component_load">  <i className="fas fa-circle-notch fa-spin"></i>  </div>
            ) : (
                <ul>
                    { ordersNew.map( ( order , index ) =>

                         <Order_profile key={ index } unique={ index } profile={ { id : order._id ,
                            name: order.customerName ,
                            imgUrl: profiles[0].profile ,
                            dates: [ order.orderTime , order.pickupTime ] ,
                            request : order.deliveryNotes }
                         }/>
                    )}
                </ul>
            )}
        </div>
      )
}

const Incoming = () => {
        const incomingTab = useStoreState( state => state.incomingTab );
        const changeTab = useStoreActions( actions => actions.updateIncomingTab );

        const [ filterOrders  , changeOFilter ] = useState([ 0 , 'orderTime' ]);
        const [ filterReserve , changeRFilter ] = useState([ 0 , 'tableTime' ]);

        const dropdownMenuUl = ( ) => {
            return (
                <Fragment>
                    <div className="dropdown-content">
                          <ul id="navigation">
                              <li onClick={ e => changeTab( [ 0 , 'orders' ] ) }>       orders       </li>
                              <li onClick={ e => changeTab( [ 1 , 'reservations' ] ) }> reservations </li>
                              <li onClick={ e => changeTab( [ 2 , 'emails'  ] ) }>      emails       </li>
                          </ul>
                    </div>
                </Fragment>
             )
        }

        const dropdownFilterUL = ( selectable ) => {
            return (
                <Fragment>
                    <div className="dropdown-content">
                        { selectable === 0 &&
                            <ul id="navigation">
                                <li className={ filterOrders[0] == 0 ? 'active' : '' } onClick={ e => changeOFilter( [ 0 , 'orderTime'  ] ) }> order time   </li>
                                <li className={ filterOrders[0] == 1 ? 'active' : '' } onClick={ e => changeOFilter( [ 1 , 'pickupTime' ] ) }> order pickup </li>
                            </ul>
                        }
                        { selectable === 1 &&
                           <ul id="navigation">
                               <li className={ filterReserve[0] == 0 ? 'active' : '' } onClick={ e => changeRFilter( [ 0 , 'tableTime'  ] ) }> table time    </li>
                               <li className={ filterReserve[0] == 1 ? 'active' : '' } onClick={ e => changeRFilter( [ 1 , 'tableNumber' ] ) }> table number </li>
                           </ul>
                        }
                    </div>
                </Fragment>
             )
        }

    return (
        <Fragment>
            <div className="incoming_dropdowns">
              <Dropdown class="dropdown_ui dropdown_icon_fix" link={ <h1> { incomingTab[1] }
                          <i className="fas fa-sort-down"> </i> </h1> }
                               element={ dropdownMenuUl()
                        } />
              <Dropdown class="dropdown_ui" link={
                        <i className="fas fa-sort-amount-down"> </i> }
                             element={ dropdownFilterUL( incomingTab[0] )
                        } />
            </div>
            { incomingTab[0] === 0 && <Incoming_orders filter={ filterOrders } /> }
            { incomingTab[0] === 1 && <Incoming_Reservations filter={ filterReserve }/> }
        </Fragment>
    )
}

const AdminDashboard = () => {

    const clearErrs = useStoreActions( actions => actions.clearAllErrors );
    const user      = useStoreState( state => state.user );
    const adminPage = useStoreState( state => state.adminPage );

    const [ sidebarMain , swapSidebar ] = useState(0);

    useEffect(() => {
         clearErrs();
         console.log('loaded admin');
         // eslint-disable-next-line
    }, [ ]);

    return (
        <div className="admin_container">

            <Header user={ user }/>
            <div className="admin_main_content">

                <section className="a_main_content_center">
                    { adminPage === 0 && <Orders /> }
                    { adminPage === 1 && <Cms />    }
                    { adminPage === 2 && <div> tickets </div>   }
                    { adminPage === 3 && <Statistics_inDepth /> }
                </section>

                <section className="app_sidebar_notifications">
                    <div id="sidebar_navigation">
                        <div className="sidebar_toggle_btn">
                            <p> <i className="fas fa-bars"></i> </p>
                        </div>
                        <ul className="sidebar_nav_ul">
                            <li onClick={ e => swapSidebar(0) } className={ sidebarMain === 0 ? 'active' : '' }> incoming   </li>
                            <li onClick={ e => swapSidebar(1) } className={ sidebarMain === 1 ? 'active' : '' }> statistics </li>
                        </ul>
                    </div>
                    { sidebarMain === 0 && <Incoming  /> }
                    { sidebarMain === 1 && <Statistics_sideBar /> }
                </section>
            </div>
        </div>
    );
}

export default AdminDashboard;
