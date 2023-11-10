import axios, { Axios, AxiosError } from "axios";

const baseURL = `http://${import.meta.env.VITE_DATABASE_URL}:${
  import.meta.env.VITE_DATABASE_PORT || 3001
}`;

const api: Axios = axios.create({ baseURL });
// todo: tipar
export const executeLogin = async <T>(endpoint: string, body: T) => {
  try {
    const result = await api.post(endpoint, body);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async <T>(endpoint: string, body: T) => {
  try {
    const newUser = await api.post(endpoint, body);
    return newUser.data;
  } catch (err) {
    return err;
  }
};

export const requestGet = async (endpoint: string) => {
  const data = await api.get(endpoint);
  return data;
};

export const requestPostPut = async <T>(
  endpoint: string,
  body: T,
  token: string,
  operation: Extract<keyof Axios, "post" | "put">
) =>
  api[operation](endpoint, body, {
    headers: {
      authorization: token,
    },
  });

export const requestDelete = async (endpoint: string, token: string) =>
  api.delete(endpoint, {
    headers: {
      authorization: token,
    },
  });

export default api;
