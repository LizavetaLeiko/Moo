import styles from "./styles/homePage.module.sass";
import VideoBanner from "../../components/videoBanner/VideoBanner";
import FilmsSlider from "../../components/common/filmsSlider/FilmsSlider";
import Filter from "../../components/filter/filter";
import { useState } from "react";
import FilteredFilmsList from "../../components/filteredFilmsList/FilteredFilmsList";
import { IFilmObj } from "../../interfaces/filmObj";

function HomePage() {
  const [filtered, setFiltered] = useState<boolean>(false);
  const [filteredFilms, setFilteredFilms] = useState<Array<IFilmObj>>([]);
  const [limit, setLimit] = useState<number>(10);
  
  return (
    <div>
      <div>
        <VideoBanner />
        <div className={styles.content}>
          <div>
            <Filter
              filtered={filtered}
              limit={limit}
              setFiltered={setFiltered}
              filteredFilms={filteredFilms}
              setFilteredFilms={setFilteredFilms}
            />
          </div>
          {/* { filtered ?
            <div>
              <FilteredFilmsList filteredFilms={filteredFilms} setLimit={setLimit} limit={limit} />
            </div> 
            : 
            <div>
              <FilmsSlider title="Новинки мультфильмов" reqCode={3} />
              <FilmsSlider title="Новинки фильмов" reqCode={1} />
              <FilmsSlider title="Новинки сериалов" reqCode={2} />
              <FilmsSlider title="Новинки аниме" reqCode={4} />
            </div>
          }
           */}
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;
