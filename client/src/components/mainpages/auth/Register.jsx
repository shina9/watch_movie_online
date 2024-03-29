import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      // localStorage.setItem("firstLogin", true);

      window.location.href = "/login";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input type='text' name='name' required placeholder='Name' value={user.name} onChange={onChangeInput} />

        <input type='email' name='email' required placeholder='Email' value={user.email} onChange={onChangeInput} />

        <input
          type='password'
          name='password'
          required
          autoComplete='on'
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
        />

        <div className='row'>
          <Button style={{ marginLeft: "33%" }} variant='contained' color='primary' type='submit'>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
