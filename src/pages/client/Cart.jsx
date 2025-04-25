import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Row, Empty } from "antd";
import info from "../../assets/info.png";
import discount from "../../assets/discount.png";
import location from "../../assets/location.png";
import creditcard from "../../assets/creditcard.png";
import { useCurrentApp } from "../../context/app.context";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    carts,
    updateCartItemQuantity,
    removeFromCart,
    messageApi,
    contextHolder,
  } = useCurrentApp();
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    shippingAddress: "",
    shippingCity: "",
    orderNotes: "",
  });

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

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (carts.length === 0) {
      messageApi.error("Giỏ hàng của bạn đang trống!");
      return;
    }

    // Kiểm tra thông tin form cơ bản
    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.shippingAddress ||
      !formData.shippingCity
    ) {
      messageApi.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Xử lý đặt hàng - có thể gọi API từ đây
    messageApi.success("Đặt hàng thành công!");
    // TODO: Gửi dữ liệu đặt hàng lên server
  };

  // Cập nhật form data
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto my-14">
      {contextHolder}
      <div className="flex flex-col space-y-6">
        {carts.length > 0 ? (
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
                    <span className="font-semibold text-2xl">{item.name}</span>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 mb-4 mt-4">
                  <img className="w-6 h-6" src={info} alt="image" />
                  <label
                    htmlFor="customerName"
                    className="font-semibold text-lg text-[#676971]"
                  >
                    Thông tin khách hàng
                  </label>
                </div>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <input
                      id="customerName"
                      className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                      placeholder="Tên khách hàng"
                      value={formData.customerName}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      id="customerPhone"
                      className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                      placeholder="Số điện thoại"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col span={24}>
                    <input
                      id="customerEmail"
                      className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                      placeholder="Email"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </div>

              {/* Thông tin nhận hàng */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 mb-4 mt-4">
                  <img className="w-6 h-6" src={location} alt="image" />
                  <label
                    htmlFor="shippingAddress"
                    className="font-semibold text-lg text-[#676971]"
                  >
                    Thông tin nhận hàng
                  </label>
                </div>
                <span className="text-sm text-black mb-4 font-semibold">
                  Quốc gia: Việt Nam
                </span>

                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-red-500">*</span>
                  <span className="text-sm text-black mb-1">Địa chỉ</span>
                </div>
                <input
                  id="shippingAddress"
                  className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                  placeholder="Số nhà - Tên đường - Thôn/Xã"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                />
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-red-500">*</span>
                  <span className="text-sm text-black mb-1">
                    Tỉnh/Thành Phố
                  </span>
                </div>
                <input
                  id="shippingCity"
                  className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                  placeholder="Tỉnh/Huyện/Thành phố"
                  value={formData.shippingCity}
                  onChange={handleInputChange}
                />
              </div>

              {/* Thông tin bổ sung */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 mb-3 mt-4">
                  <label
                    htmlFor="orderNotes"
                    className="font-semibold text-lg text-[#676971]"
                  >
                    THÔNG TIN BỔ SUNG
                  </label>
                </div>
                <span className="text-sm text-black mb-1 font-semibold">
                  Yêu cầu khác
                </span>
                <input
                  id="orderNotes"
                  className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                  placeholder="Nhập yêu cầu (Không bắt buộc)"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                />
              </div>

              {/* Phương thức thanh toán */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 mb-4 mt-4">
                  <img className="w-6 h-6" src={creditcard} alt="image" />
                  <label className="font-semibold text-lg text-[#676971]">
                    Phương thức thanh toán
                  </label>
                </div>
                <label className="bg-[#F6F6F6] text-black font-semibold rounded-md border border-[#E0E0E0] text-sm flex items-center p-3 cursor-pointer mb-5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    className="w-4 h-4 mr-3"
                    defaultChecked
                  />
                  <span>Thanh Toán Khi Nhận Hàng</span>
                </label>
              </div>

              {/* Nút Đặt Hàng */}
              <button
                type="submit"
                className="bg-[#A51717] text-white w-full py-3 rounded-full text-sm font-semibold mb-5"
              >
                Đặt Hàng
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
