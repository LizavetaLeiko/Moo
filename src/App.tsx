import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import MoviePage from './pages/moviePage/MoviePage';
import ActorPage from './pages/actorPage/ActorPage';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movie/:id" element={<MoviePage/>} />
        <Route path="/actor/:id" element={<ActorPage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}
export default App;
