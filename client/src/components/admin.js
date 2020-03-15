import React, { Fragment , useEffect , useState } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
// import axios from 'axios';

import { pusherState } from './snippets/pusherConn';

import Header   from './header/header';
import Dropdown from './snippets/dropdown';

import Orders   from './admin/orders/orders';
import Cms      from './admin/cms/details';

import { profiles }       from './sidebar/etc/profiles';
import Order_profile      from './sidebar/etc/profile';
import Statistics_sideBar from './sidebar/statistics/stats_min';
import Statistics_inDepth from './sidebar/statistics/stats_depth';
import './sidebar/sidebar.scss';


import { handleTables , handleOrders } from './sidebar/incoming/incomingHandlers';

const Incoming_Reservations = ( props ) => {

  const [ isLoaded , setLoad ] = useState([ false , 'hidden' ]);
  const pusherConnection = useStoreState( state => state.pusher_TableState );
  const updatePusherCon  = useStoreActions( actions => actions.update_TableState );
  const [ tablesNew , loadTables] = useState([]);

  const { getReservations } = handleTables;

  useEffect(() => {
       console.log( 'reservation sidebar');
       updatePusherCon( true );
       getReservations( props.filter[1] )
             .then( tables => {
               loadTables( tables );
               setTimeout( () => { setLoad([ true , 'animated fadeIn']) } , 1000 );
             })
             .catch( err => console.log( err ));

       if ( !pusherConnection ) {
             pusherState('reservations')
                .then ( pusher => {
                      console.log( 'connected to pusher reservations');
                      pusher.bind('new' , ( data ) => {
                            getReservations( props.filter[1] )
                                 .then(  res => loadTables(res.data ))
                                 .catch( err => console.log( err ));
                       });
                })
                .catch( err => console.log( 'pusher err' ));
       }
       // eslint-disable-next-line
  }, [ props.filter ]);

  return (
      <div className="reservation_incoming_sidebar component_load_contain">

            { isLoaded[0] === false &&  <div className="component_load">  <i className="fas fa-circle-notch fa-spin"></i>  </div> }
            { isLoaded[0] === true &&
                 <Fragment>
                      { tablesNew.length === 0 ? (
                          <div className={`incoming_empty `+isLoaded[1]}>
                                <p> no tables booked today </p>
                                <div> <img src="./vectorPerson1.png" alt="vector"/>  </div>
                          </div>
                       ) : (
                         <ul className={ isLoaded[1] }>
                             { tablesNew.map( ( table , index ) =>
                                   <Order_profile key={ index } unique={ index } profile={ {
                                      id : table._id ,
                                      name: table.bookedName ,
                                      imgUrl: profiles[0].profile ,
                                      dates: [ table.tableTime  , 'table of ' + table.tableParty ]
                                     }}/>
                             )}
                         </ul>
                       )}
                </Fragment>
            }
      </div>
  )
}

// error - loading state to true causes error.

const Incoming_orders = ( props ) => {

      const [ isLoaded , setLoad ] = useState( [false , 'hidden'] );
      const pusherConnection = useStoreState( state => state.pusher_OrderState );
      const updatePusherCon  = useStoreActions( actions => actions.updateOrderState );
      const [ ordersNew , loadOrders ] = useState([]);

      const { getOrders } = handleOrders;

      useEffect(() => {
          updatePusherCon( true );
          getOrders( props.filter[1])
            .then( orders => {
                loadOrders( orders );
                setTimeout( () => {
                    setLoad( [ true , 'animated fadeIn' ]);
                }, 2000);
            })
            .catch( err => console.log( err ));

           if ( !pusherConnection ) {
                pusherState( 'orders')
                  .then ( pusher => {
                    pusher.bind('new' , ( data ) => {
                        console.log('new order came in');
                        getOrders( props.filter[1] )
                           .then( orders => loadOrders( orders ))
                           .catch( err => console.log( err ));
                    });
                  })
                  .catch( err => console.log( err ));
           }
           // eslint-disable-next-line
      }, [ props.filter ]);

      return (
        <div className="orders_incoming_sidebar component_load_contain">
            { isLoaded[0] === false &&  <div className="component_load">  <i className="fas fa-circle-notch fa-spin"></i>  </div> }
            { isLoaded[0] === true &&
                 <Fragment>
                      { ordersNew.length === 0 ? (
                          <div className={`incoming_empty `+isLoaded[1]}>
                                <p> no orders today </p>
                                <div> <img src="./vectorPerson1.png" alt="vector"/>  </div>
                          </div>
                       ) : (
                         <ul className={ isLoaded[1]}>
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
                </Fragment>
            }
        </div>
      )
}

const Incoming = () => {
        const incomingTab = useStoreState( state => state.incomingTab );
        const changeTab = useStoreActions( actions => actions.updateIncomingTab );

        const [ filterOrders  , changeOFilter ] = useState([ 0 , 'orderTime' ]);
        const [ filterReserve , changeRFilter ] = useState([ 0 , 'tableTime' ]);

        useEffect(() => {
             console.log( 'incoming sidebar');
             // eslint-disable-next-line
        }, [ ]);

        const test = count => { console.log( count )};

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
                                <li className={ filterOrders[0] === 0 ? 'active' : '' } onClick={ e => changeOFilter( [ 0 , 'orderTime'  ] ) }> order time   </li>
                                <li className={ filterOrders[0] === 1 ? 'active' : '' } onClick={ e => changeOFilter( [ 1 , 'pickupTime' ] ) }> order pickup </li>
                            </ul>
                        }
                        { selectable === 1 &&
                           <ul id="navigation">
                               <li className={ filterReserve[0] === 0 ? 'active' : '' } onClick={ e => changeRFilter( [ 0 , 'tableTime'  ] ) }> table time    </li>
                               <li className={ filterReserve[0] === 1 ? 'active' : '' } onClick={ e => changeRFilter( [ 1 , 'tableNumber' ] ) }> table number </li>
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

const SidebarApp = ( { }) => {

    const [ sidebarShouldShow , flipSidebar ] = useState( true );
    const [ sidebarMain , swapSidebar ] = useState( 0 );

    return (
      <Fragment>
          { sidebarShouldShow ? (
              <section className="app_sidebar_notifications">

                  <div id="sidebar_navigation">
                      <div className="sidebar_toggle_btn" onClick={ () => flipSidebar( false )}>
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
            ) : (
              <section className="app_sidebar_notification_mini">
                  <div id="sidebar_navigation">
                      <div className="sidebar_toggle_btn" onClick={ () => flipSidebar( true )}>
                          <p> <i className="fas fa-bars"></i> </p>
                      </div>
                  </div>
              </section>
            )
          }
      </Fragment>
    )
}

const AdminDashboard = () => {

    const clearErrs = useStoreActions( actions => actions.clearAllErrors );
    const user      = useStoreState( state => state.user );
    const adminPage = useStoreState( state => state.adminPage );

    useEffect(() => {
         clearErrs();
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

                <SidebarApp />
            </div>
        </div>
    );
}

export default AdminDashboard;
