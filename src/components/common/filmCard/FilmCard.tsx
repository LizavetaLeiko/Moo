import styles from "./styles/filmCard.module.sass";
import defaultPoster from '../../../assets/imgs/defaultPoster.png';
import {IGenre} from '../../../interfaces/filmObj'
import { NavLink } from "react-router-dom";

interface filmCard{
  name: string,
  kp?: number,
  genres?: Array<IGenre>,
  link?: string,
  id: number,
}

function FilmCard(props: filmCard) {
  return (
    <NavLink to={`/movie/${props.id}`}>
    <div className={styles.flex}>
      <div className={styles.film}>
        <div className={styles.film__img}>
          <img src={props.link? props.link : defaultPoster} alt={props.name} />
        </div>
        <div className={styles.film__info}>
          <h1 className={styles.film__name}>
            {props.name}
          </h1>
          {props.kp &&
            <span className={styles.film__rating}>
              {props.kp?.toFixed(1)}
            </span>
          }
        </div>
        {props.genres &&
          <p className={styles.film__genres}>
            {props.genres?.map((item: IGenre) => {
              return <span>{item.name}</span>;
            })}
        </p>
        }
      </div>
    </div>
    </NavLink>
  );
}

export default FilmCard;
