import { Link } from "react-router-dom";
import "./BangumiCard.sass";
import { Bangumi } from "./type";

interface BangumiCardProps {
  bangumi: Bangumi;
}
export default function BangumiCard(props: BangumiCardProps) {
  const { bangumi } = props;
  const bangumiName = () => {
    return bangumi.nameCN === "" ? bangumi.name : bangumi.nameCN;
  };
  return (
    <div className="card bangumi-card">
      <Link to={"/info/" + bangumi.id}>
        <header className="card-header">
          <p className="card-header-title">{bangumi.director}</p>
        </header>
        <div className="card-image">
          <figure className="image is-2by3">
            <img src={bangumi.coverPhoto} alt={bangumiName()} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title">{bangumiName()}</p>
        </div>
      </Link>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            <a href={bangumi.bangumiURL} target="bangumi">
              Bangumi
            </a>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            {"Update Time: " +
              new Date(bangumi.updateDate).toLocaleDateString()}
          </span>
        </p>
      </footer>
    </div>
  );
}
