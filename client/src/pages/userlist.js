import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useNavigate } from "react-router-dom";

//import MetaData from '../layout/MetaData'
//import Loader from '../layout/Loader'
//import Sidebar from '../layout/Sidebar'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, clearErrors } from "../actions/userActions";
import { DELETE_USER_RESET } from "../constants/userConstants";

const UsersList = ({ history }) => {
  //const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      //alert.success('User deleted successfully');
      //history.push('/users');
      dispatch({ type: DELETE_USER_RESET });
      dispatch(allUsers());
    }
  }, [dispatch, alert, error, isDeleted, history]);
  console.log();
  const deleteUserHandler = (id) => {
    console.log("id", id);
    dispatch(deleteUser(id));
    //        dispatch(allUsers());
    //navigate(0);
    //window.location.reload();
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        name: user.name,
        email: user.email,
        role: user.role,

        actions: (
          <Fragment>
            {/* <Link to={`/users/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link> */}
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash">Delete</i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <h1 className="my-5">All Users</h1>

      <MDBDataTable
        data={setUsers()}
        className="px-3"
        width="100%"
        //textAlign="center"
      />
    </Fragment>
  );
};

export default UsersList;
