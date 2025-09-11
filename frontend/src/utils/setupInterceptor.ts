import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axiosInstance from "./useAxios";

interface TokenData {
  accsesToken: string; // Kalau typo, ubah ke accessToken
  refreshToken: string;
  [key: string]: any; // Optional, untuk properti lain jika ada
}

const setupInterceptors = (): void => {
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const tokenString = localStorage.getItem("Token");
      const users: TokenData | null = tokenString ? JSON.parse(tokenString) : null;

      if (users && users.accsesToken) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers["Authorization"] = "Bearer " + users.accsesToken;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError): Promise<any> => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      const tokenString = localStorage.getItem("Token");
      const users: TokenData | null = tokenString ? JSON.parse(tokenString) : null;

      const status = error.response ? error.response.status : null;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axiosInstance.post("/refreshToken", {
            refreshToken: users?.refreshToken,
          });

          if (response.status === 200) {
            localStorage.setItem("Token", JSON.stringify(response.data));

            const updatedTokenString = localStorage.getItem("Token");
            const updatedUsers: TokenData | null = updatedTokenString
              ? JSON.parse(updatedTokenString)
              : null;

            if (updatedUsers?.accsesToken) {
              axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + updatedUsers.accsesToken;
            }
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
