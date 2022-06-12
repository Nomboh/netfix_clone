import React from "react";
import { Movie } from "../typings";
import style from "../styles/Row.module.css";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: props) {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [isMoved, setIsMoved] = React.useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (listRef.current) {
      const scrollLeft = listRef.current?.scrollLeft;
      const clientWidth = listRef.current?.clientWidth;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      listRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      console.log(listRef.current.getBoundingClientRect());
    }
  };
  return (
    <div className={style.row}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.content}>
        <div
          className={`${style.arrow} ${style.arrow_left} ${
            !isMoved && style.hidden
          }`}
          onClick={() => handleClick("left")}
        >
          <FaChevronLeft className={style.chevron} />
        </div>
        <div className={style.card_wrapper} ref={listRef}>
          {movies.map(movie => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        <div
          className={`${style.arrow} ${style.arrow_right}`}
          onClick={() => handleClick("right")}
        >
          <FaChevronRight className={style.chevron} />
        </div>
      </div>
    </div>
  );
}

export default Row;
