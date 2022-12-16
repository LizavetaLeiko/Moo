interface ISimilarMovie{
  _id?: string,
  id: number,
  name: string,
  enName?: string,
  alternativeName?: string,
  poster?: {
      _id: string,
      url: string,
      previewUrl: string
  },
  rating?: number,
  general?: boolean,
  description?: string,
}

export default ISimilarMovie;
