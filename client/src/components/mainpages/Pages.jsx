import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Movies from "./movies/Movies";
import DetailMovie from "./detailMovie/DetailMovie";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Users from "./users/Users";
import NotFound from "./utils/not_found/NotFound";
import Categories from "./categories/Categories";
import CreateMovie from "./createMovie/CreateMovie";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path='/' exact component={Movies} />
      <Route path='/detail/:id' exact component={DetailMovie} />

      <Route path='/login' exact component={isLogged ? NotFound : Login} />
      <Route path='/register' exact component={isLogged ? NotFound : Register} />

      <Route path='/categories' exact component={isAdmin ? Categories : NotFound} />
      <Route path='/users' exact component={isAdmin ? Users : NotFound} />
      <Route path='/create_movie' exact component={isAdmin ? CreateMovie : NotFound} />
      <Route path='/edit_movie/:id' exact component={isAdmin ? CreateMovie : NotFound} />

      <Route path='*' exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
