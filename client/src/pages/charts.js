import React, { useState,useEffect} from "react"
import ReactApexChart from "react-apexcharts"
import axios from "axios"
import {Card, CardBody} from "reactstrap"
//import { response } from "express"

const LineChart = () =>
 {
    const [data, setData] = useState([]);

    const options = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#45cb85', '#3b5de7'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [4, 0],
        },

        markers: {
            size: 3
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            title: {
                text: 'Month'
            }
        },

        fill: {
            type: 'solid',
            opacity: [1, 0.1],
        },

        legend: {
            position: 'top',
            horizontalAlign: 'right',
        }
    };
  
    useEffect(() => {
      axios
        .get("http://localhost:5000/user")
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          alert(e);
        });
    }, []);
  
    // const series = [
    //   {
    //     name: "Sales",
    //     data: data,
    //   },
    // ];
    const series = 
        [{name: "lpgin",
        type: 'line',
        data: data,
    },
    {
        name: "Logout",
        data: data,
        type: 'area',
    }]

    // const options = {
       

    // useEffect( () => {
    //     axios.get(`http://localhost:3000/project`).then (response => {
    //         console.log("response", response)
    //     }).catch(e => {
    //         alert (e);
    //     })
    // }, [])
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Sales Report</h4>

                    <ReactApexChart
                        options={options}
                        series={series}
                        height="260"
                        type="line"
                        className="apex-charts"
                    />
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default LineChart;