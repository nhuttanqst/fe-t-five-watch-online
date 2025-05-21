import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";
import useWatchesData from "../../apiservice/useWathes";

const SkeletonLoader = () => (
  <div className="grid gap-6 mx-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="flex flex-col items-center text-center">
        <div className="w-48 h-48 bg-gray-200 animate-pulse" />
        <div className="w-40 h-4 bg-gray-200 mt-2 animate-pulse" />
        <div className="w-20 h-4 bg-gray-200 mt-2 animate-pulse" />
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const { data, loading } = useWatchesData();

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />

      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={data.male} title="ĐỒNG HỒ NAM MỚI NHẤT" />
        </>
      )}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={data.female} title="ĐỒNG HỒ NỮ MỚI NHẤT" />
        </>
      )}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches
            watches={data.couple}
            title="ĐỒNG HỒ CẶP ĐÔI MỚI NHẤT"
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
