import { createContext, useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const CurrentAppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [dataViewDetail, setDataViewDetail] = useState({});

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
