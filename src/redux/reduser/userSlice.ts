import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface user {
  id: number,
  userName: string,
  theme: string,
  likedFilms: Array<string>,
  login: string,
}

const initialState: user = {
  id: 1,
  userName: 'user',
  theme: 'dark',
  likedFilms: [],
  login: 'lizaleiko3@gmail.com',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    addLikedFilms(state, action) {
      state.likedFilms.push(action.payload.likedFilm);
    },
    setEmail(state, action) {
      state.login = action.payload.email;
    },
  },
});

export const { addName, changeTheme, addLikedFilms, setEmail} = userSlice.actions;
export default userSlice.reducer;