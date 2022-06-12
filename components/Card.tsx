import Image from "next/image";
import React from "react";
import style from "../styles/Card.module.css";
import { Movie } from "../typings";
interface props {
  movie: Movie;
}

function Card({ movie }: props) {
  return (
    <div className={style.card}>
      <div className={style.image_container}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className={style.image}
          layout="fill"
        />
      </div>
    </div>
  );
}

export default Card;
