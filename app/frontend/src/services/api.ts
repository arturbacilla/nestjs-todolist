import axios, { Axios } from "axios";

const baseURL = `http://${import.meta.env.VITE_DATABASE_URL}:${
  import.meta.env.VITE_DATABASE_PORT || 3001
}`;

const api: Axios = axios.create({ baseURL });

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
