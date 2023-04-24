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

async function allProjects({ value }) {
  const allProject = await axios(
    `http://localhost:5000/project/?state=${value}`,
    {
      ...config,
      method: "GET",
    }
  );
  const project = allProject.data;
  return project;
}

async function askForModification(projectId) {
  const allProject = await axios(
    `http://localhost:5000/project/buttons/modification/${projectId}`,
    {
      ...config,
      method: "POST",
    }
  );
  const project = allProject.data;
  return project;
}

async function approveButton(projectId) {
  const allProject = await axios(
    `http://localhost:5000/project/buttons/approve/${projectId}`,
    {
      ...config,
      method: "POST",
    }
  );
  const project = allProject.data;
  return project;
}

async function getCurrentUser() {
  const currentUser = await axios(`http://localhost:5000/user/current`, {
    method: "GET",
  });

  const data = currentUser.data;
  return data;
}

const CanceledProjects = ({ value }) => {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [information, setInformation] = useState({
    description: "",
    compulsoryWordings: "",
    color: "",
    state: "",
    status: "",
    title: "",
    user: "",
    createdAt: "",
  });

  const searchHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      const filterProjects = projects.filter((project) => {
        return project.title.includes(e.target.value);
      });
      setProjects(filterProjects);
    } else {
      const allProject = allProjects({ value });
      allProject.then((data) => {
        setProjects(data.projects);
      });
    }
  };

  useEffect(() => {
    const allProject = allProjects({ value });
    allProject
      .then((data) => {
        setProjects(data.projects);
      })
      .then(async () => {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
      });
  }, []);

  const roleHasCancelPermission = [
    "superadmin",
    "admin",
    "statelevel",
    "districtlevel",
  ];

  const roleHasToAskModification = ["designchecker", "proofchecker"];

  const roleHasApprove = ["designchecker", "proofchecker", "user"];


  return (
    <div>
      <div>
      <form
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        width: "30%",
        marginBottom: "5%",
        background: "white"
      }}
      >
        {/* <i class="fa fa-search" aria-hidden="true"></i>
        <input
          type="search"
          id="gsearch"
          name="searchInput"
          onChange={searchHandler}     
        /> */}
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
      </form>
      </div>
      <div
        className="row"
        style={{
          paddingLeft: "0px",
          
        }}
      >
        {projects.map((project, key) => {
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
                        description: project.projectDescription,
                        createdAt: project.createdAt,
                        state: project.state,
                        status: project.status,
                        title: project.title,
                        user: project.user,
                        color: project.colors,
                        compulsoryWordings: project.compulsoryWordings,
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
                       fontSize: "20px",
                      }}
                      >
                      {project.title}
                      </h5>
                      <p
                        style={{
                       fontSize: "18px",
                       color: "gray"
                      }}
                      >
                      {project.projectDescription}
                      </p>
                      </div>
                  </button>
                  </div>
                  </div>
                  <div style={{ marginTop: "-8%"}}>
                  <p
                      style={{
                      fontSize: "14px",
                      color: "gray",
                      textAlign: "start"
                      }}
                      >
                      DeadLine 1: {format(new Date(project.dueDate1), "d MMM, yyyy")}
                      </p>
                      <p
                      style={{
                      fontSize: "14px",
                      color: "gray",
                      marginTop: "-10px",
                      textAlign: "start"
                      }}
                      >
                      DeadLine 2: {format(new Date(project.dueDate2), "d MMM, yyyy")}
                      </p>
                  </div>
                  </div>
                  <div className="row" style={{ marginTop: "-5%", width: "300px", height: "50px" }}>
                  {currentUser &&
                      roleHasApprove.includes(currentUser.role) &&
                      project.state != "Completed" &&
                      !(project.state === "Canceled") && (
                        <div className="col-sm">
                          <button
                            onClick={() => {
                              approveButton(project._id);
                            }}
                            type="button"
                            class="btn btn-success btn-sm"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    {currentUser && currentUser.role === "designers" && (
                      <div className="col-sm">
                        <button
                          onClick={() => {
                            approveButton(project._id);
                          }}
                          type="button"
                          class="btn btn-success btn-sm"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {currentUser &&
                      roleHasToAskModification.includes(currentUser.role) && (
                        <div className="col-sm">
                          <button
                            onClick={() => {
                              askForModification(project._id);
                            }}
                            type="button"
                            class="btn btn-primary btn-sm"
                          >
                            Ask Modification
                          </button>
                        </div>
                      )}
                    {currentUser &&
                      currentUser.role == "user" &&
                      project.status == "SubmittedDesigner" && (
                        <div className="col-sm">
                          <button
                            onClick={() => {
                              askForModification(project._id);
                            }}
                            type="button"
                            class="btn btn-primary btn-sm"
                          >
                            Ask Modification
                          </button>
                        </div>
                      )}
                    {project.state === "Canceled" && (
                      <div className="col-sm text-center" style={{ color: "red", padding: "3%", borderTop: "1px dashed rgb(39 112 149 / 32%)"}}>
                        Project Canceled
                      </div>
                    )}
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
                            {information.title}
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
                                <th scope="row">DESCRIPTION:</th>
                                <td>{information.description}</td>
                              </tr>
                              <tr>
                                <th scope="row">COLOR:</th>
                                <td>{information.color}</td>
                              </tr>
                              <tr>
                                <th scope="row">COMPULSORY_WORDINGS:</th>
                                <td>{information.compulsoryWordings}</td>
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
                                <th scope="row">TITLE:</th>
                                <td>{information.title}</td>
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
                </div>
              
          );
        })}
      </div>
    </div>
  );
};

export default CanceledProjects;
