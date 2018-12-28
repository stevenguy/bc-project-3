import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Entries from "./pages/Entries"
import Search from "./pages/Search"
import Upload from "./pages/Upload"
import Reports from "./pages/Reports"
import Login from "./pages/Login"
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
          <Route exact path="/Search" component={Search} />
          <Route exact path="/Upload" component={Upload} />
          <Route exact path="/Reports" component={Reports} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/buntest" component={BunrithTest} />
          <Route exact path="/upload" component={Upload} />
        </Switch>
      </div>
      </Router>
    </React.Fragment>

  );
}

export default App;

