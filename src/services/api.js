import createInstanceAxios from "./axios.customize";

const axiosUser = createInstanceAxios(import.meta.env.VITE_BACKEND_USER_URL);
const axiosOrder = createInstanceAxios(import.meta.env.VITE_BACKEND_ORDER_URL);
const axiosReview = createInstanceAxios(
  import.meta.env.VITE_BACKEND_REVIEW_URL
);

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

export const forgotPasswordApi = (email) => {
  return axiosUser.post("/api/auth/forgotPassword", email);
};

export const verifyOtpApi = ({ email, otp }) => {
  return axiosUser.post("/api/auth/verifyOtp", { email, otp });
};

export const resetPasswordApi = ({ email, matKhau }) => {
  return axiosUser.post("/api/auth/resetPassword", { email, matKhau });
};

export const createOrderApi = (data) => {
  return axiosOrder.post("/api/orders", data);
};

export const updateProfileApi = (data) => {
  return axiosUser.put("/api/users", data);
};

export const changePasswordApi = (data) => {
  return axiosUser.put("/api/users/changePassword", data);
};

export const getOrdersApi = (page = 1, limit = 10) => {
  return axiosOrder.get(`/api/orders?page=${page}&limit=${limit}`);
};

export const fetchReviewsByProduct = (productId) => {
  return axiosReview.get(`/api/reviews/product/${productId}`);
};

export const addReviewApi = (data) => {
  return axiosReview.post("/api/reviews/add", data);
};

export const uploadAvatarApi = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return axiosUser.post("http://localhost:3001/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
