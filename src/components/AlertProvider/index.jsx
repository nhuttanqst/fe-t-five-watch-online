import { useCurrentApp } from "../../context/app.context";

const AlertProvider = (props) => {
  const { contextHolder, contextNotifiHolder } = useCurrentApp();

  return (
    <>
      {contextHolder}
      {contextNotifiHolder}
      {props.children}
    </>
  );
};

export default AlertProvider;
