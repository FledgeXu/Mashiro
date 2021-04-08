import BangumiCard from "./BangumiCard";
import "./Today.sass";
import { Bangumi } from "./type";

interface TodayProps {
  bangumis: Bangumi[];
}
const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
export default function Today(props: TodayProps) {
  const { bangumis } = props;
  return (
    <div className="today-page">
      <p className="title is-2 is-spaced">Today</p>
      <div className="main">
        {bangumis
          .filter((bangumi) => {
            return isToday(new Date(bangumi.updateDate));
          })
          .map((bangumi) => (
            <div className="show-card" key={bangumi.id}>
              <BangumiCard key={bangumi.id} bangumi={bangumi} />
            </div>
          ))}
      </div>
    </div>
  );
}
