import styles from "./styles/popup.module.sass";
import cross from '../../assets/icons/cross.svg';
import { useState } from "react";

interface IPopUp{
  title: string,
  text: string,
}

function PopUp(props: IPopUp) {

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className={isOpen ? styles.popup : styles.none}> 
      <div className={styles.popup__container}>
        <button className={styles.popup__close} onClick={()=>setIsOpen(false)}>
        <img src={cross} alt="закрыть"/>
      </button>
      <div className={styles.popup__content}>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
      </div>
      </div>
    </div>
  );
}

export default PopUp;