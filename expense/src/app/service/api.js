import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem("Auth");
  const parseData=JSON.parse(data)
  if (parseData) {
    config.headers.Authorization = `Bearer ${parseData?.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const data = localStorage.getItem("Auth");
      if (data) {
        debugger
        const parseData = JSON.parse(data);
        try {
          const res = await axios.post("http://localhost:4200/api/auth/refresh", {
            refreshToken: parseData.refreshToken
          });
          const data=res?.data?.data
          console.log("data ",data);
          
          parseData.token = data.accessToken;
          localStorage.setItem("Auth", JSON.stringify(parseData));
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("Auth");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  })

export default api;
