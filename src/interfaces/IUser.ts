interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  likedFilms: Array<string>
}
export default IUser;