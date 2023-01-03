import Calendar from "react-calendar";
import { Play } from "../types";

export default function ScoreCalendar(props: { plays: Play[] }) {
  const { plays } = props;
  const datesWithPlays = plays.reduce((acc, play) => {
    const date = new Date(play.completed_at * 1000);
    acc.add(dateToKey(date));
    return acc;
  }, new Set<string>());

  return (
    <Calendar
      calendarType="US"
      minDate={new Date(2022, 9, 1)}
      maxDate={new Date()}
      minDetail={"year"}
      tileClassName={({ date }) => {
        if (datesWithPlays.has(dateToKey(date))) {
          return "highlight";
        } else {
          return "";
        }
      }}
    />
  );
}

function dateToKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
