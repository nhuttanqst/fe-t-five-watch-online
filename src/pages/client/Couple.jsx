import PopularWatches from "../../components/PopularWatches";
import { useEffect, useState } from "react";
import { watchesCouple } from "../../data";
import icon from "../../assets/icon-filter.png";
import banner from "../../assets/banner_Couple.png";
import useWatches from "../../apiservice/apiProduct";
const CouplePage = () => {

  const [page, setPage] = useState(1); // Trang hiện tại
  const limit = 2; // Số sản phẩm mỗi trang
  const { watches, loading } = useWatches();

  if (loading) return <div>Loading...</div>;

  const coupleWatches = watches.filter((watch) => watch.category === "Couple");
  // Phân trang
  const totalPages = Math.ceil(coupleWatches.length / limit); // Tổng số trang
  const paginatedWatches = coupleWatches.slice(
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


  return   <div className="container mt-4 mb-20 mx-auto ">
  <p className="flex justify-center [color:#6B6B6B] text-3xl font-bold">300+ Đồng hồ đôi (cặp) đẹp, chính hãng 100%, trả góp 0%</p>
  {/* <Banner /> */}
    <img 
    src={banner} 
    alt="Banner" 
    className="mx-auto my-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300"
  />
  <p className="flex justify-center [color:#9E9E9E] text-2xl">
  Đồng hồ đôi đẹp là sự “chắp cánh” tốt nhất cho tình yêu của hai bạn để bước thêm một nấc thang mới. Bạn sẽ thấy sức mạnh diệu kì đến từ món quà tặng tuyệt vời này, nó không chỉ nằm ở giá trị vật chất mà đồng hồ cặp (đôi) chính hãng còn mang những giá trị tinh thần hết sức ý nghĩa mà sẽ làm tình yêu đôi lứa bùng cháy và lưu giữ được những khoảng khắc thời gian lãng mạn trong tình yêu của hai bạn…
  </p>
  <div className="border-t border-gray-300 my-8"></div>

      {/* Khung bộ lọc */}
      <div className="relative">
        <div className="absolute top-0 right-0 flex items-center bg-white shadow-md rounded-lg px-4 py-2 border-2 border-gray-300">
          <img
            src={icon}
            alt="Bộ lọc"
            className="w-6 h-6 mr-2 "
          />
          <span className="text-gray-700 font-medium">Bộ lọc</span>
        </div>
        {/* Popular Watches */}
        <PopularWatches watches={paginatedWatches} title="" />
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
};

export default CouplePage;
