import axios from "axios";

const URL = `http://${process.env.REACT_APP_HOSTNAME}` || "localhost";
const PORT = `${process.env.REACT_APP_BACKEND_PORT}` || "3001";

const api = axios.create({
  baseURL: `${URL}:${PORT}`,
});

export const executeLogin = async (endpoint, body) => {
  try {
    const result = await api.post(endpoint, body);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (endpoint, body) => {
  try {
    const newUser = await api.post(endpoint, body);
    return newUser.data;
  } catch (err) {
    return err;
  }
};

export const requestGet = async (endpoint) => {
  const data = await api.get(endpoint);
  return data;
};

export const requestPost = async (endpoint, body, token) =>
  api.post(endpoint, body, {
    headers: {
      authorization: token,
    },
  });

export const requestPut = async (endpoint, body, token) =>
  api.put(endpoint, body, {
    headers: {
      authorization: token,
    },
  });

export default api;
