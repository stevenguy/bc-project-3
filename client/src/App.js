import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Reports from "./pages/Reports";
import Nav from "./components/Nav";

import NoMatch from "./pages/NoMatch";
import BunrithTest from "./pages/bunrithTest";
import Upload from "./pages/Upload";

function App() {
  return (
    
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Reports} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/buntest" component={BunrithTest} />
          <Route exact path="/upload" component={Upload} />
          <Route component={NoMatch} />
        </Switch>
        </div>
    </Router>
    
  );
}

export default App;
