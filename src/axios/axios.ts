import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.kinopoisk.dev",
});
export const backend = axios.create({
  withCredentials: true,
  baseURL: "https://moo.herokuapp.com",
});

backend.interceptors.request.use((config : any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

backend.interceptors.response.use((config) => {
  return config;
},async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry ) {
      originalRequest._isRetry = true;
      try {
          const response = await axios.get<any>(`https://moo.herokuapp.com/api/refresh`, {withCredentials: true})
          localStorage.setItem('token', response.data.accessToken);
          return backend.request(originalRequest);
      } catch (e) {
        console.log(e)
      }
  }
  throw error;
}) 