import { useEffect, useState } from "react";
import icon from "../../assets/icon-filter.png";
import banner from "../../assets/banner_Women.png";
// import { watchesWomen } from "../../data";
import PopularWatches from "../../components/PopularWatches";
import useWatches from "../../apiservice/apiProduct";
const WomenPage = () => {
  const [page, setPage] = useState(1); // Trang hiện tại
    const limit = 2; // Số sản phẩm mỗi trang
  const { watches, loading } = useWatches();

  if (loading) return <div>Loading...</div>;

  const femaleWatches = watches.filter((watch) => watch.category === "Nữ");
  // Phân trang
  const totalPages = Math.ceil(femaleWatches.length / limit); // Tổng số trang
  const paginatedWatches = femaleWatches.slice(
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
  
  return  <div className="container mt-4 mb-20 mx-auto ">
  <p className="flex justify-center [color:#6B6B6B] text-3xl font-bold">Đồng hồ nữ đẹp, cao cấp chính hãng 100%, góp 0%, 1 đổi 1</p>
  {/* <Banner /> */}
  <img 
  src={banner} 
  alt="Banner" 
  className="mx-auto my-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300"
/>



  <p className="flex justify-center [color:#9E9E9E] text-2xl">
  Những mẫu đồng hồ nữ đẹp đã trở thành biểu tượng của giới mê thời trang bởi không chỉ thiết kế bắt mắt, mà còn nằm ở vật liệu bền bỉ theo thời gian, cỗ máy đáng tin cậy, tính năng hữu ích cho người sử dụng. Đặc biệt, các thương hiệu đồng hồ nữ thời trang như Daniel Wellington, Saga, Fossil,… làm rất tốt nhiệm vụ khi liên tục cho ra mắt bộ sưu tập mới hằng năm. Nếu bạn mê mẩn các sản phẩm đồng hồ đeo tay nữ cao cấp, Hải Triều là điểm đến tin cậy.
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
        <PopularWatches watches={paginatedWatches} title="" />
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

export default WomenPage;
