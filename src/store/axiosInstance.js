import axios from "axios";

const baseURL = "https://ainogen.duckdns.org/";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNjE0NzE0LCJpYXQiOjE3NTE2MTE3MTQsImp0aSI6IjgzN2Y5YjY4N2E2YTQzMjM4NmNkZjY5YjEwOWQxNzYwIiwidXNlcl9pZCI6ImJlNjI3OGI0LWFiNTgtNDExYS05ODY4LTBiYTYyMDdkYzUxMiIsImZ1bGxfbmFtZSI6ImFiZG8gZXNtYWlsIiwiYmlvIjoiIiwiaW1hZ2UiOiJkZWZhdWx0LmpwZyIsInZlcmlmaWVkIjpmYWxzZSwidXNlcm5hbWUiOiJhYmRlcmxhaG1hbiIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZXMuY29tIn0.g59k-7OQdD2mFt2ATdsFAECyxJMsJyBjt6XQIMpkTwU";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
