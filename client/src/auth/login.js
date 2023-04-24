import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated", isAuthenticated);
      navigate("/projects");
      //history.push('/')
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    console.log("Successfully logged in", e);
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="form">
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
          <Typography variant="h2">Login</Typography>
          <div className="user-box">
            <TextField
              label="Email"
              type="email"
              id="email_field"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //variant="outlined"
              //placeholder="Email"
              //margin="normal"
            />

            <TextField
              label="Password"
              type="password"
              id="password_field"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //variant="outlined"
              //placeholder="Password"
              // margin="normal"
            />

            <Button className="btn" type="submit">
              LOGIN
            </Button>
            <Button
              className="btn"
              type="submit"
              to="/password/forgot"
              LinkComponent={Link}
            >
              Forgot Password
            </Button>
            <Button
              className="btn"
              type="submit"
              to="/register"
              LinkComponent={Link}
            >
              New User
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Login;
