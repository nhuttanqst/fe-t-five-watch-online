import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PaymentResult = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          className="flex flex-col items-center justify-center"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            minHeight: "calc(100vh - 300px)",
          }}
        >
          <Result
            status="success"
            title="Đặt hàng thành công!"
            subTitle="Hệ thống đã ghi nhận thông tin đơn hàng của bạn."
            extra={[
              <Button key="home">
                <Link to={"/"} type="primary">
                  Trang Chủ
                </Link>
              </Button>,
              <Button key="history">
                <Link to={"/history"} type="primary">
                  Lịch sử đơn hàng
                </Link>
              </Button>,
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
