import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useCurrentApp } from "../../context/app.context";

const FavoritePage = () => {
  const { favorite, removeFromFavorite } = useCurrentApp();

  return (
    <div className="container mx-auto py-8 px-6">
      {favorite.length > 0 ? (
        <>
          <h2 className="text-left text-lg font-bold text-[#344054] mb-6">
            {favorite.length} sản phẩm yêu thích
          </h2>

          <div className="grid grid-cols-4 gap-6">
            {favorite.map((watch) => (
              <div
                key={watch.id}
                className="relative flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
              >
                <Link to={`/product/${watch.id}`}>
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-[#676767] text-sm mt-2 w-40 truncate">
                    {watch.name}
                  </p>
                  <p className="text-[#606060] font-bold text-lg">
                    {watch.price}
                  </p>
                </Link>

                <button
                  className="absolute top-0 right-0 text-gray-500 hover:text-red-500 transition-all duration-300"
                  onClick={() => removeFromFavorite(watch.id)}
                >
                  <CloseOutlined />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="text-6xl text-gray-400 mb-4">❤️</div>
          <h1 className="text-2xl font-bold text-gray-700">
            Danh sách yêu thích của bạn đang trống!
          </h1>
          <p className="text-gray-500 mt-2">
            Hãy tìm kiếm và thêm sản phẩm yêu thích vào danh sách của bạn.
          </p>

          <Link
            to="/"
            className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
