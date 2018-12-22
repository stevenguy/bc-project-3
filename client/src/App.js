import React from "react";
import Transactions from "./pages/Transactions";
import Nav from "./components/Nav";

import NoMatch from "./pages/NoMatch";
import BunrithTest from "./pages/bunrithTest";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/buntest" component={BunrithTest} />
            <Route component={NoMatch} />
      </Switch>
      <Transactions />
    </div>
  );
}

export default App;

