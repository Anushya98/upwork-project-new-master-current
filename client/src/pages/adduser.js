import {
  Button,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import "../assets/adduser.css";
//import { useNavigate } from "react-router-dom";

const AddUser = () => {
//const history = useNavigate();
  const [input, setInput] = useState({
    name: "",
    nickname: "",
    qualification: "",
    position: "",
    state: "",
    district: "",
    village: "",
    constituencyloksabha: "",
    constituencyassembly: "",
    phonenumber: "",
    email: "",
    facebook: "",
    instagram: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  });

  const {
    name, 
    nickname, 
    qualification, 
    position, 
    state, 
    district, 
    village, 
    constituencyloksabha, 
    constituencyassembly, 
    phonenumber, 
    email, 
    facebook, 
    instagram, 
    image1, 
    image2, 
    image3, 
    image4 
  } = input;
    const handleChange = (e) => {
    setInput((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    });
    console.log(input);
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/adduser ", input )
      .then(res => {
      console.log(res.input);
    }).catch (err => console.log(err))
  setInput({
    ...input,
    name: "",
    nickname: "",
    qualification: "",
    position: "",
    state: "",
    district: "",
    village: "",
    constituencyloksabha: "",
    constituencyassembly: "",
    phonenumber: "",
    email: "",
    facebook: "",
    instagram: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  }); 
  };
  //history.push("/report"); 
    return (
      <div className="addform" style={{
        width: '50% !important'
      }}>
      <form 
      method = "POST" 
      onSubmit={handleSubmit} 
      className="in-box"
      name="inputform"
      
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={890}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight="auto"
          //marginTop={10}
        >
        <Typography variant="h2">Add User</Typography>
        <div className="adduser-box" >
          <TextField
            label="Name"
            value={name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
            className="input"
          />
          
          <TextField
            label= "Nickname"
            value={nickname}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="nickname"
            className="input"
          />
          
          <TextField
            label="Qualification"
            value={qualification}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="qualification"
            className="input"
          />
          
          <TextField
            label="Position"
            value={position}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="position"
            className="input"
          />
          
          <TextField
            label="State"
            value={state}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="state"
            className="input"
            />
          
          <TextField
            label="District"
            value={district}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="district"
            className="input"
          />
          
          <TextField
            label="Village"
            value={village}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="village"
            className="input"
          />
             
          <TextField
          label="Constituencyloksabha"
            value={constituencyloksabha}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="constituencyloksabha"
            className="input"
          />
          
          <TextField
            label="Constituencyassembly"
            value={constituencyassembly}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="constituencyassembly"
            className="input"
          />
          
          <TextField
            label="Phone Number"
            value={phonenumber}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="phonenumber"
            className="input"
          />
          
          <TextField
            label="Email"
            value={email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="email"
            className="input"
          />
          
          <TextField
            label="Facebook"
            value={facebook}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="facebook"
            className="input"
          />
          
          <TextField
            label="Instagram"
            value={instagram}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="instagram"
            className="input"
          />
          
          <TextField
            label="Image1"
            value={image1}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image1"
            className="input"
          />
          
          <TextField
            label="Image2"
            value={image2}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image2"
            className="input"
          />
          
          <TextField
            label="Image3"
            value={image3}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image3"
            className="input"
          />
          
          <TextField
            label="Image4"
            value={image4}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image4"
            className="input"
          />
         <Button variant="contained" className="btn" type="submit">
            Submit
          </Button>
          </div>
        </Box>
      </form>
      </div>
    );
  };
  
export default AddUser;