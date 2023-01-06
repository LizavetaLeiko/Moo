import "./styles/actorsSlider.css";
import styles from "./styles/actorsSlider.module.sass";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActorCard from "../actorCard/ActorCard";
import ArrowNext from "./arrows/ArrowNext";
import ArrowPrev from "./arrows/ArrowPrev";
import { useEffect, useState } from "react";
import {IActor} from "../../../interfaces/IActor";

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
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        }
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
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
