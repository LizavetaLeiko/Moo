import { useState } from "react";
import { NavLink } from "react-router-dom";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import Input from "../../components/common/inputs/Input";
import styles from "./styles/signIn.module.sass";

function SignIn() {

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

  return (
    <div className={styles.container}>
      <div className={styles.signIn}>
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
          onClick=''
          maxWidth='100%'
          marginBottom="35px"
          padding="18px"
        />
        <span className={styles.signIn__question}>Нет аккаунта? <NavLink className='link-class-dark' to='/signup'>Зарегестрироваться</NavLink></span>
      </div>
    </div>
  );
}

export default SignIn;
