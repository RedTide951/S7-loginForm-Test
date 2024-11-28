import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./components/Layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Success from "./components/Success";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-body">
      <Header />
      <div className="content-section">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/error">
            <div>Error</div>
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
