import styles from "./styles/popup.module.sass";
import cross from '../../assets/icons/cross.svg';
import { useState } from "react";

interface IPopUp{
  title: string,
  text: string,
  onChangeBoolState?: any,
}

function PopUp(props: IPopUp) {

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClick = () =>{
    setIsOpen(false)
  }
  const handleClickWithProps = (func: any) =>{
    setIsOpen(false);
    func(false);
  }

  return (
    <div className={isOpen ? styles.popup : styles.none}> 
      <div className={styles.popup__container}>
        <button className={styles.popup__close} onClick={() => props.onChangeBoolState ?  handleClickWithProps(props.onChangeBoolState) : handleClick()}>
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