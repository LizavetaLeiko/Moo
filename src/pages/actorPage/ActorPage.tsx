import styles from "./styles/actorPage.module.sass";
import { NavLink, useParams } from "react-router-dom";
import { api } from "../../axios/axios";
import apiKey from "../../apiKey";
import { useEffect, useState } from "react";


function ActorPage() {

  const params = useParams<any>();
  const [actorInfo, setActorInfo] = useState<any>();

  const getInfo = async () => {
    try {
      const result = await api.get(
        `/person?search=${params.id}&field=id&token=${apiKey}`
      );
      setActorInfo(result.data);
      console.log(result)
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(()=>{
    getInfo()
  },[params.id]); 

  

  return (
    <div className={styles.actorPage}>
      <div className={styles.actorPage__flex}>
        <div className={styles.actorPage__left}>
          <div className={styles.actorPage__poster}>
            <img src={actorInfo?.photo} alt={actorInfo?.name}/>
          </div>
        </div>
        <div className={styles.actorPage__right}>
          <h1 className={styles.actorPage__title}>{actorInfo?.name}</h1>
          <h2 className={styles.actorPage__subtitle}>{actorInfo?.enName}</h2>
          <div className={styles.actorPage__chars}>
            <span className={styles.actorPage__chars__title}>Деятельность</span>
            <span className={styles.actorPage__chars__value}>
              {actorInfo?.profession.map((item: any) => {
                return <span key={item.value}>{item.value}</span>;
              })}
            </span>
            <span className={styles.actorPage__chars__title}>Возраст</span>
            <span className={styles.actorPage__chars__value}>{actorInfo?.age}</span>
            <span className={styles.actorPage__chars__title}>Страна рождения</span>
            <span className={styles.actorPage__chars__value}>
              {actorInfo?.birthPlace.map((item: any) => {
                return <span key={item.value}>{item.value}</span>;
              })}
            </span>
            <span className={styles.actorPage__chars__title}>Рост</span>
            <span className={styles.actorPage__chars__value}>{actorInfo?.growth}см</span>
            <span className={styles.actorPage__chars__title}>Bсего картин</span>
            <span className={styles.actorPage__chars__value}>{actorInfo?.movies.length}</span>
          </div>
          <div className={styles.actorPage__movies}>
          <h2 className={styles.actorPage__movies__title}>Фильмография</h2>
          <div className={styles.actorPage__movies__list}>
            {actorInfo?.movies.map((item: any)=>{
              if (item.name && item.rating){
                return(
                  <NavLink to={`/movie/${item.id}`} className='link-class'>
                    <div className={styles.actorPage__movie}>
                      <span className={styles.actorPage__movie__name}>{item.name}</span>
                      <span className={styles.actorPage__movie__rating}>{item.rating}</span>
                    </div>
                  </NavLink>
                )
              } else if(item.name){
                return(
                  <NavLink to={`/movie/${item.id}`} className='link-class'>
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
