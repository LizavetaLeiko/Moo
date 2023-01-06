export interface IGenre{
  _id: string,
  name: string
}

export interface ITrailers{
  _id: string,
  url: string,
  name: string,
  site:string
}

export interface ICountries {
      _id: string,
      name: string
    }


export interface IShortFilmObj{
  id: number,
  name: string,
  year: number,
  poster: {
    _id?: string,
    url: string,
    previewUrl?: string
  },
  rating: {
    kp: number,
    imdb?: number,
    filmCritics?: number,
    russianFilmCritics?: number,
    await?: number,
    _id?: string
  },
}

export interface IFilmObj extends IShortFilmObj{
    videos?: {
      trailers: Array<ITrailers>
    },
    _id?: string,
    description?: string,
    genres?: Array<IGenre>,
    ageRating?: null | string
}

