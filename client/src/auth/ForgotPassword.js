import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
//import MetaData from '../layout/MetaData'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    //const alert = useAlert();
    const dispatch = useDispatch();

    const { error, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <div className="row wrapper">
      <form className="shadow-lg" onSubmit={submitHandler}>                  
        <Box
          marginLeft="auto"
          marginRight="auto"
          //marginTop="-500px"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
                            
        <Typography variant="h2" fontSize={25}>Enter Email</Typography>
        <TextField
            name="Email"
            type="email"
            id="email_field"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            placeholder="Email"
            margin="normal"
        />
                                
                                
        <Button
            id="login_button"
            type="submit"
            className="btn btn-block py-3"
        >
        SEND EMAIL
        </Button>

        </Box>
        </form>
      </div>
                    

    )
}

export default ForgotPassword
