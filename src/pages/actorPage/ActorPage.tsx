import styles from "./styles/actorPage.module.sass";
import { NavLink, Params, useParams } from "react-router-dom";
import { api } from "../../axios/axios";
import apiKey from "../../apiKey";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { IActorFullInfo } from "../../interfaces/IActor";
import { setError } from "../../redux/reduser/userSlice";

function ActorPage() {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);


  const params = useParams<Params<string>>();
  const [actorInfo, setActorInfo] = useState<IActorFullInfo>();

  const getInfo = async () => {
    try {
      const result = await api.get(
        `/person?search=${params.id}&field=id&token=${apiKey}`
      );
      setActorInfo(result.data);
      console.log(result)
    } catch (err) {
      dispatch(setError(true))
    }
  };

  useEffect(()=>{
    getInfo()
  },[params.id]); 

  

  return (
    <div className={styles.actorPage} style={user.theme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}>
      <div className={styles.actorPage__flex}>
        <div className={styles.actorPage__left}>
          <div className={styles.actorPage__poster}>
            <img src={actorInfo?.photo} alt={actorInfo?.name}/>
          </div>
        </div>
        <div className={styles.actorPage__right}>
          <div>
            <h1 className={styles.actorPage__title}>{actorInfo?.name}</h1>
            <h2 className={styles.actorPage__subtitle}>{actorInfo?.enName}</h2>
            <div className={styles.actorPage__chars}>
              <span className={styles.actorPage__chars__title}>Деятельность</span>
              <span className={styles.actorPage__chars__value}>
                {actorInfo?.profession?.map((item: any) => {
                  return <span key={item.value}>{item.value}</span>;
                })}
              </span>
              <span className={styles.actorPage__chars__title}>Возраст</span>
              <span className={styles.actorPage__chars__value}>{actorInfo?.age}</span>
              <span className={styles.actorPage__chars__title}>Страна рождения</span>
              <span className={styles.actorPage__chars__value}>
                {actorInfo?.birthPlace?.map((item: any) => {
                  return <span key={item.value}>{item.value}</span>;
                })}
              </span>
              <span className={styles.actorPage__chars__title}>Рост</span>
              <span className={styles.actorPage__chars__value}>{actorInfo?.growth}см</span>
              <span className={styles.actorPage__chars__title}>Bсего картин</span>
              <span className={styles.actorPage__chars__value}>{actorInfo?.movies?.length}</span>
              </div>
          </div>
          
          <div className={styles.actorPage__movies}>
          <h2 className={styles.actorPage__movies__title}>Фильмография</h2>
          <div className={styles.actorPage__movies__list}>
            {actorInfo?.movies?.map((item: any)=>{
              if (item.name && item.rating){
                return(
                  <NavLink key={item.id} to={`/movie/${item.id}`} className={user.theme === 'light' ? 'link-class-black' : 'link-class'}>
                    <div className={styles.actorPage__movie}>
                      <span className={styles.actorPage__movie__name}>{item.name}</span>
                      <span className={styles.actorPage__movie__rating}>{item.rating}</span>
                    </div>
                  </NavLink>
                )
              } else if(item.name){
                return(
                  <NavLink key={item.id} to={`/movie/${item.id}`} className={user.theme === 'light' ? 'link-class-black' : 'link-class'}>
                    <div className={styles.actorPage__movie}>
                      <span className={styles.actorPage__movie__name}>{item.name}</span>
                    </div>
                  </NavLink>
                )
              } else{
                return null
              }
            })}
          </div>
          <span>Ещё фильмы...</span>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ActorPage;
