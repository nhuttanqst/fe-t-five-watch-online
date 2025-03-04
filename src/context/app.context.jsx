import { createContext, useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const CurrentAppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [dataViewDetail, setDataViewDetail] = useState({});

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
