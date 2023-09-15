import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/';

// const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
// const currentUser = user && JSON.parse(user).currentUser?.payload;
// const TOKEN = currentUser?.accessToken;

export const generalRequest = axios.create({
  withCredentials: true,
});
// export const userRequest = axios.create({
//   headers: { token: `Bearer ${TOKEN}` },
// });
