import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DefaultBtn from "../../components/common/defualtBtn/DefaultBtn";
import Input from "../../components/common/inputs/Input";
import { useAppSelector } from "../../redux/reduxHook";
import styles from "./styles/signUp.module.sass";

function SignUp() {

  const currentTheme = useAppSelector((state) => state.user.theme);


  const [visability, setVisability] = useState<boolean>(false);
  const [visability2, setVisability2] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');

  const [firstPassword, setFirstPassword] = useState<string>("");
  const [firstPasswordError, setFirstPasswordError] = useState<boolean>(false);

  const[secondPassword, setSecondPassword] = useState<string>("");
  const[passwordMatches, setPasswordMatches] = useState<boolean>(false);

  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    if ( firstPasswordError || passwordMatches || !name || !login) {
      setFormValid(false);
    } else if (!firstPasswordError && !passwordMatches ) {
      setFormValid(true);
    }
  }, [firstPasswordError, passwordMatches, name, login]);

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setLogin(event.target.value)
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setName(event.target.value)
  }

  const regularExpressionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const handleChangeFirstPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstPassword(() => event.target.value);
    if (event.target.value.match(regularExpressionPassword)) {
      setFirstPasswordError(false);
    } else {
      setFirstPasswordError(true);
    }
  };

  const handleChangeSecondPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(() => event.target.value);
    if(firstPassword === event.target.value){
      setPasswordMatches(false);
    } else{
      setPasswordMatches(true);
    }
  };

  const toggleVisability = (event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    setVisability(!visability)
  }

  const toggleVisability2 = (event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    setVisability2(!visability2)
  }

  return (
    <div className={styles.container} style={currentTheme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}>
    <div className={styles.signUp}>
      <h1 className={styles.signUp__title}>Зарегестрироваться</h1>
      <form action="SignIn" className={styles.signUp__form}>
        <Input 
          stateName={name}
          placeholder='Никнейм'
          onChange={handleChangeName}
          label="Ваше имя (никнейм)"
        />
        <Input 
          stateName={login}
          placeholder='введите логин'
          onChange={handleChangeLogin}
          label="Электронная почта"
        />
        <Input 
          stateName={firstPassword}
          placeholder='введите пароль'
          onChange={handleChangeFirstPassword}
          label="Придумайте пароль"
          eye={true}
          visability={visability}
          setVisability={toggleVisability}
          type='password'
          error={firstPasswordError}
        />
        <Input 
          stateName={secondPassword}
          placeholder='повторите пароль'
          onChange={handleChangeSecondPassword}
          label="Повторите пароль"
          eye={true}
          visability={visability2}
          setVisability={toggleVisability2}
          type='password'
          error2={passwordMatches}
        />
      </form>
        <DefaultBtn
          title='Зарегестрироваться'
          onClick=''
          maxWidth='100%'
          marginBottom="35px"
          padding="18px"
          disabled={formValid ? false : true}
        />
      <span className={styles.signUp__question}>Уже есть аккаунт? <NavLink className='link-class-dark' to='/signin'>Войти</NavLink></span>
    </div>
  </div>
  );
}

export default SignUp;