import axios from "axios";

const baseURL = `http://${import.meta.env.VITE_DATABASE_URL}:${
  import.meta.env.VITE_DATABASE_PORT || 3001
}`;

const api = axios.create({ baseURL });
// todo: tipar
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

export const requestPostPut = async (endpoint, body, token) =>
  api.post(endpoint, body, {
    headers: {
      authorization: token,
    },
  });

export const requestDelete = async (endpoint, token) =>
  api.delete(endpoint, {
    headers: {
      authorization: token,
    },
  });

export default api;
