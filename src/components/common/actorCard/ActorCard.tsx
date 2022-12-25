import styles from "./styles/actorCard.module.sass";
import defaultPoster from '../../../assets/imgs/defaultPoster.png';
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/reduxHook";

interface IActorCard{
  photo?: string,
  name: string,
  id: number,
}

function ActorCard(props: IActorCard) {

  const currentTheme = useAppSelector((state) => state.user.theme);

  return (
    <NavLink to={`/actor/${props.id}`} className={currentTheme === 'light' ? 'link-class-black' : 'link-class'}>
    <div className={styles.flex}>
      <div className={styles.actor}>
        <div className={styles.actor__img}>
          <img src={props.photo? props.photo : defaultPoster} alt={props.name} />
        </div>
        <h1 className={styles.actor__name}>
            {props.name}
        </h1>
      </div>
    </div>
    </NavLink>
  );
}

export default ActorCard;
