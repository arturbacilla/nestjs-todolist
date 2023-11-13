import axios, { Axios } from "axios";

const baseURL = `http://${import.meta.env.VITE_DATABASE_URL}:${
  import.meta.env.VITE_DATABASE_PORT || 3001
}`;

const api: Axios = axios.create({ baseURL });

export const requestGet = async (endpoint: string, token?: string) => {
  let config = undefined;
  if (token) {
    config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  const data = await api.get(endpoint, config);
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
      Authorization: `Bearer ${token}`,
    },
  });

export const requestDelete = async (endpoint: string, token: string) =>
  api.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default api;
