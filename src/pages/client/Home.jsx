import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";
import useWatches from "../../apiservice/apiProduct";

const HomePage = () => {
  const { watches } = useWatches();

  const maleWatches = watches.filter((watch) => watch.category === "Nam");
  const femaleWatches = watches.filter((watch) => watch.category === "Nữ");
  const coupleWatches = watches.filter((watch) => watch.category === "Couple");

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />
      <PopularWatches watches={maleWatches} title="ĐỒNG HỒ NAM BÁN CHẠY" />
      <PopularWatches watches={femaleWatches} title="ĐỒNG HỒ NỮ BÁN CHẠY" />
      <PopularWatches
        watches={coupleWatches}
        title="ĐỒNG HỒ CẶP ĐÔI BÁN CHẠY"
      />
      {/* <div className="pagination mt-5">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-3 py-2 mx-1 ${currentPage === page + 1 ? "bg-red-500 text-white" : "bg-gray-300"}`}
          >
            {page + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default HomePage;
