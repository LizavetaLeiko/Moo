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

export interface IFilmObj{
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
    videos: {
        trailers: Array<ITrailers>
    },
    _id: string,
    id: number,
    name: string,
    description: string,
    year: number,
    genres: Array<IGenre>,
    ageRating?: null | string
}

