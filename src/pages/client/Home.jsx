import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";
import useWatches from "../../apiservice/apiProduct";

const HomePage = () => {
  const { watches, loading } = useWatches();

  if (loading) return <div>Loading...</div>;

  const maleWatches = watches.filter((watch) => watch.category === "Nam");
  const femaleWatches = watches.filter((watch) => watch.category === "Nữ");
  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />
      <PopularWatches watches={maleWatches} title="ĐỒNG HỒ NAM BÁN CHẠY" />
      {/* Nếu muốn thêm các danh mục khác: */}
      <PopularWatches watches={femaleWatches} title="ĐỒNG HỒ NỮ BÁN CHẠY" />
      {/* <PopularWatches watches={watchesCouple} title="ĐỒNG HỒ CẶP ĐÔI BÁN CHẠY" /> */}
    </div>
  );
};

export default HomePage;
