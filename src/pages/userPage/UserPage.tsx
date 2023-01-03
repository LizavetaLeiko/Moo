import styles from './styles/userPage.module.sass';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import apiKey from "../../apiKey";
import { api } from "../../axios/axios";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import { IFilmObj } from "../../interfaces/filmObj";
import { useAppSelector } from "../../redux/reduxHook";

function UserPage() {

  const [films, setFilms] = useState<Array<IFilmObj>>();

  const user = useAppSelector((state) => state.user);

  const getFilmIs = async () => {
    try {
      const result = await api.get(
        `/movie?${user.likedFilms.map((item) =>`&search=${item}&field=id`)}&sortField=year&selectFields=genres%20videos.trailers%20year%20name%20description%20ageRating%20id%20poster%20rating%20&sortType=-1&sortField=votes.imdb&sortType=-1&token=${apiKey}`
      );
      console.log('user page:', user.likedFilms, result.data.docs)
      setFilms(result.data.docs);
    } catch (err) {
      console.log(err);
      console.log('err user:', user.likedFilms)
    }
  };

  useEffect(()=>{
    getFilmIs();
  }, [])

  return (
    <div className={styles.userpage} style={user?.theme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}> 
      <div className={styles.userpage__container}>
        <DefaultBtn title="Выйти из аккаунта"/>
        <div className={styles.userpage__films}>
          {/* {
            films?.map((item)=>{
              return(
                <NavLink to={`user/${item.id}`} className="link-class">
                <div className={styles.userpage__film}>
                  <div className={styles.userpage__film__info}>
                    <div className={styles.userpage__film__img}>
                      <img src={item.poster.url} alt={item.name} />
                    </div>
                    <div className={styles.userpage__film__text}>
                      <h1>{item.name}</h1>
                      {item.rating.kp && <p>{item.rating.kp}</p>}
                    </div>
                  </div>
                  <DefaultBtn title="Удалить"/>
                </div>
                </NavLink>
              )
            })
          } */}
        </div>
      </div>
    </div>
  );
}

export default UserPage;