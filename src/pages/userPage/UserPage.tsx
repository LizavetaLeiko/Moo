import styles from "./styles/userPage.module.sass";
import { useEffect, useState } from "react";
import { NavLink, Params, useNavigate, useParams } from "react-router-dom";
import apiKey from "../../apiKey";
import { api, backend } from "../../axios/axios";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import { useAppSelector } from "../../redux/reduxHook";
import { addUnLiked, setError, setUserInfo } from "../../redux/reduser/userSlice";
import { useDispatch } from "react-redux";
import { IShortFilmObj } from "../../interfaces/filmObj";
import PopUp from "../../components/pop-up/PopUp";
import defaultPoster from '../../assets/imgs/defaultPoster.png';


function UserPage() {
  const navigate = useNavigate();
  const params = useParams<Params<string>>();
  const goHome = () =>
    navigate("/", {
      replace: true,
      state: { from: params.id, date: new Date() },
    });

  const [films, setFilms] = useState<Array<IShortFilmObj>>([]);

  const user = useAppSelector((state) =>state.user);
  const dispatch = useDispatch();

  const getFilms = async () => {
    if(user.likedFilms.length > 0){ 
    try {
      const result = await api.get(
        `/movie?${user.likedFilms
          .map((item: string) => {
            return `search=${item}&field=id&`;
          })
          .join(",")
          .replaceAll(",", "")}limit=${
            user.likedFilms.length
        }&selectFields=%20name%20id%20poster%20rating%20year&token=${apiKey}`
      );
      setFilms(result.data.docs ? result.data.docs : [...films, result.data]);
    } catch (err) {
      dispatch(setError(true))
    }
  }
  };

  useEffect(() => {
    getFilms();
    window.scrollTo(0,0)
  },[]);

  const removeMovie = (id: string) =>{
    dispatch(addUnLiked({id: user.id, filmId: id}))
  }

  const defaultUser ={
    id: '',
    likedFilms: [],
    login: '',
    isActivated: false,
    isAuth: false,
    status: null,
    error: null,
    isLoading: false,
  }

  const postLogout = async () =>{
    try {
      await backend.post('/api/logout');
      localStorage.removeItem('token');
      dispatch(setUserInfo(defaultUser))
      goHome()
    } catch (err) {
      dispatch(setError(true))
    }
  }

  return (
    <div
      className={styles.userpage}
      style={
        user?.theme === "light"
          ? { backgroundColor: "#fff", color: "#000" }
          : { backgroundColor: "#000", color: "#fff" }
      }
    >
      <div className={styles.userpage__container} style={films.length > 1 ? {height: '100%'} : {height: '100vh'}}>
        <DefaultBtn title="Выйти из аккаунта" maxWidth='300px' marginBottom='50px' onClick={postLogout}/>
        {films.length > 0 
        ?
        <div className={styles.userpage__films}>
          {
            films?.map((item: IShortFilmObj)=>{
              return(
                <div className={styles.userpage__film}>
                  <NavLink to={`/movie/${item?.id}`} className={user?.theme === 'light' ? 'link-class-black' : 'link-class'}>
                  <div className={styles.userpage__film__info}>
                    <div className={styles.userpage__film__img}>
                      <img src={item?.poster?.url ? item.poster.url : defaultPoster} alt={item?.name} />
                    </div>
                    <div className={styles.userpage__film__text}>
                      <h1>{item?.name}</h1>
                      {item?.rating?.kp && <p>{item?.rating?.kp?.toFixed(1)}</p>}
                    </div>
                  </div>
                  </NavLink>
                  <DefaultBtn title="Удалить" maxWidth='190px' onClick={()=>removeMovie(item?.id.toString())} />
                </div>
              )
            })
          }
        </div>
        :
        <p className={styles.p}>Нет отложенных фильмов</p>
        }
      </div>
      {
        user.error 
        &&
        <PopUp title="Произошла ошибка" text="Извините, произошла ошибка запроса"/>
      }
    </div>
  );
}

export default UserPage;
