import "./styles/actorsSlider.css";
import styles from "./styles/actorsSlider.module.sass";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActorCard from "../actorCard/ActorCard";
import ArrowNext from "./arrows/ArrowNext";
import ArrowPrev from "./arrows/ArrowPrev";
import { useEffect, useState } from "react";
import IActor from "../../../interfaces/IActor";

interface IActorsSlider{
  persons: Array<IActor>
  title: string,
}

function ActorsSlider(props: IActorsSlider) {

  const [actors, setActors] = useState<Array<IActor>>();

  useEffect(()=>{
    setActors(props.persons.filter(item => item.profession === "актеры" && item.name));
  },[])

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    nextArrow: <ArrowNext/>,
    prevArrow: <ArrowPrev />,
    className: "slider",
  };

  return (
    <div className={styles.slider_wrap}>
    <h1 className={styles.title}>{props.title}</h1>
      <Slider {...settings}>
        {actors?.map((item: IActor ) => {
          return (
            <ActorCard
              photo={item.photo}
              name={item.name}
              key={item.id}
              id={item.id}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default ActorsSlider;
