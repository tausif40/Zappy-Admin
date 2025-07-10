import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => { return response },
  (error) => {
    // const { toast } = useToast();
    console.log("apiClient error - ", error);
    // if (error?.response?.status === 401) {
    //   window.location.href = "/";
    // }


    // Show toast on network error (no response from server)
    if (!error.response) {
      if (!navigator.onLine) {
        console.log("You're offline. Please check your internet connection.");
      } else {
        console.log("Network error. Server may be unreachable.");
      }
    }

    return Promise.reject(error?.response?.data);
  },
);

export default apiClient;
