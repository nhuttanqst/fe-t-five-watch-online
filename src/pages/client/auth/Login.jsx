import { Link } from "react-router-dom";
import { Button, Divider, Form, Input } from "antd";
import "./Login.css";

const LoginPage = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="login-page">
        <div className="container">
          <div className="login-form">
            <h2 className="font-semibold uppercase text-center text-xl">
              Đăng Nhập
            </h2>
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

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password autoComplete="" />
              </Form.Item>

              <div className="flex justify-between items-center">
                <Form.Item label={null}>
                  <Button
                    style={{ backgroundColor: "#A51717", color: "#fff" }}
                    type="default"
                    htmlType="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>

                <span className="cursor-pointer">
                  <Link to="/forgot-password">
                    <span className="text-black hover:underline">
                      Quên mật khẩu?
                    </span>
                  </Link>
                </span>
              </div>
            </Form>

            <Divider>Or</Divider>
            <p className="question">
              Chưa có tài khoản ? &nbsp;
              <span>
                <Link className="text-link" to={"/register"}>
                  <span className="text-[#A51717]">Đăng Ký</span>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
