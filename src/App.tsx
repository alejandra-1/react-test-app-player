import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import Menu from "./components/menu";
import Artists from "./components/artists";
import Albums from "./components/albums";
import Songs from "./components/songs";

import {HOME, ARTISTS, ALBUMS, SONGS} from "./routes";

import "./assets/sass/general.sass";
import "./assets/css/footer.css";
import "./assets/css/responsive.css";

const App = (props: any) => {

  return (
    <BrowserRouter>
      <div id="main-container">
        <Menu />
        <div id="body-container" className="container">
          <Switch>
            <Route exact path={HOME} component={Artists} />
            <Route exact path={ARTISTS} component={Artists} />
            <Route exact path={ALBUMS} component={Albums} />
            <Route exact path={SONGS} component={Songs} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
