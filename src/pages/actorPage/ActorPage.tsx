import styles from "./styles/actorPage.module.sass";
import { useParams } from "react-router-dom";
import { api } from "../../axios/axios";
import apiKey from "../../apiKey";
import { useEffect, useState } from "react";
import SimilarMovieSlider from "../../components/common/similarFilmsSlider/SimilarFilmsSlider";


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
            <span className={styles.actorPage__chars__title}>Возраст</span>
            <span className={styles.actorPage__chars__value}>{actorInfo?.age}</span>
            <span className={styles.actorPage__chars__title}>Профессия</span>
            <span className={styles.actorPage__chars__value}>
              {actorInfo?.profession.map((item: any) => {
                return <span key={item.value}>{item.value}~</span>;
              })}</span>
            <span className={styles.actorPage__chars__title}>Страна рождения</span>
            <span className={styles.actorPage__chars__value}>
              {actorInfo?.birthPlace.map((item: any) => {
                return <span key={item.value}>{item.value}</span>;
              })}
            </span>
            <span className={styles.actorPage__chars__title}>Рост</span>
            <span className={styles.actorPage__chars__value}>{actorInfo?.growth}см</span>
          </div>
        </div>
      </div>
          {actorInfo?.movies && actorInfo?.movies.length > 0 &&
            <SimilarMovieSlider movies={actorInfo?.movies} title='Фильмография'/>
          }
    </div>
  );
}

export default ActorPage;
