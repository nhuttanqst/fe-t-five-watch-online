import createInstanceAxios from "./axios.customize";

const axiosUser = createInstanceAxios(import.meta.env.VITE_BACKEND_USER_URL);
const axiosOrder = createInstanceAxios(import.meta.env.VITE_BACKEND_ORDER_URL);

export const registerApi = (data) => {
  return axiosUser.post("/api/auth/register", data);
};

export const loginApi = (data) => {
  return axiosUser.post("/api/auth/login", data);
};

export const logoutApi = () => {
  return axiosUser.post("/api/auth/logout");
};

export const refreshTokenApi = () => {
  return axiosUser.post("/api/auth/refreshToken");
};

export const fetchAccountApi = () => {
  return axiosUser.get("/api/auth/account", {
    headers: {
      delay: 1000,
    },
  });
};

export const createOrderApi = (data) => {
  return axiosOrder.post("/api/orders", data);
};
