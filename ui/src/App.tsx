import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Components/tab";
import Data from "./Components/Tenants";
import Home from "./Components/Home";
import Create from "./Components/CreateTenants";
import Sing from "./Components/signin";
import "./App.css";
function App() {
  const [token, setToken] = React.useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  // if (!token) {
  //   return <Sing />;
  // }

  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Create" component={Create} />
          <Route exact path="/Data" component={Data} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
