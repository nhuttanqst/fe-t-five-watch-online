// import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Empty, Form, Input, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import info from "../../assets/info.png";
import discount from "../../assets/discount.png";
import location from "../../assets/location.png";
import creditcard from "../../assets/creditcard.png";
import { useCurrentApp } from "../../context/app.context";

const CartPage = () => {
  const { carts, updateCartItemQuantity, removeFromCart, messageApi } =
    useCurrentApp();
  const [form] = Form.useForm();

  // Hàm tăng số lượng
  const handleIncreaseQuantity = (itemId) => {
    const item = carts.find((item) => item.id === itemId);
    if (item) {
      updateCartItemQuantity(itemId, item.quantity + 1);
    }
  };

  // Hàm giảm số lượng
  const handleDecreaseQuantity = (itemId) => {
    const item = carts.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(itemId, item.quantity - 1);
    } else {
      messageApi.error("Số lượng không thể nhỏ hơn 1!");
    }
  };

  // Hàm xóa sản phẩm
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    messageApi.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return carts.reduce((total, item) => {
      // Xử lý chuỗi giá tiền để lấy số
      const priceNumber =
        typeof item.price === "string"
          ? Number(item.price.replace(/[^\d]/g, ""))
          : item.price;

      return total + priceNumber * item.quantity;
    }, 0);
  };

  const handleSubmit = (values) => {
    messageApi.open({
      type: "success",
      content: "Đặt hàng thành công!",
    });
    console.log("Submitted values:", values);
  };

  return (
    <div className="max-w-4xl mx-auto my-14">
      <div className="flex flex-col space-y-6">
        {carts.length > 0 ? (
          <div className="flex flex-col space-y-6 border px-6 py-4 border-gray-300 rounded-xl shadow-2xl">
            <div className="space-y-2">
              {carts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-6 border-b border-[#EEEEEE]"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="w-40 h-40 object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <span className="font-semibold text-2xl">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="flex items-center justify-center cursor-pointer text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105"
                          >
                            -
                          </button>
                          <span className="text-xl">{item.quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="flex items-center justify-center cursor-pointer text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-black font-semibold text-xl ml-3">
                          {item.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 mt-8">
                        <div
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex items-center justify-center border border-gray-500 w-6 h-6 rounded-full text-sm cursor-pointer"
                        >
                          <DeleteOutlined />
                        </div>
                        <span
                          className="cursor-pointer transition-all duration-300 hover:text-red-400"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {carts.length > 0 && (
              <>
                <div className="flex items-center py-2 cursor-pointer text-black m-0 gap-3">
                  <div className="flex items-center space-x-2">
                    <img className="w-6 h-6" src={discount} alt="image" />
                    <span className="font-semibold text-[#676971] text-2xl">
                      Phiếu ưu đãi
                    </span>
                  </div>
                  <span className="text-3xl">&gt;</span>
                </div>

                <div className="flex items-center justify-between text-sm font-semibold border-b border-gray-300 py-4 m-0">
                  <span className="text-lg text-[#676775]">Tạm tính:</span>
                  <span className="text-lg text-[#676775]">
                    {calculateTotal().toLocaleString("vi-VN")} đ
                  </span>
                </div>

                <div className="flex items-center justify-between text-lg font-semibold border-b border-gray-300 py-4">
                  <span className="text-xl text-[#676775]">Tổng:</span>
                  <span className="text-xl">
                    {calculateTotal().toLocaleString("vi-VN")} đ
                  </span>
                </div>

                <Form
                  form={form}
                  onFinish={handleSubmit}
                  layout="vertical"
                  className="space-y-4"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 mb-4 mt-4">
                      <img className="w-6 h-6" src={info} alt="image" />
                      <span className="font-semibold text-lg text-[#676971]">
                        Thông tin khách hàng
                      </span>
                    </div>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name="customerName"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên khách hàng!",
                            },
                          ]}
                        >
                          <Input
                            className="w-full border border-black rounded-md text-[#676971] text-sm text-center"
                            placeholder="Tên khách hàng"
                            style={{ padding: 8 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="customerPhone"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số điện thoại!",
                            },
                          ]}
                        >
                          <Input
                            className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                            placeholder="Số điện thoại"
                            style={{ padding: 8 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col span={24}>
                        <Form.Item
                          name="customerEmail"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập email!",
                            },
                            {
                              type: "email",
                              message: "Email không hợp lệ!",
                            },
                          ]}
                        >
                          <Input
                            className="w-full border border-black rounded-md text-[#676971] text-sm text-center"
                            placeholder="Email"
                            style={{ padding: 8 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  {/* Thông tin nhận hàng */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 mb-4 mt-4">
                      <img className="w-6 h-6" src={location} alt="image" />
                      <span className="font-semibold text-lg text-[#676971]">
                        Thông tin nhận hàng
                      </span>
                    </div>
                    <span className="text-sm text-black mb-4 font-semibold">
                      Quốc gia: Việt Nam
                    </span>

                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-red-500">*</span>
                      <span className="text-sm text-black mb-1">Địa chỉ</span>
                    </div>
                    <Form.Item
                      name="shippingAddress"
                      rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ!" },
                      ]}
                    >
                      <Input
                        className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                        placeholder="Số nhà - Tên đường - Thôn/Xã"
                        style={{ padding: 8 }}
                      />
                    </Form.Item>

                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-red-500">*</span>
                      <span className="text-sm text-black mb-1">
                        Tỉnh/Thành Phố
                      </span>
                    </div>
                    <Form.Item
                      name="shippingCity"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Tỉnh/Thành phố!",
                        },
                      ]}
                    >
                      <Input
                        className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                        placeholder="Tỉnh/Huyện/Thành phố"
                        style={{ padding: 8 }}
                      />
                    </Form.Item>
                  </div>

                  {/* Thông tin bổ sung */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 mb-3 mt-4">
                      <span className="font-semibold text-lg text-[#676971]">
                        THÔNG TIN BỔ SUNG
                      </span>
                    </div>
                    <span className="text-sm text-black mb-1 font-semibold">
                      Yêu cầu khác
                    </span>
                    <Form.Item name="orderNotes" noStyle>
                      <Input
                        className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                        placeholder="Nhập yêu cầu (Không bắt buộc)"
                        style={{ padding: 8, marginTop: 8 }}
                      />
                    </Form.Item>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 mb-4 mt-4">
                      <img className="w-6 h-6" src={creditcard} alt="image" />
                      <span className="font-semibold text-lg text-[#676971]">
                        Phương thức thanh toán
                      </span>
                    </div>
                    <Form.Item name="paymentMethod" initialValue="COD" noStyle>
                      <Radio.Group className="w-full block">
                        <label className="block w-full mb-3 cursor-pointer">
                          <div className="flex items-center w-full">
                            <Radio value="COD" className="mr-2" />
                            <div className="bg-[#F6F6F6] text-black font-semibold rounded-md border border-[#E0E0E0] text-sm flex items-center p-3 cursor-pointer w-full">
                              <span>Thanh Toán Khi Nhận Hàng</span>
                            </div>
                          </div>
                        </label>
                        <label className="block w-full mb-5 cursor-pointer">
                          <div className="flex items-center w-full">
                            <Radio value="MOMO" className="mr-2" />
                            <div className="bg-[#F6F6F6] text-black font-semibold rounded-md border border-[#E0E0E0] text-sm flex items-center p-3 cursor-pointer w-full">
                              <span>Thanh Toán Qua MoMo</span>
                            </div>
                          </div>
                        </label>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  {/* Nút Đặt Hàng */}
                  <Form.Item noStyle>
                    <button
                      type="submit"
                      className="bg-[#A51717] text-white w-full py-3 rounded-full text-sm font-semibold mb-5 cursor-pointer hover:bg-red-600 transition duration-300"
                    >
                      Đặt Hàng
                    </button>
                  </Form.Item>
                </Form>
              </>
            )}
          </div>
        ) : (
          <Empty
            description={
              <span className="text-gray-500 text-xl select-none">
                Giỏ hàng của bạn đang trống
              </span>
            }
            imageStyle={{
              height: 140,
              width: 140,
            }}
            className="flex flex-col items-center justify-center min-h-[450px]"
          >
            <Link to="/">
              <button className="bg-[#A51717] text-white py-3 px-6 rounded-lg text-lg font-semibold cursor-pointer hover:bg-red-600 transition duration-300 mt-2">
                Tiếp tục mua sắm
              </button>
            </Link>
          </Empty>
        )}
      </div>
    </div>
  );
};

export default CartPage;
