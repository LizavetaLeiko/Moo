import { Dispatch, SetStateAction } from "react";
import { IFilmObj} from '../../../interfaces/filmObj';

interface IFilter{
  filtered: boolean,
  setFiltered: Dispatch<SetStateAction<boolean>>,
  filteredFilms: Array<any>,
  setFilteredFilms: Dispatch<SetStateAction<Array<IFilmObj>>>,
  limit: number,
}

export default IFilter;