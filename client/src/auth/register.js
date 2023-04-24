import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  //  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated", isAuthenticated);
      navigate(0);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("register", e);
    dispatch(register({ name, email, password, role }));
    //window.alert($(e.target.name), 'is registered')
    //window.location.reload();
  };

  return (
    <div
      className="form"
      style={{
        width: "50% !important",
      }}
    >
      <form className="login-box" onSubmit={submitHandler}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Register</Typography>
          <div className="user-box">
            <TextField
              label="Name"
              style={{ color: "rgb(50, 50, 50)" }}
              type="name"
              id="name_field"
              className="input"
              //color="white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              id="email_field"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              id="password_field"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              margin="normal"
              fullWidth
              variant="outlined"
              name="role"
              style={{
                width: "100%",
                border: "2px solid white",
                color: "white",
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="superadmin">Super admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="statelevel">State Level</MenuItem>
              <MenuItem value="districtlevel">District Level</MenuItem>
              <MenuItem value="localarea">Local Area</MenuItem>
              <MenuItem value="designers">Designers</MenuItem>
              <MenuItem value="designchecker">Design Checker</MenuItem>
              <MenuItem value="proofchecker">Proof Checker</MenuItem>
            </Select>

            <Button className="btn" type="submit">
              REGISTER
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Register;
