import { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";
import { Bangumi } from "./type";
import "./BangumiInfo.sass";
import BangumiFiles from "./BangumiFiles";

interface BangumiInfoProps {
  bangumis: Bangumi[];
}
interface BangumiInfoParams {
  id: string | undefined;
}
export default function BangumiInfo(props: BangumiInfoProps) {
  const params = useParams<BangumiInfoParams>();
  const [bangumi, setBangumi] = useState<Bangumi>();
  const [selectPanel, SetSelectPanel] = useState<number>(-1);
  const bangumiName = () => {
    return bangumi?.nameCN === "" ? bangumi?.name : bangumi?.nameCN;
  };
  useEffect(() => {
    props.bangumis.forEach((value) => {
      //We should get Bangumi from id;
      if (value.id === Number(params.id)) {
        setBangumi(value);
      }
    });
  }, [params, props.bangumis]);
  return (
    <div className="card bangumi-info">
      <header className="card-header">
        <p className="card-header-title">{bangumiName()}</p>
      </header>
      <div className="card-content">
        <div className="columns">
          <div className="column is-one-third">
            <figure className="image is-2by3">
              <img src={bangumi?.coverPhoto} alt={bangumiName()} />
            </figure>
          </div>
          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Summary:</p>
              </header>
              <div className="card-content">
                <div className="content">{bangumi?.summary}</div>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span>
                    <a href={bangumi?.bangumiURL}>Bangumi</a>
                  </span>
                </p>
                <p className="card-footer-item">
                  <span>
                    {bangumi &&
                      "Update Time: " +
                        new Date(bangumi.updateDate).toLocaleDateString()}
                  </span>
                </p>
              </footer>
            </div>
            <nav className="panel sources-panel">
              <p className="panel-heading">Sources</p>
              <p className="panel-tabs">
                {bangumi &&
                  bangumi.sources.map((source) => (
                    <Link
                      to={"/info/" + bangumi.id + "/" + source.id}
                      className={source.id === selectPanel ? "is-active" : ""}
                      onClick={() => {
                        SetSelectPanel(source.id);
                      }}
                    >
                      {source.fansub}
                    </Link>
                  ))}
              </p>
              {bangumi &&
                bangumi.sources.map((source) => (
                  <Route path={"/info/" + bangumi.id + "/" + source.id}>
                    <BangumiFiles folder={source.folder} />
                  </Route>
                ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
