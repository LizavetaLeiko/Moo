import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import MoviePage from "./pages/moviePage/MoviePage";
import ActorPage from "./pages/actorPage/ActorPage";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NotFound from "./pages/notFound/NotFound";
import UserPage from "./pages/userPage/UserPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/reduser/userSlice";
import { useAppSelector } from "./redux/reduxHook";
import { Triangle } from "react-loader-spinner";
import PopUp from "./components/pop-up/PopUp";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const user = useAppSelector((state) =>state.user);

  return (
    <div className="App">
      <Header />
      {user.isLoading ?
      <div className="loader__wrap">
        <Triangle
        height="80"
        width="80"
        color="#D200A4"
        ariaLabel="triangle-loading"
        visible={true}
        />
      </div>
      :
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/actor/:id" element={<ActorPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      }
      {
        user.error 
        &&
        <PopUp title="Произошла ошибка" text="Извините, произошла ошибка запроса"/>
      }
    </div>
  );
}
export default App;
