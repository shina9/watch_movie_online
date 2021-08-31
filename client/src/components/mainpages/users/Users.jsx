import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Button } from "@material-ui/core";
import axios from "axios";

function Users() {
  const state = useContext(GlobalState);
  const [users] = state.usersAPI.users;
  const [token] = state.token;
  const [callback, setCallback] = state.usersAPI.callback;

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: token },
      });
      //      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className='users'>
      <div className='col'>
        <h2>Users List: </h2>
        {users.map((user) => (
          <div style={{ display: "flex" }} className='row'>
            <div className='row' key={user._id}>
              <div style={{ display: "flex" }}>
                <h4>Username:</h4>
                <p style={{ marginLeft: "10px" }}>{user.name}</p>
              </div>
              <div style={{ display: "flex" }}>
                <h4>Email:</h4>
                <p style={{ marginLeft: "10px" }}>{user.email}</p>
              </div>
            </div>
            <Button variant='contained' color='secondary' onClick={() => deleteUser(user._id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
