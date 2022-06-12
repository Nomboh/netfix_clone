import Image from "next/image";
import React, { useEffect } from "react";
import { base_Url } from "../constants/movie";
import { Movie } from "../typings";
import style from "../styles/Banner.module.css";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
interface props {
  netflixOriginals: Movie[];
}
function Banner({ netflixOriginals }: props) {
  const [movie, setMovie] = React.useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  console.log(movie);
  return (
    <div className={style.banner}>
      <div className={style.img_container}>
        <Image
          src={`${base_Url}${movie?.backdrop_path || movie?.poster_path}`}
          alt="banner"
          layout="fill"
          className={style.banner_image}
        />
      </div>

      <div className={style.banner_content}>
        <div className={style.wrapper}>
          <h1 className={style.banner_title}>
            {movie?.title || movie?.original_name}
          </h1>
          <p className={style.banner_text}>{movie?.overview}</p>
          <div className={style.btns}>
            <button className={style.banner_btn1}>
              <FaPlay /> Play
            </button>
            <button className={style.banner_btn2}>
              <FaInfoCircle /> MoreInfo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
