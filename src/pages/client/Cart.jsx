import React, { useState } from "react";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import info from "../../assets/info.png";
import discount from "../../assets/discount.png";
import location from "../../assets/location.png";
import creditcard from "../../assets/creditcard.png";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

const CartPage = () => {
  const [items, setItems] = useState([
    {
      name: "Doxa Noble D173TCM",
      price: 49240000,
      quantity: 1,
      image: product1,
    },
    {
      name: "KOI Sheen K004.53.644.53.10.05",
      price: 7520000,
      quantity: 2,
      image: product2,
    },
    {
      name: "Titoni Doi K-DB541",
      price: 85510000,
      quantity: 1,
      image: product3,
    },
  ]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-4xl mx-auto my-14">
      <div className="flex flex-col space-y-6 p-6 border border-gray-300 rounded-xl shadow-2xl">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-6 border-b border-[#EEEEEE]"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover"
                />
                <div className="flex flex-col justify-between">
                  <span className="font-semibold text-2xl">{item.name}</span>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center justify-center text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105">
                        -
                      </button>
                      <span className="text-xl">{item.quantity}</span>
                      <button className="flex items-center justify-center text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105">
                        +
                      </button>
                    </div>
                    <span className="text-black font-semibold text-xl ml-3">
                      {item.price.toLocaleString()} đ
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 mt-8">
                    <div className="flex items-center justify-center border border-gray-500 w-6 h-6 rounded-full text-sm">
                      <DeleteOutlined />
                    </div>
                    <span className="cursor-pointer transition-all duration-300 hover:text-red-400">
                      Xóa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center py-2 cursor-pointer text-black m-0 gap-3">
            <div className="flex items-center space-x-2">
                <img className="w-6 h-6" src={discount} alt="image" />
                <span className="font-semibold text-[#676971] text-2xl">Phiếu ưu đãi</span>
            </div>
            <span className="text-3xl">&gt;</span>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold border-b border-gray-300 py-4 m-0">
          <span className="text-lg text-[#676775]">Tạm tính:</span>
          <span className="text-lg text-[#676775]">
            {calculateTotal().toLocaleString()} đ
          </span>
        </div>

        <div className="flex items-center justify-between text-lg font-semibold border-b border-gray-300 py-4">
          <span className="text-xl text-[#676775]">Tổng:</span>
          <span className="text-xl">{calculateTotal().toLocaleString()} đ</span>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 mb-4 mt-4">
              <img className="w-6 h-6" src={info} alt="image" />
              <label
                htmlFor="customer-name"
                className="font-semibold text-lg text-[#676971]"
              >
                Thông tin khách hàng
              </label>
            </div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <input
                  id="customer-name"
                  className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                  placeholder="Tên khách hàng"
                />
              </Col>
              <Col span={12}>
                <input
                  id="customer-phone"
                  className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                  placeholder="Số điện thoại"
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col span={24}>
                <input
                  id="customer-email"
                  className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                  placeholder="Email"
                />
              </Col>
            </Row>
          </div>

          {/* Thông tin nhận hàng */}
          <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 mb-4 mt-4">
                            <img className="w-6 h-6" src={location} alt="image" />
                            <label
                                htmlFor="shipping-address"
                                className="font-semibold text-lg text-[#676971]"
                            >
                                Thông tin nhận hàng
                            </label>
                        </div>
                        <span className="text-sm text-black mb-4 font-semibold">Quốc gia: Việt Nam</span>

                        <div className="flex items-center gap-2 font-semibold">
                          <span className="text-red-500">*</span>
                          <span className="text-sm text-black mb-1">Địa chỉ</span>
                        </div>
                        <input
                            id="shipping-address"
                            className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                            placeholder="Số nhà - Tên đường - Thôn/Xã"
                        />
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="text-red-500">*</span>
                          <span className="text-sm text-black mb-1">Tỉnh/Thành Phố</span>
                        </div>
                        <input
                            id="shipping-city"
                            className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                            placeholder="Tỉnh/Huyện/Thành phố"
                        />
                    </div>

                    {/* Thông tin bổ sung */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 mb-3 mt-4">
                            <label
                                htmlFor="order-notes"
                                className="font-semibold text-lg text-[#676971]"
                            >
                                THÔNG TIN BỔ SUNG
                            </label>
                        </div>
                        <span className="text-sm text-black mb-1 font-semibold">Yêu cầu khác</span>
                        <input
                            id="order-notes"
                            className="w-full p-2 border border-black rounded-md text-[#676971] text-sm text-center"
                            placeholder="Nhập yêu cầu ( Không bắt buộc)"
                        />
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 mb-4 mt-4">
                            <img className="w-6 h-6" src={creditcard} alt="image" />
                            <label
                                className="font-semibold text-lg text-[#676971]"
                            >
                                Phương thức thanh toán
                            </label>
                        </div>
                        <label className="bg-[#F6F6F6] text-black font-semibold rounded-md border border-[#E0E0E0] text-sm flex items-center p-3 cursor-pointer mb-5">
                            <input
                                type="radio"
                                name="paymentMethod" // Thêm name để nhóm các radio button
                                value="cod" // Thêm value cho radio button
                                className="w-4 h-4 mr-3 "
                                checked
                            />
                            <span>Thanh Toán Khi Nhận Hàng</span>
                        </label>
                    </div>

                    {/* Nút Đặt Hàng */}
                    <button className="bg-[#A51717] text-white w-full py-3 rounded-full text-sm font-semibold mb-5">
                        Đặt Hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;