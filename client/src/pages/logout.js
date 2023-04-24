import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
//import { useAlert } from 'react-alert'
import { logout } from '../actions/userActions'



const Logout = () => {
    //const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    
    const logoutHandler = () => {
      console.log('Logged out successfully.') 
      dispatch(logout());
        
        //alert.success('Logged out successfully.')
    }

    return (
        <Fragment>                               
            <div >
              <Link className="logout" to="/logout" onClick={logoutHandler}>
                Logout
              </Link>
            </div>


                        

        </Fragment>
    )
}

export default Logout
