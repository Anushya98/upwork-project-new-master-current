import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, FormLabel, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
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

async function approveButton(projectId) {
  const allProject = await axios(
    `http://localhost:5000/task/approve/${projectId}`,
    {
      ...config,
      method: "PUT",
    }
  );
  const project = allProject.data;
  return project;
}

async function cancelProject(projectId) {
  const deleteProject = await axios(
    `http://localhost:5000/task/cancel/${projectId}`,
    {
      ...config,
      method: "PUT",
    }
  );

  const data = deleteProject.data;
  return data;
}

async function getCurrentUser() {
  const currentUser = await axios(`http://localhost:5000/user/current`, {
    ...config,
    method: "GET",
  });

  const data = currentUser.data;
  return data;
}

const AllocatedToYou = ({ value }) => {
  console.log(value);
  const [file, setFile] = useState(null);
  const [reportDesc, setReportDesc] = useState({
    reportDescription: "",
  });
  const [projectId, setProjectId] = useState(null);

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
  const reportHandler = (e) => {
    setReportDesc({ ...reportDesc, [e.target.name]: e.target.value });
    console.log(reportDesc.reportDescription);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    console.log("project ıdddd", projectId);
    axios
      .post("http://localhost:5000/project/upload", formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((file) => {
        const data = file.data;
        axios
          .put(
            `http://localhost:5000/task/${projectId}`,
            { ...reportDesc, reportUrl: data.url, state: "Completed" },
            {
              withCredentials: true,
              headers: {
                ...config.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            Swal.fire("Success!", "You add the task!", "success");
            console.log(res);
          })
          .catch((err) => {
            if (err instanceof Error) {
              Swal.fire("Not Working!", `${err.message}`, "danger");
            }
            console.log(err);
          });
      })
      .catch((err) => {
        Swal.fire("Not Working!", `${err.message}`, "danger");
      });
  };
  const roleHasApprove = ["statelevel", "districtlevel", "localarea"];

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
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
            <div class="modal-body">
              <form
                method="POST"
                onSubmit={handleSubmit}
                id="inputform"
                name="inputform"
              >
                <FormLabel>Due Date</FormLabel> <br />
                <TextField
                  type="text"
                  onChange={reportHandler}
                  variant="outlined"
                  value={reportDesc.reportDescription}
                  name="reportDescription"
                  fullWidth
                />
                <hr />
                <FormLabel>File</FormLabel> <br />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button
                    style={{
                      display: "block",
                      alignItems: "center",
                      textAlign: "center",
                      backgroundColor: "skyblue",
                      color: "white",
                    }}
                    fullWidth
                    variant="raised"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
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
          return (
            <div className="card card-animate" 
            style={{ 
              width: "300px", 
              marginBottom: "30px", 
              borderRadius: "10px", 
              marginRight: "25px",
              height: "fit-content"
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
                  <div style={{ marginTop: "-8%"}}>
                  <p
                      style={{
                      fontSize: "14px",
                      color: "gray",
                      textAlign: "start"
                      }}
                      >
                      DeadLine : {format(new Date(project.dueDate), "d MMM, yyyy")}
                      </p>
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

                  <div className="row">
                    {currentUser && (
                      <div className="col-sm">
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            setProjectId(project._id);

                            // approveButton(project._id);
                          }}
                          type="button"
                          class="btn btn-success btn-sm"
                        >
                          Approve
                        </button>
                      </div>
                    )}

                    {currentUser && (
                      <div className="col-sm text-right pt-5">
                        <button
                          onClick={() => {
                            //Remove Projects from UI
                            const filteredProject = tasks.filter(
                              (currentProject) => {
                                if (currentProject._id != project._id)
                                  return currentProject;
                              }
                            );
                            setTasks(filteredProject);
                            cancelProject(project._id)
                              .then((data) => {
                                Swal.fire(
                                  "Removed!",
                                  "You Cancel the Project!",
                                  "success"
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                                Swal.fire("Removed!", "Errorrr!", "danger");
                              });
                          }}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            
          );
        })}
      </div>
    </div>
  );
};

export default AllocatedToYou;
