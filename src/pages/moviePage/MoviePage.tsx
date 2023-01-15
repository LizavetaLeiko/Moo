import styles from "./styles/moviePage.module.sass";
import { Params, useParams } from "react-router-dom";
import { api } from "../../axios/axios";
import apiKey from "../../apiKey";
import { useEffect,  useState } from "react";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import { ICountries, IGenre} from "../../interfaces/filmObj";
import ActorsSlider from "../../components/common/actorsSlider/ActorsSlider";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { addLiked, setError } from "../../redux/reduser/userSlice";
import defaultPoster from '../../assets/imgs/defaultPoster.png';
import PopUp from "../../components/pop-up/PopUp";
import FilmsSlider from "../../components/common/filmsSlider/FilmsSlider";


function MoviePage() {

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const params = useParams<Params<string>>();
  const [filmInfo, setFilmInfo] = useState<any>();
  const [err, setErr] = useState<string>('ok');

  const getFilmInfo = async () => {
    try {
      const result = await api.get(
        `/movie?search=${params.id}&field=id&selectFields=%20name%20id%20poster%20rating%20budget%20fees%20type%20description%20slogan%20year%20facts%20genres%20countries%20seasonsInfo%20persons%20alternativeName%20movieLength%20similarMovies%20ageRating&token=${apiKey}`
      );
      setFilmInfo(result.data);
    } catch (err) {
      dispatch(setError(true))
    }
  };

  useEffect(()=>{
    getFilmInfo()
    window.scrollTo(0,0)
  },[params.id]);

  const dispatchNewFilm=()=>{
    if(!user.isAuth){
      setErr('unAuth')
    } else if (!user.isActivated) {
      setErr('unActive')
    }
    else{
      dispatch(addLiked({id: user.id, filmId: params.id}));
      setErr('ok')
    }
  }

  return (
    <div className={styles.filmPage}  style={user.theme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}>
      <div className={styles.filmPage__flex}>
        <div className={styles.filmPage__left}>
          <div className={styles.filmPage__poster}>
            <img src={filmInfo?.poster?.url ? filmInfo?.poster?.url : defaultPoster} alt={filmInfo?.name && filmInfo?.name}/>
          </div>
          {
            user.likedFilms?.length > 0 &&
            user.likedFilms?.includes(filmInfo?.id?.toString(), 0)
            ?
            <DefaultBtn title="Фильм в закладках" maxWidth='100%' marginBottom='20px' disabled={true}/>
            :
            <DefaultBtn title="Добавить в закладки" maxWidth='100%' marginBottom='20px' onClick={dispatchNewFilm}/>
          }
        </div>
        <div className={styles.filmPage__right}>
          <div className={styles.filmPage__mane}>
            <h1 className={styles.filmPage__title}>{filmInfo?.name && filmInfo?.name}</h1>
            {filmInfo?.rating.kp 
            &&
            <span className={styles.filmPage__rating}>{filmInfo?.rating.kp.toFixed(1)}</span>
            }
          </div>
          {
            filmInfo?.alternativeName && <h2 className={styles.filmPage__subtitle}>{filmInfo?.alternativeName}</h2>
          }
          <div className={styles.filmPage__genres}>
            {filmInfo?.genres &&
            filmInfo?.genres?.map((item: IGenre) => {
                return <span className={styles.filmPage__genre} key={item._id}>{item.name} ~</span>;
            })}
          </div>
          <div className={styles.filmPage__chars}>
            <span className={styles.filmPage__chars__title}>Год</span>
            <span className={styles.filmPage__chars__value}>{filmInfo?.year && filmInfo?.year}</span>
            <span className={styles.filmPage__chars__title}>Страна производства</span>
            <span className={styles.filmPage__chars__value}>
              {filmInfo?.countries &&
              filmInfo?.countries?.map((item: ICountries) => {
                return <span key={item._id}>{item.name}</span>;
              })
            }
            </span>
            <span className={styles.filmPage__chars__title}>Бюджет</span>
            <span className={styles.filmPage__chars__value}>{filmInfo?.budget?.value && filmInfo?.budget?.value}{filmInfo?.budget?.currency && filmInfo?.budget?.currency}</span>
            <span className={styles.filmPage__chars__title}>Мировые сборы</span>
            <span className={styles.filmPage__chars__value}>{filmInfo?.fees?.world?.value && filmInfo?.fees?.world?.value}{filmInfo?.fees?.world?.currency &&  filmInfo?.fees?.world?.currency}</span>
            <span className={styles.filmPage__chars__title}>Длительность</span>
            <span className={styles.filmPage__chars__value}>{filmInfo?.movieLength && filmInfo?.movieLength} мин</span>
            <span className={styles.filmPage__chars__title}>Возрастное ограничение</span>
            <span className={styles.filmPage__chars__value}>{filmInfo?.ageRating ? filmInfo?.ageRating : 0} +</span>
          </div>
          <p className={styles.filmPage__desc}>{filmInfo?.description && filmInfo?.description}</p>
        </div>
      </div>
          {filmInfo?.persons && filmInfo?.persons.length > 0 &&
            <ActorsSlider persons={filmInfo?.persons} title='Актеры'/>
          }
          {filmInfo?.similarMovies && filmInfo?.similarMovies.length > 0 &&
            <FilmsSlider movies={filmInfo?.similarMovies} title='Похожие фильмы'/>
          }
          {
          err === 'unAuth'
          &&
          <PopUp title="Пожалуйста, авторизуйтесь" text="Добавить фильм может только авторизованный пользователь" onChangeBoolState={setErr}/>
          }
          {
          err === 'unActive'
          &&
          <PopUp title="Пожалуйста, подтвердите почту" text="При регистрации вам на эл. почту было отправлено письмо активации аккаунта" onChangeBoolState={setErr}/>
          }
    </div>
  );
}

export default MoviePage;
