import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Article from "./pages/Article";

class App extends Component {
  render() {
    return (
      <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Article} />
        <Route exact path="/articles" component={Article} />
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
