import "./App.sass";
import { BiFolderOpen, BiHistory, BiCalendar, BiHome } from "react-icons/bi";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Subscription from "./Subscription";
import Today from "./Today";
import { useEffect, useState } from "react";
import { Bangumi, BangumiMeta } from "./type";
import BangumiInfo from "./BangumiInfo";
import Fuse from "fuse.js";

function App() {
  const sidebarIconSize = 42;
  const META_FILE = "meta.json";
  const [bangumiMeta, setBangumiMeta] = useState<BangumiMeta>({ bangumis: [] });
  const [fuse, setFuse] = useState<Fuse<Bangumi>>();
  const [searchText, setSearchText] = useState<string>("");

  const handlerSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(fuse?.search(searchText));
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(META_FILE);
      const meta = await response.json();
      setBangumiMeta(meta);
      console.log(meta);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(bangumiMeta.bangumis, {
      keys: ["name", "nameCN", "summary"],
    });
    setFuse(fuse);
  }, [bangumiMeta]);

  return (
    <BrowserRouter>
      <div className="App">
        <nav
          className="navbar card bd-navbar is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <Link to="/">
            <div className="navbar-brand">
              <div className="navbar-item nav-logo">Mashiro</div>
            </div>
          </Link>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field has-addons">
                  <div className="control">
                    <input
                      className="input"
                      inputMode="text"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value.trim());
                      }}
                      placeholder="Find a repository"
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-info"
                      type="submit"
                      onClick={(e) => {
                        handlerSearch(e);
                      }}
                    >
                      Search
                    </button>
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
