import { BangumiCard } from "./BangumiCard";
import "./Home.sass";
import { Bangumi } from "./type";

interface HomeProps {
  bangumis: Bangumi[];
}
export default function Home(props: HomeProps) {
  const { bangumis } = props;
  return (
    <div className="home">
      {bangumis.map((bangumi) => (
        <div className="show-card" key={bangumi.id}>
          <BangumiCard key={bangumi.id} bangumi={bangumi} />
        </div>
      ))}
    </div>
  );
}
