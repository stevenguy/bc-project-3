import React from "react";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Entries from "./pages/Entries"
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
      <div className="routerContainer">
      <ResponsiveDrawer />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/entries" component={Entries} />
        </Switch>
      <Footer />
      </div>
      </Router>
    </React.Fragment>
  );
}

export default App;

