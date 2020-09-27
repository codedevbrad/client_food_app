import React, { Fragment , useState , useEffect } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
import {
  useQuery,
  gql
} from "@apollo/client";

const Statistics_orders = ( ) => {
     const { loading, error, data } = useQuery(gql`
     {
       OrdersFrom( format : "year" , year : 2020 ) {
         id
         orderTime
       }
     }
    `);

    return (
      <section>
          { data ?
            <div className="statistics_info" id="order_stat_info">
                <h3> { data.OrdersFrom.length.toString() } order(s) <span className="span_blue"> ( this week ) </span>  </h3>
            </div>
            :
            <div> loading </div>
          }
      </section>
    )
}

const Statistics_Tables = ( ) => {
     const { loading, error, data } = useQuery(gql`
     {
       TablesFrom( format : "year" , year : 2020 ) {
         id
       }
     }
    `);

    return (
      <section>
          { data ?
            <div className="statistics_info">
                <h3> { data.TablesFrom.length.toString() } reservation(s) <span className="span_blue"> ( this week ) </span>  </h3>
            </div>
            :
            <div> loading </div>
          }
      </section>
    )
}

const Statistics_sideBar = () => {
        const changePage = useStoreActions( actions => actions.updateComponent );
        return (
            <Fragment>
                <div className="sidebar_statistics">
                    <Statistics_orders />
                    <Statistics_Tables />
                    <div className="statistics_more_btn" onClick={ e => changePage( 3 )}> <p> view statistics in depth </p> </div>
                </div>
            </Fragment>
        )
}
export default Statistics_sideBar;
