import { Button, Divider, Form, Input } from "antd";
import "./UpdateNewPassword.css";

const UpdateNewPasswordPage = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="update-page">
        <div className="container">
          <div className="update-form">
            <h2 className="text-center font-semibold text-xl">
              CẬP NHẬT MẬT KHẨU
            </h2>
            <Divider />
            <Form form={form} layout="vertical">
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                ]}
              >
                <Input.Password />
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
                style={{ display: "flex", justifyContent: "center" }}
                label={null}
              >
                <Button
                  className="hover:bg-[#C40D2E] hover:text-white"
                  style={{ width: "124px", backgroundColor: "#9F1D25" }}
                  type="primary"
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateNewPasswordPage;
