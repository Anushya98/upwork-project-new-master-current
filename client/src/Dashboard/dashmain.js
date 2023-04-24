import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";
import ActiveProjects from "./ActiveProjects.js";
import TaskDetails from "./task.js";
import "./dashmain.css"
import Chart from "./chart.js";
//import LineChart from "./line-chart.js"

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function alldesigners() {
    const allUser = await axios(
      `http://localhost:5000/user`,
      {
        ...config,
        method: "GET",
      }
    );
   // console.log({allUser})
    const user = allUser.data.designersCount;

  return user;
  }

  async function allUsers() {
    const allUser = await axios(
      `http://localhost:5000/user`,
      {
        ...config,
        method: "GET",
      }
    );
   // console.log({allUser})
    const user = allUser.data.newCount;

  return user;
  }

  async function allProjects() {
    const allProject = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    console.log({allProject})
    const project = allProject.data.projectsCount

    return project;
  }
  
const TopTotal = () => {

  
    const [userCount, setUserCount] = useState();
    const [countAll, setCountAll] = useState();
    const [projectCount, setProjectCount] = useState();
    
     useEffect(() => {
        alldesigners().then((allUser) => setUserCount(allUser));
    }, []);
      //console.log({userCount});
      useEffect(() => {
        allUsers().then((allUser) => setCountAll(allUser));
    }, []);
      //console.log({countAll});
      useEffect(() => {
        allProjects().then((allProject) => setProjectCount(allProject));
    }, []);
      //console.log({projectCount})
   return (
    <div>
    <div class="container-fluid p-0">
          
          <div class="row">
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0"style={{fontSize:"0px",paddingLeft:"0.7rem", fontWeight:"400"}}>Users</h4>
        </div> 
         </div>
           </div>
           </div>
           <div style={{
             display:"flex"
           }}>
             <div class="col-xl-4">
                   <div class="card card-animate">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3">New Users</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Users this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
   
   
   
                          
   
                    <div class="col-xl-4">
                   <div class="card card-animate">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-warning text-warning rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3">Controllers</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ userCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Controllers this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
   
   
               <div class="col-xl-4">
                   <div class="card card-animate">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-warning text-warning rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3">Designers</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ userCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Designers this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
   
    </div>
    <div>
        <Chart/>
     </div>
    <div>
      <TaskDetails />
    </div>   
    <div>
      <ActiveProjects />
    </div> 
    {/* <div>
      <LineChart />
    </div>  */}
    </div>
  );
};

export default TopTotal;