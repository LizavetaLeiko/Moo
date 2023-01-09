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
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { setError } from "../../../redux/reduser/userSlice";
import PopUp from "../../pop-up/PopUp";

interface ISlider {
  title: string;
  reqCode: number;
}


function FilmsSlider(props: ISlider) {
  const [films, setFilms] = useState<Array<IFilmObj>>([]);
  const [limit, setLimit] = useState<number>(10);

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const getMovies = async () => {
    try {
      const result = await api.get(
        `/movie?field=rating.kp&search=1-10&field=year&search=2021-2022&field=typeNumber&search=${props.reqCode}&limit=${limit}&sortField=year&selectFields=genres%20videos.trailers%20year%20name%20description%20ageRating%20id%20poster%20rating%20&sortType=-1&sortField=votes.imdb&sortType=-1&token=${apiKey}`
      );
      setFilms(result.data.docs);
    } catch (err) {
      dispatch(setError(true));
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
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
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
      {
        user.error 
        &&
        <PopUp title="Произошла ошибка" text="Извините, произошла ошибка запроса"/>
      }
    </div>
  );
}

export default FilmsSlider;
