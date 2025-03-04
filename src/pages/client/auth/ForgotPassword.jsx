import { Button, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="forgot-page">
        <div className="container">
          <div className="forgot-form">
            <h2 className="text-center font-semibold text-xl">QUÊN MẬT KHẨU</h2>
            <Divider />
            <Form form={form} layout="vertical">
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="flex justify-end items-center">
                <Button
                  style={{ width: "90px", backgroundColor: "#9F1D25" }}
                  type="primary"
                >
                  Gửi mã
                </Button>
              </div>

              <Form.Item
                label="Nhập mã"
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
              >
                <Input.Password autoComplete="" />
              </Form.Item>

              <Form.Item className="flex justify-center" label={null}>
                <Button
                  style={{ width: "124px", backgroundColor: "#9F1D25" }}
                  type="primary"
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>

            <Divider>Or</Divider>
            <Link className="text-link text-center" to={"/login"}>
              <span className="block text-[#9F1D25] text-center">Quay lại</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
