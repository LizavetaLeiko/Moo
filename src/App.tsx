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
import { changeTheme, checkAuth } from "./redux/reduser/userSlice";
import { useAppSelector } from "./redux/reduxHook";
import { Triangle } from "react-loader-spinner";
import RequireAuth from "./castomHooks/requireAuth/RequireAuth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(document.cookie.match(/theme=(.*?)(?:;|$)/)?.[1]){
      dispatch(changeTheme(document.cookie.match(/theme=(.*?)(?:;|$)/)?.[1]))
    } else {
      dispatch(changeTheme('dark'))
    }
  }, []);

  useEffect(() => {
    dispatch(checkAuth());
  }, [])

  const user = useAppSelector((state) =>state.user);

  return (
    <div className="App" style={user.theme === 'light' ? {backgroundColor: '#fff', color: '#000'} : {backgroundColor: '#000', color: '#fff'}}>
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
        <Route path="/user/:id" element={<RequireAuth><UserPage /></RequireAuth>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      }
    </div>
  );
}
export default App;
