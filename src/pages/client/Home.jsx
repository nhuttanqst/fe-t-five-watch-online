import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";
import SkeletonLoader from "../../components/SkeletonLoader";
import useWatchesData from "../../apiservice/useWathes";
import { useCurrentApp } from "../../context/app.context";
import { getUserAnalyticsApi } from "../../services/api";

const HomePage = () => {
  const { data, loading } = useWatchesData();
  const { user } = useCurrentApp();
  const [sameProducts, setSameProducts] = useState([]);

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      try {
        if (user) {
          const res = await getUserAnalyticsApi();
          if (res.status) {
            setSameProducts(res.data.sameCategoryProducts);
          }
        }
      } catch (error) {
        console.error("Error fetching user analytics:", error);
      }
    };
    fetchUserAnalytics();
  }, [user]);

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />

      {user &&
        (loading ? (
          <SkeletonLoader />
        ) : sameProducts.length > 0 ? (
          <PopularWatches watches={sameProducts} title="XU HƯỚNG CÁ NHÂN" />
        ) : null)}

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
