import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("GG Sign in was unsuccessful");
  };

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <div className='row'>
          <h2>Login</h2>
          <Link style={{ color: "black", textDecoration: "underline" }} to='/register'>
            REGISTER HERE!!!
          </Link>
        </div>

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
          <Button color='primary' variant='contained' type='submit'>
            Login
          </Button>

          <GoogleLogin
            clientId='1017562627992-v7edbba0kp54fsr58mkqok7adbjqnpar.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                color='secondary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
