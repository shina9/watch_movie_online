import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li className='menu_text'>
          <Link to='/create_movie'>Create Movie</Link>
        </li>
        <li className='menu_text'>
          <Link to='/categories'>Categories</Link>
        </li>
        <li className='menu_text'>
          <Link to='/users'>Users</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li className='menu_text'>
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className='text'>
        <h1>
          <Link to='/'>{isAdmin ? "Admin" : "Movie APP"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li className='menu_text'>
          <Link to='/'>{isAdmin ? "Movies" : "Home"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li className='menu_text'>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
