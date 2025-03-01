import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import ProductCategories from "../../components/ProductCategory";

const HomePage = () => {
  return (
    <>
      <div className="container mt-4 mb-20 mx-auto">
        <Banner />
        <ProductCategories />
        <FeaturedCategory />
      </div>
    </>
  );
};

export default HomePage;
