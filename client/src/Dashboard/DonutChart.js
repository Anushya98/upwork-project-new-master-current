import React from 'react'
import Chart from 'react-apexcharts'
import axios from 'axios'
import { useState, useEffect } from 'react';




const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const Donutchart = () => {
    const [chartData, setChartData] = useState([])
    const [chartData1, setChartData1] = useState([])
    const [chartData2, setChartData2] = useState([])
    const [chartData3, setChartData3] = useState([])
    

    useEffect(() => {
        axios.get("http://localhost:5000/project", config).then((res => {
            setChartData(res.data.totalProject)
            setChartData1(res.data.completedProject)
            setChartData2(res.data.projectOverdue)
            setChartData3(res.data.canceledProject)
            console.log("Completed Project", res.data.completedProject)
            console.log("Total Project", res.data.totalProject)
            console.log("Overdue Project", res.data.projectOverdue)
            console.log("Canceled Project", res.data.canceledProject)
        }));
    }, []);

    
    

  return (
    <React.Fragment>
        <div>
            
        <Chart
        type="donut"
        width={320}
        height={212.8}
        series={[chartData,chartData1,chartData2,chartData3]}
        options={{
             labels:['Active', 'Completed', 'Overdue',' cancelled'],
             colors: ["#FFABAB", "#E11299" , "#FEDEFF" , "#A61F69"],
             legend:{
                show: false,
                position:'bottom',
                horizontalAlign:'center',
                onItemClick:{
                    toggleDataSeries:false
                },
                onItemHover:{
                    highlightDataSeries:true
                },
                markers:{
                    width:8,
                    height:8,
                    radius:'50%',
                    onClick: undefined,
                    offsetX:0,
                    offsetY:0
                }
             },
             layout:{
                padding:40
             },

             plotOptions:{
                pie:{
                    donut:{
                        size:'92%',
                        labels:{
                            show:true,
                            
                            total:{
                               show: true,
                               fontSize: 23,
                               color: '#590696'
                            }
                        }
                    }
                }
             },

         dataLabels:{
            enabled:false
         },
         chart:{
          position:'realtive'
         }
  
             
        } }
        />
        </div>
    </React.Fragment>
  )
}

export default Donutchart;