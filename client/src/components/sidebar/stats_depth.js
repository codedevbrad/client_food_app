import React, { Fragment , useState , useEffect , useRef } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import Chart from "chart.js";

const Statistics_inDepth = ( props ) => {

    const chartRef = useRef();

    useEffect( () => {
          const myChartRef = chartRef.current.getContext("2d");
          new Chart( myChartRef, {
            type: 'bar',
            data: {
                labels: ['starters', 'burgers & grill', 'side orders' ],
                datasets: [{

                    data: [12, 19, 40, 5, 26, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',  'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
             } ,
             options: {
                 legend: {  display: false }
               }
          });

          // eslint-disable-next-line
    }, [ ]);

    return (
        <div className="statistics_fullPage">
              <section id="stat_graph">
                <canvas id="myChart" ref={ chartRef } />
              </section>
              <section id="stat_profits">
              </section>
        </div>
    );
}

export default Statistics_inDepth;
