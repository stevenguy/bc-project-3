import React from "react";
import Transactions from "./pages/Transactions";
import Nav from "./components/Nav";

import NoMatch from "./pages/NoMatch";


function App() {
  return (
    <div>
      <Nav />
      <Transactions />
    </div>
  );
}

export default App;

