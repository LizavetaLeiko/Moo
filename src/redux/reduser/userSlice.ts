import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";

document.cookie = 'theme=dark';
const cookie = document.cookie.match(/theme=(.*?)(?:;|$)/)?.[1];

interface user {
  id: string,
  theme: string | undefined,
  likedFilms: Array<string>,
  login: string,
  isActivated: boolean,
  isLoading: boolean,
  isAuth: boolean,
  status: string | null,
  error: string | null,
}

const initialState: user = {
  id: '234',
  theme: cookie,
  likedFilms: [],
  login: '',
  isActivated: false,
  isAuth: false,
  status: null,
  error: null,
  isLoading: false,
};


export const checkAuth: any = createAsyncThunk(
  "/refresh",
  async function (action, { rejectWithValue }) {
    try {
      const responce = await backend.get(
        "/api/refresh"
      );
      localStorage.setItem('token', responce.data.accessToken);
      // console.log(responce.data)
      return responce.data;
    } catch (error: any) {
      // console.log(error.message)
      return rejectWithValue(error.message);
    }
  }
);

export const addLiked: any = createAsyncThunk(
  "/liked",
  async function (payload: any) {
    try {
      const responce = await backend.patch(
        "/api/liked",
        {id: payload.id, filmId: payload.filmId}
      );
      // console.log(responce.data)
      return responce.data;
    } catch (error: any) {
      return error.message;
    }
  }
);
export const addUnLiked: any = createAsyncThunk(
  "/api/unliked",
  async function (payload: any) {
    try {
      const responce = await backend.patch(
        "/unliked",
        {id: payload.id, filmId: payload.filmId}
      );
      return responce.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      document.cookie = `theme=${action.payload}`;
    },
    setIsLoading: (state, action: PayloadAction<boolean>)=>{
      state.isLoading = action.payload
    },
    setUserInfo: (state, action) => {
      state.login = action.payload.email;
      state.id = action.payload.id;
      state.likedFilms = action.payload.likedFilm;
      state.isActivated = action.payload.isActivated;
      state.isAuth = true;
    }
  },
  extraReducers: {
    [checkAuth.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.isAuth = true;
      state.isActivated = action.payload.user.isActivated;
      state.login = action.payload.user.email;
      state.id = action.payload.user.id;
      state.likedFilms = action.payload.user.likedFilm;
    },
    [checkAuth.rejected]: (state, action) => {
      state.status = "rejected";
      state.isAuth = false;
      state.error = action.payload;
    },
    [addLiked.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [addLiked.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.likedFilms = action.payload.likedFilms;
    },
    [addLiked.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [addUnLiked.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [addUnLiked.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.likedFilms = action.payload.likedFilms;
    },
    [addUnLiked.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { changeTheme, setIsLoading, setUserInfo} = userSlice.actions;
export default userSlice.reducer;