import axios, { AxiosError, AxiosInstance } from "axios";

const determineBaseUrl = () => {
  if (import.meta.env.mode === "production") {
    return "https://a7fsbruh2s3bnibjx6jgb2tvsy0jvlsk.lambda-url.ap-northeast-1.on.aws";
  } else if (import.meta.env.MODE === "development") {
    // Development URL; adjust as needed test-api
    return "http://localhost:8001";
  }

  return "https://a7fsbruh2s3bnibjx6jgb2tvsy0jvlsk.lambda-url.ap-northeast-1.on.aws";
};

export const baseUrl = determineBaseUrl();

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  // ... other settings (like headers, timeout, etc.)
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    // Ensuring config and config.url exist, then replacing http with https
    config.url = config.url && config.url.replace(/^http:/, "https:");
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Exporting the configured Axios instance
export { instance as axiosInstance };
