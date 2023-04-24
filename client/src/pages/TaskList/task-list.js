import axios from "axios";
import React, { useEffect, useState } from "react";
import CompletedTasks from "./CompletedTask";
import InProgressTasks from "./InProgressTask";
import WaitForModificationTasks from "./SelfTask";
import styles from "./project.module.css";
import CanceledTasks from "./CanceledTasks";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import OverDue from "./Overdue";
import AllocatedToYou from "./AllocatedToYou";

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

  const CompletedTasksHandler = (e) => {
    e.preventDefault();
    setValue("Completed");
    console.log(value);
  };

  const inProgressTasksHandler = (e) => {
    e.preventDefault();
    setValue("Ongoing");
    console.log(value);
  };

  const overDueTasksHandler = (e) => {
    e.preventDefault();
    setValue("Overdue");
    console.log(value);
  };

  const allocatedToYouTasksHandler = (e) => {
    e.preventDefault();
    setValue("AllocatedToYou");
    console.log(value);
  };

  const waitForModificationTaskHandler = (e) => {
    e.preventDefault();
    setValue("Self");
    console.log(value);
  };

  const canceledTaskHandler = (e) => {
    e.preventDefault();
    setValue("Canceled");
    console.log(value);
  };
  return (
    <div className={styles.container}>
      <div>
        <div
          style={{
            marginLeft: "80%",
            marginBottom: "3%",
            height: "30px"
          }}
        >
          <Button to="/task" variant="contained" LinkComponent={Link}>
            <AddOutlinedIcon />
            CREATE TASK
          </Button>
        </div>
        <ul className={styles.nav}>
          <li className={`{styles.nav-item} ${value === "Completed" && "active"}`} onClick={CompletedTasksHandler}>
              Completed Tasks
          </li>
          <li className={`{styles.nav-item} ${value === "Self" && "active"}`} onClick={waitForModificationTaskHandler}>
              Self
          </li>

          <li className={`{styles.nav-item} ${value === "Canceled" && "active"}`} onClick={canceledTaskHandler}>
              Canceled Tasks
          </li>

          {currentUser && currentUser.role !== "user" ? (
            <li className={`{styles.nav-item} ${value === "Overdue" && "active"}`} onClick={overDueTasksHandler}>
                OverDue Task
            </li>
          ) : (
            <></>
          )}

          {currentUser && currentUser.role !== "superadmin" ? (
            <li className={`{styles.nav-item} ${value === "AllocatedToYou" && "active"}`} onClick={allocatedToYouTasksHandler}>
                Task Allocated
            </li>
          ) : (
            <></>
          )}

          {currentUser &&
          currentUser.role !== "user" ? (
            <li className={`{styles.nav-item} ${value === "Ongoing" && "active"}`} onClick={inProgressTasksHandler}>
                In Progress
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className={styles.projects}>
        {value === "Completed" ? (
          <div>
            <CompletedTasks value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Ongoing" ? (
          <div>
            <InProgressTasks value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Self" ? (
          <div>
            <WaitForModificationTasks value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Canceled" ? (
          <div>
            <CanceledTasks value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Overdue" ? (
          <div>
            <OverDue value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "AllocatedToYou" ? (
          <div>
            <AllocatedToYou value={value} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProjectList;
