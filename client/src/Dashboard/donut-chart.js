import React, { useEffect, useState } from "react"
// import DonutChart from "react-donut-chart";
import axios from "axios";
import Donutchart from "./DonutChart";


const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const Charts = () => {
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
      
      return (

        <div style={{marginTop:"50px"}}> 
        <div class="col-xl-12">
 <div class="card card-height-50">
     <div class="card-header align-items-center d-flex">
         <h4 class="card-title mb-0 flex-grow-1">Projects Status</h4>
         <div class="flex-shrink-0">
             {/* <div class="dropdown card-header-dropdown">
                 <a class="dropdown-btn text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     All Time <i class="mdi mdi-chevron-down ms-1"></i>
                 </a>
                 <div class="dropdown-menu dropdown-menu-end">
                     <a class="dropdown-item" href="#">All Time</a>
                     <a class="dropdown-item" href="#">Last 7 Days</a>
                     <a class="dropdown-item" href="#">Last 30 Days</a>
                     <a class="dropdown-item" href="#">Last 90 Days</a>
                 </div>
             </div> */}
         </div>
     </div>
     {/* <!-- end card header --> */}

     <div class="card-body" >
      <div > 
     <Donutchart />
     
     </div>
         <div class="mt-3">
             <div class="d-flex justify-content-between border-bottom border-bottom-dashed ">
                 <p class="fw-medium mb-0">
                  <svg style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" margin="10">
                  <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="rgba(255,171,171,1)"></path>
                 </svg>
                   Active Projects</p>
                 <p className="card-figure">{chartData}</p>
             </div>
             {/* <!-- end --> */}
             <div class="d-flex justify-content-between border-bottom border-bottom-dashed "> <p class="fw-medium mb-0 ">
             <svg  style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
              <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="rgba(225,18,153,1)">
              </path></svg>
               Completed Projects</p>
                 <div>
                 <p className="card-figure pink-accent">{chartData1}</p>
                 </div>
             </div>
             {/* <!-- end --> */}
             <div class="d-flex justify-content-between border-bottom border-bottom-dashed ">
                 <p class="fw-medium mb-0">
                 <svg  style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="rgba(254,222,255,1)">
                  </path></svg>
                 Overdue Projects </p>
                 <div>
                 <p className="card-figure green-accent"> {chartData2}</p>
                 </div>
             </div>
             {/* <!-- end --> */}
             <div class="d-flex justify-content-between ">
                 <p class="fw-medium mb-0"> <svg style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                  <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="rgba(166,31,105,1)">
                  </path></svg>
                  Cancelled Projects</p>
                 <div>
                 <p className="card-figure green-accent"> {chartData3}</p>
                 </div>
             </div>
             {/* <!-- end --> */}
         </div>
     </div>
     {/* <!-- end cardbody --> */}
 </div>
 {/* <!-- end card --> */}
</div>
      














        {/* <section className="global-card">
          <div className="section-title">Projects Status</div>
          <DonutChart colors={colors} data={data} />
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
        </section> */}

        </div>
      );
}

export default Charts;