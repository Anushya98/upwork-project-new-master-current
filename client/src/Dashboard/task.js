import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";


const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function allTasks() {
    const allTask = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({allTask})
    const task = allTask.data.totalTask;

  return task;
  }

  async function completedTasks() {
    const tasks = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
   // console.log({tasks})
    const task = tasks.data.completedTask;

  return task;
  }

  async function overdueTasks() {
    const tasks = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({tasks})
    const task = tasks.data.taskOverdue;

  return task;
  }

  async function taskList() {
    const tasks = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
    // console.log({tasks})
    const task = tasks.data.tasks;

  return task;
  }

  async function getCurrentUser() {
    const currentUser = await axios(`http://localhost:5000/user/current`, {
      ...config,
      method: "GET",
    });
  
    const data = currentUser.data;
    return data;
  }
  
const TaskDetails = () => {

  
    const [taskCount, setTaskCount] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [countAll, setCountAll] = useState();
    const [overdueCount, setOverdueCount] = useState();
    const [taskLists, setTaskLists] = useState();
    
     useEffect(() => {
        allTasks().then((tasks) => setCountAll(tasks));
    }, []);
      // console.log({countAll});
      useEffect(() => {
        completedTasks().then((allTask) => setTaskCount(allTask))
        // .then(async () => {
        //   const currentUser = await getCurrentUser();
        //   setCurrentUser(currentUser);
        // });
    }, []);
      // console.log({taskCount});
      useEffect(() => {
        overdueTasks().then ((tasks) => setOverdueCount(tasks));
    }, []);
      console.log({overdueCount})
      useEffect(() => {
        taskList().then((tasks) => setTaskLists(tasks));
    }, []);
      console.log({taskLists})
   return (
    <div>
       <div class="container-fluid p-0" style={{ marginTop:"30px" }}>
          
          <div class="row" >
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0 " style={{fontSize:"30px",paddingLeft:"0.7rem", fontWeight:"400"}}>Tasks</h4>
        </div> 
         </div>
           </div>
           </div>
           <div style={{display:"flex", justifyContent:"space-between"}}>
           <div>
             <div class="col-xl-12">
                   <div class="card card-animate" style={{backgroundColor:"white"}}>
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3"> Total Task</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Total task this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
   

               <div class="col-xl-12" style={{marginTop:"180px"}}>
                   <div class="card card-animate">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3"> Task Completed</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ taskCount } duration={ 2.75 } separator=","/>
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Task Completed this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}


               <div class="col-xl-12" style={{ marginTop:"180px"}}>
                   <div class="card card-animate">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium text-muted mb-3"> Task Overdue</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-4 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ overdueCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="text-muted mb-0">Task Overdue this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
                 <div style={{marginLeft:"1rem"}}>
               <div class="col-xl-30">
                            <div class="card" >
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1 py-1 ">My Tasks</h4>
                                    <div class="flex-shrink-0">
                                        <div class="dropdown card-header-dropdown">
                                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="text-muted">All Tasks <i class="mdi mdi-chevron-down ms-1"></i></span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="#">All Tasks</a>
                                                <a class="dropdown-item" href="#">Completed </a>
                                                <a class="dropdown-item" href="#">Inprogress</a>
                                                <a class="dropdown-item" href="#">Pending</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end card header --> */}
                                 <div class="card-body"style={{backgroundColor:"#fff9de"}}>
                                    <div class="table-responsive table-card">
                                        <table class="table table-borderless table-nowrap table-centered align-middle mb-0">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                  <div style={{display:"flex",justifyContent:"space-between"}}>
                                                   <th style={{paddingRight:"12rem"}}>Name</th>
                                                    <th style={{paddingRight:"7rem"}}>Deadline</th>
                                                    <th style={{paddingRight:"8rem"}}>Status</th>
                                                    <th style={{paddingRight:"2rem"}}>Assignee</th>
                                                    </div>
                                                </tr>
                                            </thead> 
                                            {/* <!-- end thead --> */}
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                           
                                                            <tbody >
                                                                {taskLists && taskLists.map((task) => (
                                                                     <tr key={task._id}>
                                                                       <input class="form-check-input fs-15" type="checkbox" value="" id="checkTask1"/>
                                                                      <td style={{paddingRight:"5rem"}}>{task.taskName}</td>
                                                                            <td style={{paddingRight:"5rem"}}>{task.dueDate }</td>
                                                                                 <td style={{paddingRight:"8rem"}}>{task.state}</td>
                                                                                      <td>{task.allocatedTo ? task.allocatedTo.name : 'N/A'}</td>
                                                                                              </tr>
                                                                                      ))}
                                                                                       </tbody>
                                                        </div>
                                                   </td>
                                                </tr> 
                                                                                                                                  
                                                    </tbody> 
                                            
                                                    </table> 
                                        
                                            </div>
                                            </div>
                                 
                                          </div>  
                                
                            </div>
    </div>
    </div>
    </div>
  );
};

export default TaskDetails;

