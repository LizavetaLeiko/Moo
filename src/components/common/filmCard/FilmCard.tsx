import styles from "./styles/filmCard.module.sass";
import defaultPoster from '../../../assets/imgs/defaultPoster.png';

interface genre {
  _id: string,
  name: string,
}

interface filmCard{
  name: string,
  kp: number,
  genres: Array<genre>,
  link?: string,
}

function FilmCard(props: filmCard) {
  return (
    <div className={styles.flex}>
      <div className={styles.film}>
        <div className={styles.film__img}>
          <img src={props.link? props.link : defaultPoster} alt="Русский фильм" />
        </div>
        <div className={styles.film__info}>
          <h1 className={styles.film__name}>
            {props.name}
          </h1>
          <span className={styles.film__rating}>
            {props.kp.toFixed(1)}
          </span>
        </div>
        <p className={styles.film__genres}>
          {props.genres.map((item: genre) => {
              return <span>{item.name}</span>;
          })}
        </p>
      </div>
    </div>
  );
}

export default FilmCard;
