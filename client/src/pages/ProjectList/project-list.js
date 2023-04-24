import axios from "axios";
import React, { useEffect, useState } from "react";
import CompletedProjects from "./CompletedProjects";
import InProgressProjects from "./InProgressProjects";
import WaitForModificationProjects from "./SelfProjects";
import styles from "./project.module.css";
import CanceledProjects from "./CanceledProjects";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
async function getCurrentUser() {
  const currentUser = await axios(`http://localhost:5000/user/current`, {
    ...config,
    method: "GET",
  });

  const data = currentUser.data;
  return data;
}

function ProjectList() {
  const [value, setValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    Promise.resolve(getCurrentUser()).then((data) => {
      setCurrentUser(data);
    });
  }, []);

  console.log(value);
  console.log(currentUser);

  const CompletedProjectsHandler = (e) => {
    e.preventDefault();
    setValue("Completed");
    console.log(value);
  };

  const inProgressProjectsHandler = (e) => {
    e.preventDefault();
    setValue("InProgress");
    console.log(value);
  };

  const waitForModificationProjectHandler = (e) => {
    e.preventDefault();
    setValue("Self");
    console.log(value);
  };

  const canceledProjectHandler = (e) => {
    e.preventDefault();
    setValue("Canceled");
    console.log(value);
  };
  return (
    <div className={styles.container}>
      <div style={{
        height: "60px"
      }} className={styles.tabs}>
        <ul className={styles.nav}>
          <li className={`{styles.nav-item} ${value === "Completed" && "active"}`} onClick={CompletedProjectsHandler}>
            
              Completed Projects
            
          </li>
          <li className={`{styles.nav-item} ${value === "Self" && "active"}`} onClick={waitForModificationProjectHandler}>
            
              Self
           
          </li>

          <li className={`nav-item ${value === "Canceled" && "active"}`} onClick={canceledProjectHandler}>
            
              Canceled Projects
           
          </li>

          {currentUser && currentUser.role !== "user" ? (
            <li className={`nav-item ${value === "InProgress" && "active"}`} onClick={inProgressProjectsHandler}>
                   In Progress Projects
             
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className={styles.projects}>
        {value === "Completed" ? (
          <div>
            <CompletedProjects value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "InProgress" ? (
          <div>
            <InProgressProjects value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Self" ? (
          <div>
            <WaitForModificationProjects value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Canceled" ? (
          <div>
            <CanceledProjects value={value} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

//  <div>
//       <div className="row row-cols-1 row-cols-xl-3">
//         {projects.map((project, key) => {
//           {
//             console.log(project);
//           }
//           return (
//             <div className="col mb-4" key={key}>
//               <div className="card">
//                 <div className="card-body">
//                   <button
//                     type="button"
//                     class="btn btn-link"
//                     style={{
//                       width: "100%",
//                     }}
//                     data-toggle="modal"
//                     data-target=".bd-example-modal-lg"
//                   >
//                     <div
//                       className="card-title"
//                       style={{
//                         fontSize: "20px",
//                         alignSelf: "start",
//                       }}
//                     >
//                       {project.title}
//                     </div>
//                   </button>
//                   <div
//                     class="modal fade bd-example-modal-lg"
//                     tabindex="-1"
//                     role="dialog"
//                     aria-labelledby="myLargeModalLabel"
//                     aria-hidden="true"
//                   >
//                     <div class="modal-dialog modal-dialog-centered modal-lg">
//                       <div class="modal-content">
//                         <div class="modal-header">
//                           <h5 class="modal-title" id="exampleModalLongTitle">
//                             {project.title}
//                           </h5>
//                           <button
//                             type="button"
//                             class="close"
//                             data-dismiss="modal"
//                             aria-label="Close"
//                           >
//                             <span aria-hidden="true">&times;</span>
//                           </button>
//                         </div>
//                         <div className="modal-body">
//                           <table class="table table-bordered">
//                             <tbody>
//                               <tr>
//                                 <th scope="row">DESCRIPTION:</th>
//                                 <td>{project.projectDescription}</td>
//                               </tr>
//                               <tr>
//                                 <th scope="row">COLOR:</th>
//                                 <td>{project.colors}</td>
//                               </tr>
//                               <tr>
//                                 <th scope="row">COMPULSORY_WORDINGS:</th>
//                                 <td>{project.compulsoryWordings}</td>
//                               </tr>
//                               <tr>
//                                 <th scope="row">CREATED_AT:</th>
//                                 <td>{project.createdAt}</td>
//                               </tr>

//                               <tr>
//                                 <th scope="row">STATE:</th>
//                                 <td>{project.state}</td>
//                               </tr>
//                               <tr>
//                                 <th scope="row">STATUS:</th>
//                                 <td>{project.status}</td>
//                               </tr>
//                               <tr>
//                                 <th scope="row">TITLE:</th>
//                                 <td>{project.title}</td>
//                               </tr>
//                               <tr>
//                                 <th scope="row">USER:</th>
//                                 <td>{project.user}</td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </div>
//                         <div class="modal-footer">
//                           <button
//                             type="button"
//                             class="btn btn-secondary"
//                             data-dismiss="modal"
//                           >
//                             Close
//                           </button>
//                           <button type="button" class="btn btn-primary">
//                             Save changes
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-text">
//                     <img
//                       src={project.fileUrl}
//                       className="card-img-top"
//                       width={450}
//                       height={250}
//                       style={{
//                         alignItems: "center",
//                       }}
//                       alt="..."
//                     ></img>
//                   </div>

//                   <div className="row">
//                     {currentUser &&
//                       roleHasApprove.includes(currentUser.role) &&
//                       project.state != "Completed" && (
//                         <div className="col-sm">
//                           <button
//                             onClick={() => {
//                               approveButton(project._id);
//                             }}
//                             type="button"
//                             class="btn btn-success btn-sm"
//                           >
//                             Approve
//                           </button>
//                         </div>
//                       )}
//                     {currentUser && currentUser.role === "designers" && (
//                       <div className="col-sm">
//                         <button
//                           onClick={() => {
//                             approveButton(project._id);
//                           }}
//                           type="button"
//                           class="btn btn-success btn-sm"
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     )}
//                     {currentUser &&
//                       roleHasToAskModification.includes(currentUser.role) && (
//                         <div className="col-sm">
//                           <button
//                             onClick={() => {
//                               askForModification(project._id);
//                             }}
//                             type="button"
//                             class="btn btn-primary btn-sm"
//                           >
//                             Ask Modification
//                           </button>
//                         </div>
//                       )}
//                     {currentUser &&
//                       currentUser.role == "user" &&
//                       project.status == "SubmittedDesigner" && (
//                         <div className="col-sm">
//                           <button
//                             onClick={() => {
//                               askForModification(project._id);
//                             }}
//                             type="button"
//                             class="btn btn-primary btn-sm"
//                           >
//                             Ask Modification
//                           </button>
//                         </div>
//                       )}
//                     {currentUser &&
//                       roleHasCancelPermission.includes(currentUser.role) && (
//                         <div className="col-sm text-right pt-5">
//                           <button
//                             onClick={() => {
//                               //Remove Projects from UI
//                               const filteredProject = projects.filter(
//                                 (currentProject) => {
//                                   if (currentProject._id != project._id)
//                                     return currentProject;
//                                 }
//                               );
//                               setProjects(filteredProject);
//                               cancelProject(project._id);
//                               Swal.fire(
//                                 "Removed!",
//                                 "You Cancel the Project!",
//                                 "success"
//                               );
//                             }}
//                             type="button"
//                             className="btn btn-danger btn-sm"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       )}
//                     {project.state === "Completed" && (
//                       <div className="col-sm text-center">
//                         Project Approved!
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
export default ProjectList;
