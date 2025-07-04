import axios from "axios";

const baseURL = "https://ainogen.duckdns.org/";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNjIxMDI4LCJpYXQiOjE3NTE2MTgwMjgsImp0aSI6IjhjMmUxMTE2MzFmMjRiM2I4ODA2NDgyODJmMDE3MDA0IiwidXNlcl9pZCI6ImJlNjI3OGI0LWFiNTgtNDExYS05ODY4LTBiYTYyMDdkYzUxMiIsImZ1bGxfbmFtZSI6ImFiZG8gZXNtYWlsIiwiYmlvIjoiIiwiaW1hZ2UiOiJkZWZhdWx0LmpwZyIsInZlcmlmaWVkIjpmYWxzZSwidXNlcm5hbWUiOiJhYmRlcmxhaG1hbiIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZXMuY29tIn0.CeEHbxRoIlf7H6TlBZ4fixY4jUS_2jY-nJRI_ylq2b4";

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
