// import { NavLink } from "react-router-dom";

import styles from './styles/header.module.sass'
import search from "../../assets/icons/search.svg";
import logo from "../../assets/icons/moo.svg";
import user from "../../assets/icons/userLogo.svg";

function Header() {

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <img src={logo} alt="Logo moo" />
        </div>
        <div className={styles.header__search}>
          <input className={styles.header__search__input} type="text" />
          <button className={styles.header__search__btn}>
            <img src={search} alt="search" />
          </button>
        </div>
        <div className={styles.header__user}>
          <div className={styles.header__user__img}>
            <img src={user} alt="user" />
          </div>
          <span className={styles.header__user__link}>Войти</span>
        </div>
      </div>
    </div>
  );
}

export default Header;