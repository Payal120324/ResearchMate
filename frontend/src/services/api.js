import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

let currentUserId = null;


export const setUserId = (userId) => {
  // currentUserId = userId; // removed unused var
  if (userId) {
    API.defaults.headers.common['X-User-ID'] = userId;
  } else {
    delete API.defaults.headers.common['X-User-ID'];
  }
};

export const recommend = async (query) => {
  const response = await API.post('/recommend', { query });
  return response.data.recommendations;
};

export default API;
