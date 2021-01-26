import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import SoftSkillsQuotes from "./SoftSkillsQuotes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/it-takes-more">
          <SoftSkillsQuotes />
        </Route>
        <Route path="*">
          {/* todo */}
          <div>404 here</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
