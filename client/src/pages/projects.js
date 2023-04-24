import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
//import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import {
  Button,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
const Swal = require("sweetalert2");
const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initialState = {
  title: "",
  projectDescription: "",
  sampleImage: "",
  dueDate1: "",
  dueDate2: "",
  compulsoryWordings: "",
  colors: "",
  leaderPhoto: "",
  status: "",
  approvedStatus: "",
  createdBy: "",
};

const ProjectCreate = () => {
  const [input, setInput] = useState({
    title: "",
    projectDescription: "",
    sampleImage: "",
    dueDate1: "",
    dueDate2: "",
    compulsoryWordings: "",
    colors: "",
    leaderPhoto: "",
    status: "",
    approvedStatus: "",
    createdBy: "",
  });

  const [file, setFile] = useState(null);
  // const { isAuthenticated, user } = useSelector(state => state.auth)

  // destructure
  const {
    title,
    projectDescription,
    sampleImage,
    dueDate1,
    dueDate2,
    compulsoryWordings,
    colors,
    leaderPhoto,
    status,
    approvedStatus,
    createdBy,
  } = input;

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log("file", file);
    formData.append("file", file);
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
          .post(
            "http://localhost:5000/project",
            { ...input, fileUrl: data.url },
            {
              withCredentials: true,
              headers: {
                ...config.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            Swal.fire("Success!", "You add the project!", "success");
            console.log(res);
          })
          .catch((err) => {
            if (err instanceof Error) {
              Swal.fire("Not Authorized!", `${err.message}`, "danger");
            }
            console.log(err);
          });
      })
      .catch((error) => {
        if (error instanceof Error) {
          Swal.fire("Not Working!", `${error.message}`, "danger");
        }
      });
    // setInput({
    //   ...input,
    //   title: "",
    //   projectDescription: "",
    //   sampleImage: "",
    //   dueDate1: "",
    //   dueDate2: "",
    //   compulsoryWordings: "",
    //   colors: "",
    //   leaderPhoto: "",
    //   status: "",
    //   approvedStatus: "",
    //   createdBy: ""
    // });
  };

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(input);
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      id="inputform"
      name="inputform"
      enctype="multipart/form-data"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        <IconButton
          to="/project-list"
          className="topbar-btn mb-5"
          LinkComponent={Link}
          style={{
            color: "black",
          }}
        >
          See All Projects
        </IconButton>
        <FormLabel>Title</FormLabel>
        <TextField
          value={title}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="title"
        />
        <FormLabel>Project Description</FormLabel>
        <TextField
          value={projectDescription}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="projectDescription"
        />
        <FormLabel>Sample Image</FormLabel>
        <TextField
          value={sampleImage}
          onChange={handleChange}
          margin="normal"
          //type="file"
          fullWidth
          variant="outlined"
          name="sampleImage"
        />
        <FormLabel>Due Date 1</FormLabel>
        <TextField
          type="date"
          value={dueDate1}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="dueDate1"
        />
        <FormLabel>Due Date 2</FormLabel>
        <TextField
          type="date"
          value={dueDate2}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="dueDate2"
        />
        <FormLabel>Compulsory Wordings</FormLabel>
        <TextField
          value={compulsoryWordings}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="compulsoryWordings"
        />
        <FormLabel>Color</FormLabel>
        <Select
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="colors"
          value={colors}
        >
          <MenuItem value="Black">Black</MenuItem>
          <MenuItem value="Brown">Brown</MenuItem>
          <MenuItem value="Silver">Silver</MenuItem>
          <MenuItem value="White">White</MenuItem>
          <MenuItem value="Blue">Blue</MenuItem>
          {/* <MenuItem>Please select</MenuItem>
                  {colors?.map((c) => (
                    <MenuItem key={c} value={c.colors}>
                      {c.colors}
                    </MenuItem>
                  ))} */}
        </Select>
        <FormLabel>Leader Photo</FormLabel>
        <TextField
          value={leaderPhoto}
          onChange={handleChange}
          margin="normal"
          fullWidth
          //type="file"
          variant="outlined"
          name="leaderPhoto"
        />
        <FormLabel>File</FormLabel>
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
            }}
            variant="raised"
            component="span"
          >
            Upload
          </Button>
        </label>

        <Button variant="contained" type="submit">
          Create
        </Button>
      </Box>
    </form>
  );
};

export default ProjectCreate;
