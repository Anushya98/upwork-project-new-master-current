import React, { useEffect, useState } from "react"
// import ReactApexChart from "react-apexcharts"
// import {
//     Card,
//     CardBody,
//   } from "reactstrap"
import DonutChart from "react-donut-chart";
import axios from "axios";

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const LineChart = () => {
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

    // const series = [{
    //     name: "Projects",
    //     type: 'donut',
    //     // data: [20, 34, 27, 59, 37, 26, 38, 25],
    //     data: chartData
    // },
    // {
    //     name: "2019",
    //     data: [10, 24, 17, 49, 27, 16, 28, 15],
    //     type: 'area',
    // }
//]

    // const options = {
    //     chart: {
    //         toolbar: {
    //             show: false
    //         },
    //         zoom: {
    //             enabled: false
    //         }
    //     },
    //     colors: ['#45cb85', '#3b5de7'],
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     stroke: {
    //         curve: 'smooth',
    //         width: '3',
    //         dashArray: [4, 0],
    //     },

    //     markers: {
    //         size: 3
    //     },
    //     xaxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    //         title: {
    //             text: 'Month'
    //         }
    //     },

    //     fill: {
    //         type: 'solid',
    //         opacity: [1, 0.1],
    //     },

    //     legend: {
    //         position: 'top',
    //         horizontalAlign: 'right',
    //     }
    // }

    // const options = {
    //     chart: {
    //         toolbar: {
    //             show: false
    //         },
    //         zoom: {
    //             enabled: false
    //         },
    //         fill: {
    //             type: 'solid',
    //             opacity: [1, 0.1],
    //         }
    //     },
    //     colors: ['#45cb85', '#3b5de7'],
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     stroke: {
    //         curve: 'smooth',
    //         width: '3',
    //         dashArray: [4, 0],
    //     },

    //     markers: {
    //         size: 3
    //     },
    //     xaxis: {
    //         categories: ["Completed", "In Progress"],
    //         title: {
    //             text: 'Month'
    //         }
    //     },

    //     fill: {
    //         type: 'solid',
    //         opacity: [1, 0.1],
    //     },

    //     legend: {
    //         position: 'top',
    //         horizontalAlign: 'right',
    //     }
    // }

    const data = [
        {
          label: "Active",
          value: chartData
        },
        {
          label: "Completed",
          value: chartData1
        },
        {
          label: "Overdue",
          value: chartData2
        },
        {
            label: "Canceled",
            value: chartData3
          }
      ];
      console.log(data);
      const colors = ["#000000", "#60b644", "#d7d720", "#ff4361"];

      return (
        <section className="global-card">
          <div className="section-title">World Statistics</div>
          <div className="statistics-wrapper">
            <div className="card">
              <p className="card-title">Active Projects:</p>
              <p className="card-figure">{chartData}</p>
            </div>
  
            <div className="card">
              <p className="card-title ">Completed Projects:</p>
              <p className="card-figure pink-accent">{chartData1}</p>
            </div>
            <div className="card">
              <p className="card-title">Overdue Projects:</p>
              <p className="card-figure green-accent"> {chartData2}</p>
            </div>
            <div className="card">
              <p className="card-title">Canceled Projects:</p>
              <p className="card-figure green-accent"> {chartData3}</p>
            </div>
          </div>
          <DonutChart colors={colors} data={data} />
        </section>
      );
    

    // return (
    //     <React.Fragment>
    //         <Card>
    //             <CardBody>
    //                 <h4 className="card-title mb-4">Sales Report</h4>

    //                 <ReactApexChart
    //                     options={options}
    //                     series={series}
    //                     height="260"
    //                     type="donut"
    //                     className="apex-charts"
    //                 />
    //             </CardBody>
    //         </Card>
    //     </React.Fragment>
    // )
}

export default LineChart