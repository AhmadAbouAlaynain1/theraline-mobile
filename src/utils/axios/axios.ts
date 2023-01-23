import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "../../hooks/stores/useAuthStore";

let access = useAuthStore.getState().accessToken;
let refresh = useAuthStore.getState().refreshToken;
const setAccessToken = useAuthStore.getState().setAccessToken;

const baseURL = "http://localhost:5000";

const refreshToken = async () => {
  try {
    const res = await refreshClient.post("/api/refresh_token");
    return res.data.access_token;
  } catch (err) {
    throw err;
  }
};

const refreshClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().refreshToken}`,
  },
});

export const accessClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

accessClient.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    if (useAuthStore.getState().accessToken) {
      config.headers.Authorization = `Bearer ${
        useAuthStore.getState().accessToken
      }`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;
    if (status === 401 && refresh) {
      try {
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken);
        const config = error.config;
        config.headers.common.Authorization = `Bearer ${newAccessToken}`;
        return axios(config);
      } catch (err) {
        throw err;
      }
    }

    return Promise.reject(error);
  }
);