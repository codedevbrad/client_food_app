import React, { Fragment , useState , useEffect , useRef } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import Dropdown from '../../snippets/dropdown';
import { profiles } from '../etc/profiles';
import Order_profile from '../etc/profile';

import GraphStats from './pages/orderGraphStats';
import OrderHistory from './pages/orderHistoryStats';

const OrderMap = ( ) => {
    return (
      <div>
          map
      </div>
     );
}


const Statistics_inDepth = ( props ) => {

    const [ currStatisticsTab , changeTab ] = useState( [ 0 , 'order statistics' ] );
    const [ currentFilterDate , setFilterDate ] = useState( [ 0 ] );

    const dropdownMenuUl = ( ) => {
        return (
            <Fragment>
                <div className="dropdown-content">
                      <ul id="navigation">
                          <li onClick={ e => changeTab( [ 0 , 'order statistics' ] ) }
                            className={ currStatisticsTab[0] == 0 ? 'active' : '' }> order statistics   </li>

                          <li onClick={ e => changeTab( [ 1 , 'order history' ] ) }
                            className={ currStatisticsTab[1] == 1 ? 'active' : '' }> order history      </li>
                      </ul>
                </div>
            </Fragment>
         )
    }

    return (
        <div className="statistics_fullPage">
              <div className="statistics_tile">
                  <div className="statistics_dropdown">
                      <Dropdown class="dropdown_ui"
                                link={ <h1> { currStatisticsTab[1] } <i className="fas fa-sort-down"> </i> </h1> }
                                element={ dropdownMenuUl()  }
                      />
                  </div>
                  <div className="filter_by_date">
                      <ul>
                        <li onClick={ e => setFilterDate( 0 )} className={ currentFilterDate == 0 ? 'active' : '' }> week  </li>
                        <li onClick={ e => setFilterDate( 1 )} className={ currentFilterDate == 1 ? 'active' : '' }> month </li>
                        <li onClick={ e => setFilterDate( 2 )} className={ currentFilterDate == 2 ? 'active' : '' }> year  </li>
                      </ul>
                  </div>
              </div>
              <div className="statistics_body">
                  { currStatisticsTab[0] === 0 && <GraphStats /> }
                  { currStatisticsTab[0] === 1 && <OrderHistory /> }
              </div>
        </div>
    );
}

export default Statistics_inDepth;
