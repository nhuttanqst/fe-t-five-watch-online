import { useEffect, useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import { Breadcrumb, Col, Row } from "antd";
import { useCurrentApp } from "../../context/app.context";
import PopularWatches from "../../components/PopularWatches";
import { items } from "../../data";
import "../../styles/product.detail.css";

import useWatches from "../../apiservice/apiProduct";
const typeMapping = {
  Nam: "Đồng Hồ Nam",
  Nữ: "Đồng Hồ Nữ",
  Couple: "Đồng Hồ Cặp",
};

const ProductDetailPage = () => {
  const { watches } = useWatches();
  const [filteredWatches, setFilteredWatches] = useState([]);
  const [type, setType] = useState("");

  const { dataViewDetail, addToCart, messageApi, contextHolder } =
    useCurrentApp();
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const refGallery = useRef(null);

  useEffect(() => {
    setType(typeMapping[dataViewDetail?.category]);
  }, [dataViewDetail?.category]);

  useEffect(() => {
    if (dataViewDetail) {
      const imagesArr =
        dataViewDetail.images?.map((image) => ({
          original: image,
          thumbnail: image,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image",
        })) || [];

      setImages(imagesArr);
    }
  }, [dataViewDetail]);

  // Lọc sản phẩm tương tự theo category
  useEffect(() => {
    if (dataViewDetail?.category) {
      const similarWatches = watches.filter(
        (watch) =>
          watch.category === dataViewDetail.category &&
          watch.id !== dataViewDetail.id
      );
      setFilteredWatches(similarWatches);
    }
  }, [dataViewDetail?.category, watches, dataViewDetail?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    else
      messageApi.open({
        type: "error",
        content: "Số lượng không thể nhỏ hơn 1!",
      });
  };

  const handleAddToCart = () => {
    if (dataViewDetail) {
      addToCart(dataViewDetail, quantity);
      messageApi.open({
        type: "success",
        content: "Thêm vào giỏ hàng thành công!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="container mt-4 mb-20 px-12 mx-auto">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">{type}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{dataViewDetail.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mt-6 mx-20" gutter={[30, 30]}>
          <Col span={8} className="flex justify-center">
            <div className="w-3/4">
              <ReactImageGallery
                ref={refGallery}
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                slideOnThumbnailOver={true}
              />
            </div>
          </Col>

  <Col span={16}>
    <h1 className="text-2xl font-bold text-[#676767] text-justify">
    {dataViewDetail.name}
    </h1>
    <h2 className="text-4xl text-[#C40D2E] mt-4">
    {dataViewDetail?.price
    ? dataViewDetail.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "Đang tải..."}
    </h2>
    <h3 className="text-sm text-[#676767] text-justify mt-4">
    {dataViewDetail.moTa}
    </h3>
    <div className="flex items-center space-x-4 mt-4">
      <span className="text-[#666666]">Số lượng</span>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center justify-center cursor-pointer text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          className="flex items-center justify-center cursor-pointer text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
    </div>

    {/* Display total price */}
  <div className="mt-4">
    <span className="text-lg font-semibold">Tổng tiền: </span>
    <span className="text-xl text-[#C40D2E] font-bold">
    {dataViewDetail?.price
      ? (dataViewDetail.price * quantity).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      : "Đang tải..."}
    </span>
  </div>
  <button
              className="flex items-center justify-center cursor-pointer w-full h-12 rounded-lg bg-[#993333] text-white text-lg font-semibold mt-6 p-2 uppercase 
              transition-all duration-300 ease-in-out hover:bg-red-500 hover:shadow-lg active:scale-97"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
  </Col>
</Row>

           

        <div className="grid grid-cols-4 gap-6 mt-15 px-6 border-b border-gray-300 pb-15">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 border border-gray-100 p-4 rounded-xl shadow-sm transition duration-300 hover:shadow-md"
            >
              <img className="w-7 h-7" src={item.icon} alt="icon" />
              <p className="text-gray-700 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <PopularWatches
          watches={filteredWatches}
          title="SẢN PHẨM TƯƠNG TỰ"
          mx
          px
        />
      </div>
    </>
  );
};

export default ProductDetailPage;
