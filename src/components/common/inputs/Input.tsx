import styles from "./styles/input.module.sass";
import eye from "../../../assets/icons/eye1.svg";
import IInput from "./intefaces/IInput";
import { v4 as uuidv4 } from 'uuid';


const Input = (props: IInput) => {
  return (
    <div className={styles.input}>
      <label className={styles.input__label} htmlFor={props.stateName}>{props.label}</label>
      <div className={styles.inputAndBtn}>
        <input 
          className={styles.input__input}
          id={uuidv4()}
          type={props.visability ? 'text' : props.type} 
          placeholder={props.placeholder} 
          value={props.stateName}
          onChange={props.onChange}
        />
        {props.eye ? (
          <button className={styles.eye__btn} onClick={props.setVisability}>
            <img src={eye} alt="toggle visability" />
          </button>
        ) : null}
      </div>
      {props.error &&
      <p className={styles.input__error}>Пароль должен содержать минимум 8 символов,<br/> из них 1 цифру и по 1 латинской букве в верхнем и нижнем регистрах</p>
      }
      {props.error2 &&
      <p className={styles.input__error}>Пароли не совпадают</p>
      }
    </div>
  );
};

export default Input;
