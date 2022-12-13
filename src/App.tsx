import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import MoviePage from './pages/moviePage/MoviePage';
import ActorPage from './pages/actorPage/ActorPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movie/:id" element={<MoviePage/>} />
        <Route path="/actor/:id" element={<ActorPage/>} />
      </Routes>
    </div>
  );
}
export default App;
