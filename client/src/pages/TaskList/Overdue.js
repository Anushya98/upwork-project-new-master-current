import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";
import { format } from  "date-fns";


const Swal = require("sweetalert2");

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

async function getAllProjects({ value }) {
  const allProject = await axios(`http://localhost:5000/task/?state=${value}`, {
    ...config,
    method: "GET",
  });
  const project = allProject.data;
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
const Overdue = ({ value }) => {
  console.log(value);

  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [information, setInformation] = useState({
    description: "",
    createdAt: "",
    state: "",
    status: "",
    taskName: "",
    user: "",
  });

  const searchHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      const filterTasks = tasks.filter((task) => {
        return task.taskName.includes(e.target.value);
      });
      setTasks(filterTasks);
    } else {
      const allTasks = getAllProjects({ value });
      allTasks.then((data) => {
        setTasks(data.tasks);
      });
    }
  };

  useEffect(() => {
    const allTasks = getAllProjects({ value });
    allTasks
      .then((data) => {
        setTasks(data.tasks);
      })
      .then(async () => {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
      });
  }, []);



  return (
    <div>
     <div      
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        marginBottom: "5%",
        display: "flex",
        //width: "30%",
        background: "white"
      }}
      >
      <InputBase 
        sx={{ ml: 2, flex: 1 }} 
        placeholder="Search" 
        type="search"
        id="gsearch"
        name="searchInput"
        onChange={searchHandler}
      />
      <Button type="button" sx={{ p: 1 }}>
      <SearchIcon />
      </Button>
      
      </div>
      <div
        className="row"
        style={{
          paddingLeft: "0px",
        }}
      >
        {tasks.map((project, key) => {
          console.log(
            "HEBELE",
            Math.abs(project.lastUpdatedOn - new Date().getTime()) / 3600000
          );
          return (
            <div className="card card-animate" 
            style={{ 
              width: "300px", 
              marginBottom: "30px", 
              borderRadius: "10px", 
              marginRight: "25px"
              // background: {Stats}
              }} 
              key={key}>
              
                <div className="card-body"
                style={{
                  paddingLeft: "1px",
                  width: "100%"
                }}
                >
                  <div>
                  <p
                      style={{
                      fontSize: "14px",
                      color: "gray",
                      textAlign: "start"
                      }}
                      >
                      Updated {format(new Date(project.lastUpdatedOn), "d MMM, yyyy")}
                      </p>
                      </div>
                  <div className="d-flex mb-2"
                  style={{
                    width: "250px",
                    height: "80px"
                }}
                  >
                    <div class="flex-shrink-0 me-3">
                  <div class="avatar-sm"
                  style={{
                  width: "75px",
                  height: "50px"
                }}
                  >
                    <span class="avatar-title bg-soft-warning rounded p-2">
                    <img
                      src={project.fileUrl}
                      //className="img-fluid p-1"
                       width={75}
                       height={50}
                      style={{
                        //alignItems: "center",
                        objectFit: "fill",
                        borderRadius: "10%",
                        boxShadow: "5px 5px 5px lightblue"
                      }}
                      alt="..."
                    ></img>
                    </span>
                    </div>
                    </div>
                    <div>
                    <button
                    type="button"
                    onClick={() => {
                      setInformation({
                        description: project.description,
                        createdAt: project.createdAt,
                        state: project.state,
                        status: project.status,
                        taskName: project.taskName,
                        user: project.user,
                      });
                    }}
                    //class="btn btn-link"
                    style={{
                      width: "100%",
                      border: "none",
                      background: "none",
                      marginTop: "-30px"
                    }}
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    
                    <div
                    style={{
                      textAlign: "start",
                     }}
                    >
                      <h5
                        style={{
                       fontSize: "16px",
                      }}
                      >
                      {project.taskName}
                      </h5>
                      <p
                        style={{
                       fontSize: "14px",
                       color: "gray"
                      }}
                      >
                      {project.description}
                      </p>
                      </div>
                  </button>
                  </div>
                  </div>
                </div>
                  <div
                    class="modal fade bd-example-modal-lg"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLongTitle">
                            {information.taskName}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <table class="table table-bordered">
                            <tbody>
                              <tr>
                                <th scope="row">TASK_NAME:</th>
                                <td>{information.taskName}</td>
                              </tr>
                              <tr>
                                <th scope="row">DESCRIPTION:</th>
                                <td>{information.description}</td>
                              </tr>
                              <tr>
                                <th scope="row">CREATED_AT:</th>
                                <td>{information.createdAt}</td>
                              </tr>

                              <tr>
                                <th scope="row">STATE:</th>
                                <td>{information.state}</td>
                              </tr>
                              <tr>
                                <th scope="row">STATUS:</th>
                                <td>{information.status}</td>
                              </tr>

                              <tr>
                                <th scope="row">USER:</th>
                                <td>{information.user}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>
              
          );
        })}
      </div>
    </div>
  );
};

export default Overdue;
