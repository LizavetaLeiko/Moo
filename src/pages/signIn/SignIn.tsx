import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { backend } from "../../axios/axios";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import Input from "../../components/common/inputs/Input";
import { setUserInfo } from "../../redux/reduser/userSlice";
import { useAppSelector } from "../../redux/reduxHook";
import styles from "./styles/signIn.module.sass";

function SignIn() {

  const currentTheme = useAppSelector((state) => state.user.theme);

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visability, setVisability] = useState<boolean>(false);

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setLogin(event.target.value)
  }
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setPassword(event.target.value)
  }

  const toggleVisability = (event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    setVisability(!visability)
  }

  const dispatch = useDispatch()

  const postLogin = async () =>{
    try {
      const responce = await backend.post('/api/login', {email: login, password: password});
      setLogin('');
      setPassword('');
      dispatch(setUserInfo(responce.data.user));
      localStorage.setItem('token', responce.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container} style={currentTheme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}>
      <div className={styles.signIn} >
        <h1 className={styles.signIn__title}>Войти</h1>
        <form action="SignIn" className={styles.signIn__form}>
          <Input 
            stateName={login}
            placeholder='введите логин'
            onChange={handleChangeLogin}
            label="Логин"
          />
          <Input 
            stateName={password}
            placeholder='введите пароль'
            onChange={handleChangePassword}
            label="Пароль"
            eye={true}
            visability={visability}
            setVisability={toggleVisability}
            type='password'
          />
        </form>
        <DefaultBtn
          title='Войти'
          maxWidth='100%'
          marginBottom="35px"
          padding="18px"
          onClick={postLogin}
        />
        <span className={styles.signIn__question}>Нет аккаунта? <NavLink className='link-class-dark' to='/signup'>Зарегестрироваться</NavLink></span>
      </div>
    </div>
  );
}

export default SignIn;
