import "./App.sass";
import { BiFolderOpen, BiHistory, BiCalendar, BiHome } from "react-icons/bi";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Subscription from "./Subscription";
import History from "./History";
import Today from "./Today";
import React, { useEffect, useState } from "react";
import { BangumiMeta } from "./type";
import BangumiInfo from "./BangumiInfo";
function App() {
  const sidebarIconSize = 42;
  const [bangumiMeta, setBangumiMeta] = useState<BangumiMeta>({ bangumis: [] });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/bangumi/meta.json");
      const meta = await response.json();
      setBangumiMeta(meta);
      console.log(meta);
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <nav
          className="navbar card bd-navbar is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-brand ">
              <div className="navbar-item nav-logo">Mashiro</div>
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field has-addons">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Find a repository"
                    />
                  </div>
                  <div className="control">
                    <button className="button is-info">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="sidebar card">
          <ul className="sidebar-menu">
            <li>
              <Link to="/" className="sidebar-link">
                <BiHome size={sidebarIconSize} />
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="sidebar-link">
                <BiFolderOpen size={sidebarIconSize} />
              </Link>
            </li>
            <li>
              <Link to="/history" className="sidebar-link">
                <BiHistory size={sidebarIconSize} />
              </Link>
            </li>
            <li>
              <Link to="/today" className="sidebar-link">
                <BiCalendar size={sidebarIconSize} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Switch>
            <Route path="/subscription">
              <Subscription />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/today">
              <Today />
            </Route>
            <Route
              path="/info/:id"
              children={<BangumiInfo bangumis={bangumiMeta.bangumis} />}
            ></Route>
            <Route path="/">
              <Home bangumis={bangumiMeta.bangumis} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
