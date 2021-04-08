import { Bangumi } from "./type";
import Fuse from "fuse.js";
import BangumiCard from "./BangumiCard";
import "./SearchPage.sass";

interface SearchPageProps {
  results: Fuse.FuseResult<Bangumi>[];
}
export default function SearchPage(props: SearchPageProps) {
  const { results } = props;
  return (
    <div className="search-page">
      <p className="title is-2 is-spaced">Search</p>
      <div className="main">
        {results.map((result) => (
          <div className="show-card" key={result.item.id}>
            <BangumiCard key={result.item.id} bangumi={result.item} />
          </div>
        ))}
      </div>
      <p className="subtitle is-3">End</p>
    </div>
  );
}
