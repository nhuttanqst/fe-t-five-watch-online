import Banner from "../../components/Banner";
import PopularWatches from "../../components/PopularWatches";
import { watchesMen } from "../../data";
import icon from "../../assets/icon-filter.png";
import banner from "../../assets/banner_Men.png";
const MenPage = () => {
  return (<>
      <div className="container mt-4 mb-20 mx-auto ">
        <p className="flex justify-center [color:#6B6B6B] text-3xl font-bold">Đồng hồ nam đẹp chính hãng,cao cấp,mẫu mới 2025,góp 0%</p>
        {/* <Banner /> */}
          <img 
          src={banner} 
          alt="Banner" 
          className="mx-auto my-4   rounded-2xl "
        />
        <p className="flex justify-center [color:#9E9E9E] text-2xl">
          Những mẫu đồng hồ nam đẹp luôn là món phụ kiện thời trang hoàn hảo cho
          tất cả các dịp, giúp nam giới tự tin hơn – khẳng định phong cách.
          Đặc biệt khi mà nhiều thương hiệu đồng hồ nam thời trang quốc tế du
          nhập vào Việt Nam, việc mua sắm chiếc đồng hồ đeo tay nam phù hợp rất
          dễ dàng bởi sự đa dạng về mẫu mã, màu sắc, tính năng và kiểu dáng.
          Shop Đồng Hồ Hải Triều hiện là đại lý ủy quyền của gần 30 thương hiệu,
          mang cả thế giới đồng hồ về trưng bày tại hơn 25 chi nhánh trên toàn
          quốc.
        </p>
        <div className="border-t border-gray-300 my-8"></div>

            {/* Khung bộ lọc */}
            <div className="relative">
              <div className="absolute top-0 right-0 flex items-center bg-white shadow-md rounded-lg px-4 py-2 border-2 border-gray-300">
                <img
                  src={icon}
                  alt="Bộ lọc"
                  className="w-6 h-6 mr-2"
                />
                <span className="text-gray-700 font-medium">Bộ lọc</span>
              </div>
              {/* Popular Watches */}
              <PopularWatches watches={watchesMen} title="" />
        </div>
      </div>
      
    </>
  )

};

export default MenPage;
