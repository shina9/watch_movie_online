import React, { createContext, useState, useEffect } from "react";
import MoviesAPI from "./api/MoviesAPI";
import UserAPI from "./api/UserAPI";
// import CurrentUserAPI from "./api/CurrentUserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import UsersAPI from "./api/UsersAPI";
import CommentsAPI from "./api/CommentsAPI";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    moviesAPI: MoviesAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    usersAPI: UsersAPI(),
    // currentUserAPI: CurrentUserAPI(),
    commentsAPI: CommentsAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
