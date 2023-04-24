import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";
import { format } from  "date-fns";
import DonutCharts from "./donut-chart.js"
import Donutchart from "./DonutChart.js";


const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function allProjects() {
    const allProject = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    console.log({allProject})
    const project = allProject.data.totalProject;

  return project;
  }

  async function completedProject() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    console.log({projects})
    const project = projects.data.completedProject;

  return project;
  }

  async function overdueProjects() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    console.log({projects})
    const project = projects.data.projectOverdue;

  return project;
  }

  async function projectList() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    console.log({projects})
    const project = projects.data.inProgressProjects;

  return project;
  }

  async function getCurrentUser() {
    const currentUser = await axios(`http://localhost:5000/user/current`, {
      ...config,
      method: "GET",
    });
  
    const data = currentUser.data;
    return data;
  }
  
const ProjectDetails = () => {

  
    const [projectCount, setProjectCount] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [countAll, setCountAll] = useState();
    const [overdueCount, setOverdueCount] = useState();
    const [projectLists, setProjectLists] = useState();
    
     useEffect(() => {
        allProjects().then((projects) => setCountAll(projects));
    }, []);
      console.log({countAll});
      useEffect(() => {
        completedProject().then((allProject) => setProjectCount(allProject))
        // .then(async () => {
        //   const currentUser = await getCurrentUser();
        //   setCurrentUser(currentUser);
        // });
    }, []);
      console.log({projectCount});
      useEffect(() => {
        overdueProjects().then((projects) => setOverdueCount(projects));
    }, []);
      console.log({overdueCount})
      useEffect(() => {
        projectList().then((projects) => setProjectLists(projects));
    }, []);
      console.log({projectLists})
   return (
    <div>
      <div class="container-fluid p-0" style={{ marginTop:"30px" }}>
          
          <div class="row">
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0"style={{fontSize:"30px",paddingLeft:"0.7rem", fontWeight:"400"}}>Projects</h4>
        </div> 
         </div>
           </div>
           </div>

           <div>
        <div style={{
             display:"flex"
           }}>
           
             <div class="col-xl-4">
                   <div class="card card-animate">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3">Total Projects Completed</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ projectCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Completed project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
       

               <div class="col-xl-4">
                   <div class="card card-animate">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3">Total Ongoing Projects</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Ongoing project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}


               <div class="col-xl-4">
                   <div class="card card-animate">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3">Total Overdue Projects</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ overdueCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Overdue project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
       
               </div>
               <div style={{display:"flex" , justifyContent:"space-between"}}>
                <div>
               <div class= "col-xl-12" style={{ marginTop:"50px" ,width:"42rem"}}>
               
                            <div class="card card-height-100">
                                <div class="card-header d-flex align-items-center">
                                    <h4 class="card-title flex-grow-1 mb-0">Active Projects</h4>
                                    <div class="flex-shrink-0">
                                        <a href="javascript:void(0);" class="btn btn-soft-info btn-sm">Export Report</a>
                                    </div>
                                </div>
                                {/* <!-- end cardheader --> */}
                                    <div class="card-body">
                                    <div class="table-responsive table-card">
                                        <table class="table table-nowrap table-centered align-middle">
                                            <thead class="bg-light text-muted">
                                                <tr>
                                                    <th scope="col">Project Name</th>
                                                   
                                                    <th scope="col" >Due Date</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                                {/* <!-- end tr --> */}
                                            </thead>    
                                        
                                                  <tbody >
                                                            {projectLists && projectLists.map((task) => (
                                                                <tr key={task._id}>
                                                                <td>{task.title}</td>
                                                                <td>{format(new Date(task.dueDate2), "dd MMM, yyyy")}</td>
                                                                <td>{task.state}</td>
                                                                </tr>
                                                                   ))}
                                                                                       </tbody>

                                                    </table> 
                                               </div>
                                           </div>
                                       </div>
                                  
                             </div> 
                             
                            </div>
                            <div>
                                    <DonutCharts />
                                                 </div> 
                                                
                                                 </div>
                                   </div>

                                  
          
 
    </div>
  );
};

export default ProjectDetails;