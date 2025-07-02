import axios from "axios";

const baseURL = "https://ainogen.duckdns.org/";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNDgxNDE0LCJpYXQiOjE3NTE0Nzg0MTQsImp0aSI6ImE0Y2NhMWQxY2U0ZTQ1MTBiZmQ5YzExMzhkNTFiMjEwIiwidXNlcl9pZCI6ImRmMWE1NDlhLWE1OWItNGM3YS1hNTAxLWQzZjUyNTJmNjUzYSIsImZ1bGxfbmFtZSI6ImFiZG8gZXNtYWlsIiwiYmlvIjoiIiwiaW1hZ2UiOiJkZWZhdWx0LmpwZyIsInZlcmlmaWVkIjpmYWxzZSwidXNlcm5hbWUiOiJhYmRlcmxhaG1hbiIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifQ.tx6iCngqECEK8tF11gpih9wyjs7qogUCvQUI5cHjsxI";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
