import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCurrentApp } from "../../context/app.context";

const PopularWatches = ({ watches, title, mx, px }) => {
  const { setDataViewDetail, favorite, toggleFavorite } = useCurrentApp();
  const navigate = useNavigate();

  const handleViewDetail = (watch) => {
    setDataViewDetail(watch);
    navigate(`/product/${watch.id}`);
  };

  const isFavorite = (id) => {
    return favorite.some((item) => item.id === id);
  };

  return (
    <div className={`container mx-auto py-8 ${px ? "" : "px-6"}`}>
      <h2 className="text-center text-xl font-bold uppercase text-gray-800 mb-6">
        {title}
      </h2>

      <div className={`grid grid-cols-4 gap-6 ${mx ? "mx-0" : "mx-20"}`}>
        {watches.map((watch) => (
          <div
            key={watch.id}
            className="group mt- flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => handleViewDetail(watch)}
          >
            <div className="relative w-48 h-48 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img
                src={watch.image}
                alt={watch.name}
                className="object-cover w-full h-full"
              />

              <button
                className={`absolute top-2 right-2 text-xl transition-all duration-300 cursor-pointer ${
                  isFavorite(watch.id) ? "text-red-500" : "text-gray-500"
                } hover:text-red-500`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(watch);
                }}
              >
                {isFavorite(watch.id) ? <HeartFilled /> : <HeartOutlined />}
              </button>
            </div>

            <p className="text-gray-700 text-sm mt-2 w-40 truncate transition-all duration-300 group-hover:scale-105">
              {watch.name}
            </p>

            <p className="text-black font-bold text-lg transition-all duration-300 group-hover:scale-105">
              {watch.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularWatches;
