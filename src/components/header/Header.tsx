import { NavLink } from "react-router-dom";
import styles from "./styles/header.module.sass";
import searchIcon from "../../assets/icons/search.svg";
import logo from "../../assets/icons/moo.svg";
import userImg from "../../assets/icons/userLogo.svg";
import toggleTheme from "../../assets/icons/toggleTheme.svg";
import { useEffect, useState } from "react";
import { api } from "../../axios/axios";
import apiKey from "../../apiKey";
import useOutsideClick from "../../castomHooks/clickOutside/useOutsideClick";
import { changeTheme, setError } from "../../redux/reduser/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { IShortFilmObj } from "../../interfaces/filmObj";

function Header() {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const [searchedList, setSearchedList] = useState<Array<IShortFilmObj>>([]);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleToggleTheme = () => {
    if (user.theme === "dark") {
      dispatch(changeTheme("light"));
    } else {
      dispatch(changeTheme("dark"));
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const ref: any = useOutsideClick({ setSearch });

  const handleSearchVisible = () => {
    setSearchVisible(!searchVisible);
    searchedList && setSearch(undefined);
  };

  useEffect(() => {
    const handleSearchedList = async () => {
      try {
        const result = await api.get(
          `/movie?field=name&search=${search}&limit=40&sortField=rating.kp&sortType=-1&&selectFields=year%20name%20id%20poster%20rating%20&token=${apiKey}`
        );
        setSearchedList(result.data.docs);
      } catch (err) {
        dispatch(setError(true));
      }
    };
    handleSearchedList();
  }, [search]);

  return (
    <div className={styles.header} >
      <div className={styles.header__container}>
        <NavLink to="/" className="link-class">
          <div
            className={
              searchVisible
                ? `${styles.header__logo} ${styles.header__none}`
                : styles.header__logo
            }
          >
            <img src={logo} alt="Logo moo" />
          </div>
        </NavLink>
        <div className={styles.header__search}>
          <div
            className={
              searchVisible
                ? styles.header__search__input
                : `${styles.header__search__input} ${styles.header__none}`
            }
          >
            <input
              onChange={handleChangeSearch}
              type="text"
              placeholder="введите название фильма или сериала"
            />
            {searchedList && (
              <ul ref={ref}>
                {searchedList?.map((item: IShortFilmObj) => {
                  return (
                    <NavLink className="link-class" to={`/movie/${item.id}`}>
                      <li
                        className={styles.header__search__li}
                        onClick={() => setSearch(undefined)}
                      >
                        <div>
                          <span className={styles.header__search__li__name}>
                            {item.name}
                          </span>
                          <span
                            className={styles.header__search__li__year}
                          >{`(${item.year})`}</span>
                        </div>
                        <span className={styles.header__search__li__rating}>
                          {item.rating?.kp !== 0
                            ? `${item?.rating?.kp.toFixed(1)}`
                            : "?"}
                        </span>
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            )}
          </div>
          <button
            className={styles.header__search__btn}
            onClick={handleSearchVisible}
          >
            <img src={searchIcon} alt="search" />
          </button>
        </div>
        <div
          className={
            searchVisible
              ? `${styles.header__flex} ${styles.header__none}`
              : styles.header__flex
          }
        >
          <button className={styles.header__theme} onClick={handleToggleTheme}>
            <img src={toggleTheme} alt="change theme" />
          </button>
          { user.isActivated && user.isAuth 
            ?
            <NavLink to={`/user/${user.id}`} className="link-class">
            <div className={styles.header__user}>
              <div className={styles.header__user__img}>
                <img src={userImg} alt={user.login} />
              </div>
              <span className={styles.header__user__name}>{user.login.split('@')[0]}</span>
            </div>
            </NavLink>
            :
            <NavLink to="/signin" className="link-class">
            <div className={styles.header__user}>
              <div className={styles.header__user__img}>
                <img src={userImg} alt="user" />
              </div>
              <span className={styles.header__user__name}>Войти</span>
            </div>
            </NavLink>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
