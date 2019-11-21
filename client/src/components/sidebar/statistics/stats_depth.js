import React, { Fragment , useState , useEffect , useRef } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import Chart from "chart.js";
import { profiles } from '../etc/profiles';
import Order_profile from '../etc/profile';


const Statistics_inDepth = ( props ) => {

    const chartRef = useRef();

    useEffect( () => {
          const myChartRef = chartRef.current.getContext("2d");
          new Chart( myChartRef, {
            type: 'bar',
            data: {
                labels: ['sun', 'mon', 'tue' , 'wed' , 'thur' , 'fri' , 'sat' ],
                datasets: [
                  {
                    data: [12, 19, 18, 5, 26, 3 , 6],
                    label: "starters",
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                  },
                  {
                    data: [11, 29, 2, 5, 26, 3 , 9],
                    label: "main",
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                  },
                  {
                   data: [7, 11, 21, 14, 26, 13 , 13],
                    label: "fish",
                    backgroundColor: 'rgba(255, 206, 86, 0.2)'
                  },
                  {
                    data: [31, 10, 21, 15, 16, 13 , 25],
                    label: "side orders",
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                  },
                  {
                    data: [8, 11, 6, 8, 11, 30 , 10],
                    label: "main",
                    backgroundColor: 'rgba(153, 102, 255, 0.2)'
                  }
                ]
             } ,
             options: {
               legend: {  display: false }
             }
          });

          // eslint-disable-next-line
    }, [ ]);

    return (
        <div className="statistics_fullPage">
              <div className="statistics_tile">
                  <div>
                      <h3> statistics dashboard </h3>
                  </div>
                  <div className="filter_by_date">
                      <ul>
                        <li> week  </li>
                        <li> month </li>
                        <li> year  </li>
                      </ul>
                  </div>
              </div>
              <div className="statistics_body">
                  <section id="stat_graph">
                      <h3> orders by menu category <span className="span_blue"> ( this week ) </span> </h3>
                      <canvas id="myChart" ref={ chartRef } />
                  </section>
                  <section id="stat_topOrders">
                        <h3 className="title"> top 5 orders <span className="span_blue"> ( this week ) </span> </h3>
                        <ul>
                            <Order_profile key={ 'index' , Math.random() } unique={ 'index' } profile={ {
                               name: 'calimari' ,
                               imgUrl: profiles[0].profile ,
                               dates: [ 'starters' , '35 orders' ] ,
                               request : '' }
                            }/>
                            <Order_profile key={ 'index-', Math.random() } unique={ 'index' } profile={ {
                               name: 'kobe flatbread' ,
                               imgUrl: profiles[2].profile ,
                               dates: [ 'grills and bbq' , '20 orders' ] ,
                               request : '' }
                            }/>
                            <Order_profile key={ 'index', Math.random() } unique={ 'index' } profile={ {
                               name: 'bbq sizzler steak burger' ,
                               imgUrl: profiles[1].profile ,
                               dates: [ 'grills and bbq' , '18 orders' ] ,
                               request : '' }
                            }/>
                      </ul>
                  </section>
              </div>

        </div>
    );
}

export default Statistics_inDepth;
