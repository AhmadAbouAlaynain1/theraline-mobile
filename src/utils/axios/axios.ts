import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "../../hooks/stores/useAuthStore";

const { setAccessToken } = useAuthStore.getState();
const { setIsAuthenticated } = useAuthStore.getState();

export const baseURL = "https://theraline.onrender.com";

const refreshClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().refreshToken}`,
  },
});

export const refreshToken = async () => {
  const res = await refreshClient.post("/auth/refresh");
  return res.data.access_token;
};

export const accessClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

accessClient.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    const newConfig = config;
    if (useAuthStore.getState().accessToken) {
      newConfig.headers.Authorization = `Bearer ${
        useAuthStore.getState().accessToken
      }`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;
    if (status === 401 && useAuthStore.getState().refreshToken) {
      try {
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken);
        const { config } = error;
        config.headers.common.Authorization = `Bearer ${newAccessToken}`;
        return await axios(config);
      } catch (err) {
        setIsAuthenticated(false);
        throw err;
      }
    }

    return Promise.reject(error);
  },
);
