import styles from "./styles/videoBanner.module.sass";
import DefaultBtn from "../common/defualtBtn/DefaultBtn";
import { api } from "../../axios/axios";
import apiKey from "../../apiKey";
import { useEffect, useRef, useState } from "react";
import { IFilmObj, IGenre } from '../../interfaces/filmObj'
import { NavLink } from "react-router-dom";

function VideoBanner() {
  const [films, setFilms] = useState<Array<IFilmObj>>([]);
  const [filmNum, setFilmNum] = useState<number>(0);
  const filmRef = useRef<number>(0)

  const getFilmInfo = async () => {
    try {
      const result = await api.get(
        `/movie?field=rating.kp&search=1-10&field=year&search=2020-2021&field=typeNumber&search=3&limit=10&sortField=year&selectFields=genres%20videos.trailers%20year%20name%20description%20ageRating%20id%20poster%20rating%20&sortType=-1&sortField=votes.imdb&sortType=-1&token=${apiKey}`
      );
      setFilms(result.data.docs.slice(1, 3));
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getFilmInfo();
    let interval = setInterval(() => {
      if (filmRef.current === 1) {
        filmRef.current = 0;
        setFilmNum(0)
      } else {
        filmRef.current++;
        setFilmNum(filmRef.current)
      }
    }, 120000);
    return () => clearInterval(interval);
  }, [films?.length]);

  return (
    <div className={styles.videoBanner}>
        <div className={styles.videoBanner__video}>
          <div className={styles.videoBanner__video__wrap}>
            <iframe
              className={styles.videoBanner__iframe}
              src={`${films[filmNum]?.videos?.trailers[0].url}?mute=1&showinfo=0&iv_load_policy=3&autoplay=1&controls=0&fs=0&showsearch=0&rel=0&modestbranding=1&loop=1`}
              title="video"
              allow="autoplay"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
        <div  className={styles.videoBanner__image__wrap}>
          <div className={styles.videoBanner__image}>
            <img src={films[filmNum]?.poster.url} alt="poster"/>
          </div>
        </div>
      <div className={styles.videoBanner__content}>
        <div className={styles.videoBanner__content__info}>
          <div className={styles.videoBanner__content__chapter}>
            <h1 className={styles.videoBanner__content__name}>
              {films[filmNum]?.name}
            </h1>
            <span className={styles.videoBanner__content__rating}>
              {films[filmNum]?.rating?.kp.toFixed(1)}
            </span>
          </div>
          <p className={styles.videoBanner__content__year}>
            {films[filmNum]?.year}
          </p>
          <p className={styles.videoBanner__content__genres}>
            {films[filmNum]?.genres?.map((item: IGenre) => {
              return <span key={item.name}>{item.name}</span>;
            })}
          </p>
          <p className={styles.videoBanner__content__desc}>
            {films[filmNum]?.description}
          </p>
          <span className={styles.videoBanner__content__dots}>...</span>
        </div>
        <NavLink className='link-class' to={`/movie/${films[filmNum]?.id}`}><DefaultBtn title="Подробнее" /></NavLink>
      </div>
    </div>
  );
}

export default VideoBanner;
