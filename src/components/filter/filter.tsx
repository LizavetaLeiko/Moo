import DefaultBtn from '../common/defualtBtn/DefaultBtn';
import styles from './styles/filter.module.sass';
import apiKey from "../../apiKey";
import { api } from '../../axios/axios';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IFilter{
  filtered: boolean,
  setFiltered: Dispatch<SetStateAction<boolean>>,
  filteredFilms: Array<any>,
  setFilteredFilms: Dispatch<SetStateAction<any[]>>,
  limit: number,
}

function Filter(props:IFilter) {

  const [genre, setGenre] = useState<string>('');
  const [yearFrom, setYearFrom] = useState<string>('1990');
  const [yearTo, setYearTo] = useState<string>('2022');
  const [kpFrom, setKpFrom] = useState<string>('1');
  const [kpTo, setKpTo] = useState<string>('10');

  const getMovies = async () => {
    try {
      if(genre) {
        const result = await api.get(
        `/movie?field=genres.name&search=${genre}&field=year&search=${yearFrom}-${yearTo}&field=rating.kp&search=${kpFrom}-${kpTo}&sortType=-1&limit=${props.limit}&selectFields=genres%20videos.trailers%20year%20name%20description%20ageRating%20id%20poster%20rating%20&token=${apiKey}`
      )
      props.setFilteredFilms(result.data.docs);
      } else{
        const result = await api.get(
          `/movie?field=year&search=${yearFrom}-${yearTo}&field=rating.kp&search=${kpFrom}-${kpTo}&sortType=-1&limit=${props.limit}&selectFields=genres%20videos.trailers%20year%20name%20description%20ageRating%20id%20poster%20rating%20&token=${apiKey}`
        )
        props.setFilteredFilms(result.data.docs);
      }
      
      
    } catch (err: any) {
      console.log("error");
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLButtonElement>)=>{ 
    event.preventDefault();
    getMovies();
    props.setFiltered(true);
  }

  useEffect(()=>{
    getMovies()
  }, [props.limit])

  const handleChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(() => event.target.value);
  };
  const handleChangeYearFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearFrom(() => event.target.value);
  };
  const handleChangeYearTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearTo(() => event.target.value);
  };
  const handleChangeKpFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKpFrom(() => event.target.value);
  };
  const handleChangeKpTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKpTo(() => event.target.value);
  };


  return (
    <div className={styles.filter}>
      <form className={styles.filter__form}>
        <div className={styles.filter__chapter}>
          <h2 className={styles.filter__subtitle}>Жанр</h2>
          <p className={styles.filter__label}>Выберите жанр</p>
          <select  name="genres" id="genres" onChange={handleChangeGenre} className={styles.filter__genres}>
            <option value="">Все</option>
            <option value="аниме">Аниме</option>
            <option value="боевик">Боевик</option>
            <option value="детектив">Детектив</option>
            <option value="драма">Драма</option>
            <option value="комедия">Комедия</option>
            <option value="криминал">Криминал</option>
            <option value="мелодрама">Мелодрама</option>
            <option value="мультфильм">Мультфильм</option>
            <option value="мюзикл">Мюзикл</option>
            <option value="приключения">Приключения</option>
            <option value="семейный">Семейный</option>
            <option value="триллер">Триллер</option>
            <option value="ужасы">Ужасы</option>
            <option value="фентези">Фентези</option>
            <option value="фантастика">Фантастика</option>
          </select>
        </div>
        <div className={styles.filter__chapter}>
          <h2 className={styles.filter__subtitle}>Год выхода</h2>
          <div className={styles.filter__chapter__fields}>
            <div className={styles.filter__chapter__field}>
              <label htmlFor="from__year">От</label>
              <input onChange={handleChangeYearFrom} type="text" id='from__year' placeholder='1990'/>
            </div>
            <span>-</span>
            <div className={styles.filter__chapter__field}>
              <label htmlFor="to__year">До</label>
              <input onChange={handleChangeYearTo} type="text" id='to__year' placeholder='2022'/>
            </div>
          </div>
        </div>
        <div className={styles.filter__chapter}>
          <h2 className={styles.filter__subtitle}>Рейтинг</h2>
          <div className={styles.filter__chapter__fields}>
            <div className={styles.filter__chapter__field}>
              <label htmlFor="from__kp">От</label>
              <input onChange={handleChangeKpFrom} type="text" id='from__kp' placeholder='1'/>
            </div>
            <span>-</span>
              <div className={styles.filter__chapter__field}>
                <label htmlFor="to__kp">До</label>
                <input onChange={handleChangeKpTo} type="text" id='to__kp' placeholder='10' />
              </div>
          </div>
        </div>
      </form>
      <DefaultBtn onClick={onSearch} title='Искать'/>
    </div>
  );
}

export default Filter;