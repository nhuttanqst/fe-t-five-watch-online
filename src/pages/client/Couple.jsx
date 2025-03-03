import PopularWatches from "../../components/PopularWatches";
import { watchesCouple } from "../../data";
import icon from "../../assets/icon-filter.png";
import banner from "../../assets/banner_Couple.png";
const CouplePage = () => {
  return   <div className="container mt-4 mb-20 mx-auto ">
  <p className="flex justify-center [color:#6B6B6B] text-3xl font-bold">300+ Đồng hồ đôi (cặp) đẹp, chính hãng 100%, trả góp 0%</p>
  {/* <Banner /> */}
    <img 
    src={banner} 
    alt="Banner" 
    className="mx-auto my-4 rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rotate-3 hover:shadow-lg"
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
        <PopularWatches watches={watchesCouple} title="" />
  </div>
</div>
};

export default CouplePage;
