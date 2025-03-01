import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";
import { watchesMen } from "../../data";

const HomePage = () => {
  return (
    <>
      <div className="container mt-4 mb-20 mx-auto">
        <Banner />
        <ProductCategories />
        <FeaturedCategory />
        <PopularWatches watches={watchesMen} title="ĐỒNG HỒ NAM BÁN CHẠY" />
      </div>
    </>
  );
};

export default HomePage;
