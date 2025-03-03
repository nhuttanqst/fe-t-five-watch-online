import { useEffect, useRef, useState } from "react";
import { Breadcrumb, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useCurrentApp } from "../../context/app.context";
import PopularWatches from "../../components/PopularWatches";
import { watchesWomen } from "../../data";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/product.detail.css";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";

const items = [
  {
    icon: icon1,
    text: "Tăng thời gian bảo hành lên đến 5 năm",
  },
  {
    icon: icon2,
    text: "Hoàn tiền gấp 10 lần khi phát hiện hàng giả",
  },
  {
    icon: icon3,
    text: "Trung tâm bảo hành đạt tiêu chuẩn quốc tế",
  },
  {
    icon: icon4,
    text: "Thay pin miễn phí suốt đời",
  },
  {
    icon: icon5,
    text: "Giao hàng siêu tốc 2h, ship COD miễn phí",
  },
  {
    icon: icon6,
    text: "Kinh nghiệm và dịch vụ hơn 30 năm",
  },
  {
    icon: icon7,
    text: "Sai kích cỡ? Không ưng ý? Đổi hàng trong 7 ngày",
  },
];

const ProductDetailPage = () => {
  const [type, setType] = useState("");
  const { dataViewDetail } = useCurrentApp();
  const [images, setImages] = useState([]);
  const refGallery = useRef(null);

  useEffect(() => {
    if (dataViewDetail?.type === "men") setType("Đồng Hồ Nam");
    else if (dataViewDetail?.type === "women") setType("Đồng Hồ Nữ");
    else setType("Đồng Hồ Cặp");
  }, []);

  useEffect(() => {
    if (dataViewDetail) {
      const thumbnailArr =
        dataViewDetail?.slider?.map((image) => ({
          original: image,
          thumbnail: image,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image",
        })) ?? [];

      const imagesArr = [
        {
          original: dataViewDetail?.image,
          thumbnail: dataViewDetail?.image,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image",
        },
        ...thumbnailArr,
      ];

      setImages(imagesArr);
    }
  }, [dataViewDetail]);

  return (
    <>
      <div className="container mt-4 mb-20 px-12 mx-auto">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/${dataViewDetail?.type}`}>{type}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{dataViewDetail.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mt-6 mx-20" gutter={[30, 30]}>
          <Col span={10}>
            <ReactImageGallery
              ref={refGallery}
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={false}
              slideOnThumbnailOver={true}
            />
          </Col>

          <Col span={14}>
            <h1 className="text-2xl font-bold text-[#676767] text-justify">
              {/* {dataViewDetail.name} */}
              Longines Master L2.128.5.37.7 – Nữ – Kính Sapphire – Automatic –
              Nét thi ca trên nền mặt số mạ vàng 18K – Âm hưởng từ tính nữ đương
              đại
            </h1>
            <h2 className="text-4xl text-[#C40D2E] mt-4">
              {dataViewDetail.price}
            </h2>
            <h3 className="text-sm text-[#676767] text-justify mt-4">
              Mẫu đồng hồ nữ Longines L2.128.5.37.7 với các chi tiết mạ vàng 18K
              sang trọng, cùng máy cơ Thụy Sĩ với các kỹ thuật hoàn thiện kỳ
              công, hứa hẹn mang đến cho nàng phong thái uyên bác và tự tin.
            </h3>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-[#666666]">Số lượng</span>
              <div className="flex items-center space-x-4">
                <button className="flex items-center justify-center cursor-pointer text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105">
                  -
                </button>
                <span className="text-xl">1</span>
                <button className="flex items-center justify-center cursor-pointer text-xl w-6 h-6 border border-gray-500 rounded-sm px-2 py-2 transition duration-200 ease-in-out transform hover:scale-105">
                  +
                </button>
              </div>
            </div>
            <button
              className="flex items-center justify-center cursor-pointer w-full h-12 rounded-lg bg-[#993333] text-white text-lg font-semibold mt-6 p-2 uppercase 
             transition-all duration-300 ease-in-out hover:bg-red-500 hover:shadow-lg active:scale-97"
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
          watches={watchesWomen}
          title="SẢN PHẨM TƯƠNG TỰ"
          mx
          px
        />
      </div>
    </>
  );
};

export default ProductDetailPage;
