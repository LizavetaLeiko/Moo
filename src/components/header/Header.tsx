import { NavLink } from "react-router-dom";
import styles from './styles/header.module.sass'
import search from "../../assets/icons/search.svg";
import logo from "../../assets/icons/moo.svg";
import user from "../../assets/icons/userLogo.svg";
import toggleTheme from "../../assets/icons/toggleTheme.svg";
import { useState } from "react";

function Header() {

  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <NavLink to='/'>
          <div className={searchVisible ? `${styles.header__logo} ${styles.header__none}` : styles.header__logo}>
            <img src={logo} alt="Logo moo" />
          </div>
        </NavLink>
        <div className={styles.header__search}>
          <input className={searchVisible ? styles.header__search__input : `${styles.header__search__input} ${styles.header__none}`} type="text" />
          <button className={styles.header__search__btn}  onClick={()=>setSearchVisible(!searchVisible)}>
            <img src={search} alt="search" />
          </button>
        </div>
        <div className={searchVisible ? `${styles.header__flex} ${styles.header__none}` : styles.header__flex}>
          <div className={styles.header__theme}>
            <img src={toggleTheme} alt="change theme" />
          </div>
          <NavLink to='/signin'>
            <div className={styles.header__user}>
              <div className={styles.header__user__img}>
                <img src={user} alt="user" />
              </div>
              <span className={styles.header__user__name}>Войти</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;