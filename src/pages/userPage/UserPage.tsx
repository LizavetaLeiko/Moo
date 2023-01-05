import styles from "./styles/userPage.module.sass";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiKey from "../../apiKey";
import { api, backend } from "../../axios/axios";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import { useAppSelector } from "../../redux/reduxHook";
import { addUnLiked, setUserInfo } from "../../redux/reduser/userSlice";
import { useDispatch } from "react-redux";

function UserPage() {
  const navigate = useNavigate();
  const params = useParams<any>();
  const goHome = () =>
    navigate("/", {
      replace: true,
      state: { from: params.id, date: new Date() },
    });

  const [films, setFilms] = useState<Array<any>>([]);

  const user = useAppSelector((state) =>state.user);
  const dispatch = useDispatch();

  const getFilmIs = async () => {
    if(user.likedFilms.length > 0){ 
    try {
      const result = await api.get(
        `/movie?${user.likedFilms
          .map((item: any) => {
            return `search=${item}&field=id&`;
          })
          .join(",")
          .replaceAll(",", "")}limit=${
            user.likedFilms.length
        }&selectFields=%20name%20id%20poster%20rating%20budget%20fees%20type%20description%20slogan%20year%20facts%20genres%20countries%20seasonsInfo%20persons%20alternativeName%20movieLength%20similarMovies%20ageRating&token=${apiKey}`
      );
      setFilms(result.data.docs);
    } catch (err) {
      console.log(err);
    }
  }
  };

  useEffect(() => {
    getFilmIs();
    // console.log(user);
  }, []);

  const removeMovie = (id: string) =>{
    dispatch(addUnLiked({id: user.id, filmId: id}))
    console.log('userpage:', {id: user.id, filmId: id})
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
      console.log(err);
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
      <div className={styles.userpage__container}>
        <DefaultBtn title="Выйти из аккаунта" maxWidth='300px' marginBottom='50px' onClick={postLogout}/>
        {films.length > 0 
        ?
        <div className={styles.userpage__films}>
          {
            films?.map((item)=>{
              return(
                <div className={styles.userpage__film}>
                  <NavLink to={`/movie/${item?.id}`} className={user?.theme === 'light' ? 'link-class-black' : 'link-class'}>
                  <div className={styles.userpage__film__info}>
                    <div className={styles.userpage__film__img}>
                      <img src={item?.poster.url} alt={item?.name} />
                    </div>
                    <div className={styles.userpage__film__text}>
                      <h1>{item?.name}</h1>
                      {item?.rating?.kp && <p>{item?.rating?.kp?.toFixed(1)}</p>}
                    </div>
                  </div>
                  </NavLink>
                  <DefaultBtn title="Удалить" maxWidth='190px' onClick={()=>removeMovie(item.id)} />
                </div>
              )
            })
          }
        </div>
        :
        <p>Нет отложенных фильмов</p>
        }
      </div>
    </div>
  );
}

export default UserPage;
