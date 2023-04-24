import { Box, IconButton, useTheme } from "@mui/material";
//import { useContext } from "react";
import axios from "axios";

import { tokens } from "../theme";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import { setMode } from "state";

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

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState("");
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(currentUser);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        width: "100%",
        fontFamily: "sans-serif",
      }}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box
        style={{
          fontFamily: "sans-serif",
        }}
      >
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon style={{ color: 'White'}}/>
          ) : (
            <LightModeOutlinedIcon style={{ color: 'white'}}/>
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon style={{ color: 'white'}}/>
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon style={{ color: 'white'}}/>
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon style={{ color: 'white'}}/>
        </IconButton> */}
        <IconButton
          to="/adduser"
          className="topbar-btn"
          LinkComponent={Link}
          style={{
            color: "white",
            fontSize: "20px",
            //fontFamily: 'Poppins'
          }}
        >
          Add User
        </IconButton>

        {!currentUser ? (
          <IconButton
            to="/login"
            className="topbar-btn"
            LinkComponent={Link}
            style={{ 
              color: "white",
              fontSize: "20px"
             }}
          >
            Login
          </IconButton>
        ) : (
          !loading && (
            <IconButton
              to="/"
              onClick={logoutHandler}
              className="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
              LinkComponent={Link}
              style={{ 
                color: "white", 
                fontSize: "20px" 
              }}
            >
              Logout
            </IconButton>
          )
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
