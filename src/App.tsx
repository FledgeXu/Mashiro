import "./App.sass";
import { BiCalendar, BiHome } from "react-icons/bi";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Home";
import Today from "./Today";
import { useEffect, useState } from "react";
import { Bangumi, BangumiMeta } from "./type";
import BangumiInfo from "./BangumiInfo";
import SearchPage from "./SearchPage";
import Fuse from "fuse.js";

function App() {
  const sidebarIconSize = 42;
  const META_FILE = "meta.json";
  const [bangumiMeta, setBangumiMeta] = useState<BangumiMeta>({ bangumis: [] });
  const [fuse, setFuse] = useState<Fuse<Bangumi>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Fuse.FuseResult<Bangumi>[]>(
    []
  );
  const history = useHistory();

  const handlerSearch = () => {
    if (searchText !== "") {
      fuse && setSearchResult(fuse.search(searchText));
      history.push("/search");
    }
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
      keys: ["name", "nameCN", "summary", "director"],
    });
    setFuse(fuse);
  }, [bangumiMeta]);

  return (
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
                    onKeyPress={(event) =>
                      event.key === "Enter" && handlerSearch()
                    }
                    placeholder="Find Bangumis"
                  />
                </div>
                <div className="control">
                  <button
                    className="button is-info"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handlerSearch();
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
            <Link to="/today" className="sidebar-link">
              <BiCalendar size={sidebarIconSize} />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Switch>
          <Route path="/search">
            <SearchPage results={searchResult} />
          </Route>
          <Route path="/today">
            <Today bangumis={bangumiMeta.bangumis} />
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
  );
}

export default App;
