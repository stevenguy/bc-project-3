import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Entries from "./pages/Entries"
import Search from "./pages/Search"
import Upload from "./pages/Upload"
import Reports from "./pages/Reports"
import Login from "./pages/Login"
import Status from "./pages/Status"
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
      <div className="routerContainer">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Entries" component={Entries} />
          <Route exact path="/Upload" component={Upload} />
          <Route exact path="/Status" component={Status} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/Reports" component={Reports} />
        </Switch>
      </div>
      </Router>
    </React.Fragment>

  )
}

export default App;
