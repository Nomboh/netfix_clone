import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import style from "../styles/Card.module.css";
import { Movie } from "../typings";
interface props {
  movie: Movie;
}

function Card({ movie }: props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <div
      className={style.card}
      onClick={() => {
        setCurrentMovie(movie), setModal(true);
      }}
    >
      <div className={style.image_container}>
        <p className={style.title}>{movie.title || movie.original_name}</p>
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
