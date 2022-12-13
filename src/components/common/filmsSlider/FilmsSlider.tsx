import "./styles/filmSlider.css";
import styles from "./styles/filmSlider.module.sass";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FilmCard from "../filmCard/FilmCard";
import ArrowNext from "./arrows/ArrowNext";
import ArrowPrev from "./arrows/ArrowPrev";
import { api } from "../../../axios/axios";
import apiKey from "../../../apiKey";
import { useEffect, useState } from "react";
import { IFilmObj } from '../../../interfaces/filmObj';

interface ISlider {
  title: string;
  reqCode: number;
}

function FilmsSlider(props: ISlider) {
  const [films, setFilms] = useState<Array<IFilmObj>>([]);
  const [limit, setLimit] = useState<number>(10);

  const getMovies = async () => {
    try {
      const result = await api.get(
        `/movie?field=rating.kp&search=1-10&field=year&search=2021-2022&field=typeNumber&search=${props.reqCode}&limit=${limit}&sortField=year&selectFields=genres%20videos.trailers%20year%20name%20description%20ageRating%20id%20poster%20rating%20&sortType=-1&sortField=votes.imdb&sortType=-1&token=${apiKey}`
      );
      setFilms(result.data.docs);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getMovies();
  }, [limit]);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <ArrowNext setLimit={setLimit} limit={limit}/>,
    prevArrow: <ArrowPrev />,
    className: "slider",
  };

  return (
    <div className={styles.slider_wrap}>
      <h1 className={styles.title}>{props.title}</h1>
      <Slider {...settings}>
        {films?.map((item: IFilmObj ) => {
          return (
            <FilmCard
              key={item.id}
              id={item.id}
              link={item.poster.url}
              name={item.name}
              kp={item.rating.kp}
              genres={item.genres}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default FilmsSlider;
