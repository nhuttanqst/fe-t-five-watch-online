import { createContext, useContext, useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { message, notification, Spin } from "antd";
import { fetchAccountApi } from "../services/api";

const CurrentAppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, contextNotifiHolder] = notification.useNotification();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setIsAppLoading(false);
          return;
        }

        const res = await fetchAccountApi();

        if (res.data) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.log("error: ", error);
        localStorage.removeItem("accessToken");
      }
      setIsAppLoading(false);
    };

    fetchAccount();
  }, []);

  const toggleFavorite = (product) => {
    setFavorite((prev) => {
      const isFavorite = prev.some((item) => item.id === product.id);
      if (isFavorite) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromFavorite = (productId) => {
    setFavorite((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <>
      {isAppLoading === false ? (
        <CurrentAppContext.Provider
          value={{
            isAppLoading,
            setIsAppLoading,
            carts,
            setCarts,
            dataViewDetail,
            setDataViewDetail,
            favorite,
            setFavorite,
            toggleFavorite,
            removeFromFavorite,
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            messageApi,
            contextHolder,
            notificationApi,
            contextNotifiHolder,
          }}
        >
          {children}
        </CurrentAppContext.Provider>
      ) : (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
    </>
  );
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp must be used within <CurrentAppContext.Provider>"
    );
  }

  return currentAppContext;
};
