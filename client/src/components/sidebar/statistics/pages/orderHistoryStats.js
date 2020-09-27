import React, { Fragment , useState , useEffect , useRef } from 'react';
import { time } from '../../../../component_helpers/time';
import { useQuery , gql } from "@apollo/client";

import './historyStyles.scss';

const EachOrder = ( { id , name , times } ) => {
    const [ timeFormatted , setTimeFormatted ] = useState( [ ] );
    useEffect( ( ) => {
         let orderTime = new Date();
             orderTime.setTime( times[0] );
         let pickupTime = new Date();
             pickupTime.setTime( times[1] );
         setTimeFormatted (
          [
            time( orderTime  ) ,
            time( pickupTime )
          ]
        )
    } , [ ] );
    return (
      <div className="orderHistory_statistics_eachOrder">
          <div className="eachOrder_name"> { name } </div>
          <div className="eachOrder_time"> { timeFormatted[0] } </div>
          <div className="eachOrder_time"> { timeFormatted[1] } </div>
      </div>
    )
}

const OrderHistory = ( ) => {
    const { loading , error , data } = useQuery(gql`
      {
        allOrders {
            id
            customerName
            location
            orderTime
            pickupTime
        }
      }
   `);

    return (
        <Fragment>
            { data ?
              <div className="orderHistory_statistics">
                  { data.allOrders.map( ( order ) =>
                       <EachOrder id={ order.id } name={ order.customerName } times={ [ order.orderTime , order.pickupTime ] }/>
                  ) }
              </div>
              :
              <div> loading </div>
            }
        </Fragment>
    );
}

export default OrderHistory;
