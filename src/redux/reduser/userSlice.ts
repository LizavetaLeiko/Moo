import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";


// document.cookie = 'theme=dark';
// const cookie = document.cookie.match(/theme=(.*?)(?:;|$)/)?.[1];

interface user {
  id: string,
  theme: string | undefined, 
  likedFilms: Array<string>,
  login: string,
  isActivated: boolean,
  isLoading: boolean,
  isAuth: boolean,
  status: string | null,
  error: boolean,
}

const initialState: user = {
  id: '',
  theme: undefined,
  likedFilms: [],
  login: '',
  isActivated: false,
  isAuth: false,
  status: null,
  error: false,
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
      return responce.data;
    } catch (error: any) {
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
        "/api/unliked",
        {id: payload.id, filmId: payload.filmId}
      );
      return responce.data;
    } catch (error: any) {
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string | undefined>) => {
      document.cookie = `theme=${action.payload}`;
      state.theme = action.payload;
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
    },
    setError: (state, action) =>{
      state.error = action.payload;
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
      state.likedFilms = action.payload.user.likedFilms;
      state.isLoading = false;
    },
    [checkAuth.rejected]: (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
      state.isAuth = false;
    },
    [addLiked.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [addLiked.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.isLoading = false;
      state.likedFilms = action.payload.likedFilms;
    },
    [addLiked.rejected]: (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
      state.error = action.payload;
    },
    [addUnLiked.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [addUnLiked.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.isLoading = false;
      state.likedFilms = action.payload.likedFilms;
    },
    [addUnLiked.rejected]: (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { changeTheme, setIsLoading, setUserInfo, setError} = userSlice.actions;
export default userSlice.reducer;