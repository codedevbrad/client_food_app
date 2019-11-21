import React, { Fragment , useState , useEffect } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

const Statistics_sideBar = () => {
        const changePage = useStoreActions( actions => actions.updateComponent );
        return (
            <Fragment>
                <div className="sidebar_statistics">

                    <section>
                        <div className="statistics_info" id="order_stat_info">
                            <h3> 50 food orders <span className="span_blue"> ( this week ) </span>  </h3>
                        </div>
                    </section>
                    <section>
                        <div className="statistics_info">
                            <h3> 50 reservations <span className="span_blue"> ( this week ) </span>  </h3>
                        </div>
                    </section>
                    <div className="statistics_more_btn" onClick={ e => changePage( 3 )}> <p> view statistics in depth </p> </div>
                </div>
            </Fragment>
        )
}
export default Statistics_sideBar;
