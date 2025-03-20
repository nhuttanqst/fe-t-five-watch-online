import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import PopularWatches from "../../components/PopularWatches";
import { watchesMen } from "../../data";
import icon from "../../assets/icon-filter.png";
import banner from "../../assets/banner_Men.png";
import useWatches from "../../apiservice/apiProduct";
const MenPage = () => {
   
 
  const [page, setPage] = useState(1); // Trang hiện tại
  const limit = 2; // Số sản phẩm mỗi trang
  const { watches, loading } = useWatches(); 

  if (loading) return <div>Loading...</div>;

  const maleWatches = watches.filter((watch) => watch.category === "Nam");

  // console.log("mennn",watches)

    // Phân trang
  const totalPages = Math.ceil(maleWatches.length / limit); // Tổng số trang
  const paginatedWatches = maleWatches.slice(
    (page - 1) * limit,
    page * limit
  ); // Sản phẩm theo trang hiện tại

   

  // Xử lý sự kiện chuyển trang
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  
  return (<>
      <div className="container mt-4 mb-20 mx-auto ">
        <p className="flex justify-center [color:#6B6B6B] text-3xl font-bold">Đồng hồ nam đẹp chính hãng,cao cấp,mẫu mới 2025,góp 0%</p>
        {/* <Banner /> */}
        <img 
  src={banner} 
  alt="Banner" 
  className="mx-auto my-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300"
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
              <div className="absolute top-0 right-0 flex items-center bg-white shadow-md rounded-lg px-4 py-2 border-2 border-gray-300 hover:">
                <img
                  src={icon}
                  alt="Bộ lọc"
                  className="w-6 h-6 mr-2"
                />
                <span className="text-gray-700 font-medium">Bộ lọc</span>
              </div>
              {/* Popular Watches */}
              <PopularWatches watches={ paginatedWatches} title="" />
             {/* Phân trang */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Trang trước
          </button>
          <span className="text-gray-700">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
        </div>
      </div>
      
    </>
  )

};

export default MenPage;
