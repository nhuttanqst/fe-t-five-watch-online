import { Button, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./Register.css";

const RegisterPage = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="register-page">
        <div className="container">
          <div className="register-form">
            <h2 className="font-semibold text-xl text-center">ĐĂNG KÝ</h2>
            <Divider />
            <Form form={form} layout="vertical">
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password autoComplete="" />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu"
                name="prePassword"
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ]}
              >
                <Input.Password autoComplete="" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                label={null}
              >
                <Button
                  style={{
                    width: "140px",
                    backgroundColor: "#A51717",
                    color: "#fff",
                  }}
                  type="default"
                  htmlType="submit"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>

            <Divider>Or</Divider>
            <p className="question">
              Đã có tài khoản ? &nbsp;
              <span>
                <Link className="text-link" to={"/login"}>
                  <span className="text-[#A51717]">Đăng Nhập</span>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
