import "./styles/similarFilmsSlider.css";
import styles from "./styles/similarFilmsSlider.module.sass";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FilmCard from "../filmCard/FilmCard";
import ArrowNext from "./arrows/ArrowNext";
import ArrowPrev from "./arrows/ArrowPrev";
import { useEffect, useState } from "react";
import ISimilarMovie from "../../../interfaces/ISimilarMovies";

interface ISimilarMovieSlider{
  movies: Array<ISimilarMovie>
  title: string,
}


function SimilarMovieSlider(props: ISimilarMovieSlider) {

  const [films, setFilms] = useState<Array<ISimilarMovie>>();

  useEffect(()=>{
    setFilms(props.movies);
  },[])

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: props.movies.length >= 5 ? 5 : props.movies.length,
    slidesToScroll: props.movies.length >= 5 ? 5 : props.movies.length,
    nextArrow: <ArrowNext/>,
    prevArrow: <ArrowPrev/>,
    className: "slider",
  };

  return (
    <div className={styles.slider_wrap}>
      <h1 className={styles.title}>{props.title}</h1>
      <Slider {...settings}>
        {films?.map((item: ISimilarMovie ) => {
          return (
            <FilmCard
              key={item.id}
              link={item.poster?.url}
              name={item.name}
              id={item.id}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default SimilarMovieSlider;
