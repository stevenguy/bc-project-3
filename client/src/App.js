import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import firebase from 'firebase'
import NoMatch from "./pages/NoMatch";


firebase.initializeApp({
  apiKey: "AIzaSyDEdL_X9tsVjxAohlmo-N6z94Fe4Hm2kDQ",
  authDomain: "project-3-10d7a.firebaseapp.com",
  databaseURL: "https://project-3-10d7a.firebaseio.com",
  projectId: "project-3-10d7a",
  storageBucket: "project-3-10d7a.appspot.com",
  messagingSenderId: "967245710812"
});


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

