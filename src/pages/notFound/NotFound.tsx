import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHook";
import styles from './styles/notFound.module.sass';


function NotFound() {

  const currentTheme = useAppSelector((state) => state.user.theme);

  return(
    <div className={styles.notFound} style={currentTheme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}>
      <div className={styles.notFound__container}>
        <h1>404</h1>
        <p className={styles.notFound__text}>Страница не найдена</p>
        <p className={styles.notFound__link}><NavLink to={'/'} className={currentTheme === 'light' ? 'link-class-black' : 'link-class'}>Перейти на главную</NavLink></p>
      </div>
    </div>
  )
}

export default NotFound;