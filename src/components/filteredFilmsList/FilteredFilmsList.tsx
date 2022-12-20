import styles from './styles/filteredFilmsList.module.sass'
import DefaultBtn from "../common/defualtBtn/DefaultBtn";
import { IFilmObj} from '../../interfaces/filmObj';
import FilmCard from "../common/filmCard/FilmCard";

interface IFilteredFilmsList{
  filteredFilms: Array<IFilmObj>,
  setLimit?: any,
  limit: number,
}

function FilteredFilmsList(props: IFilteredFilmsList) {

  const onClick = ()=>{
    props.setLimit( props.limit + 10)
  }

  return (
    <div className={styles.films}>
      <div className={styles.films__list}>
        {props.filteredFilms?.map((item)=>{
          return(
            <FilmCard 
            key={item.id}
            id={item.id}
            link={item.poster?.url}
            name={item.name}
            kp={item.rating.kp}
            genres={item.genres}
            />
          )
        })}
      </div>
      <DefaultBtn title="Показать ещё" onClick={onClick}/>
    </div>
  );
}

export default FilteredFilmsList;