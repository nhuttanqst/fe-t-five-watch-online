import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";

const HomePage = () => {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5004/api/product");
        const result = await response.json();

        // Ensure `productDatas` exists in the response
        const products = result.productDatas || [];

        // Format data with images
        const formattedData = await Promise.all(
          products.map(async (watch) => {
            const imageId = watch.hinhAnh?.[0]; // Take the first image ID
            let imageUrl = "default-image-url"; // Fallback image

            if (imageId) {
              // Fetch image data from the `HinhAnh` table
              try {
                const imageResponse = await fetch(
                  `http://localhost:5004/api/product/getOneAnh/${imageId}`
                );
                const imageResult = await imageResponse.json();

                // Ensure productData exists and extract `duLieuAnh`
                if (imageResult.success && imageResult.productData) {
                  imageUrl = imageResult.productData.duLieuAnh || imageUrl;
                }
              } catch (imageError) {
                console.error(`Failed to fetch image for ID: ${imageId}`, imageError);
              }
            }

            return {
              id: watch._id,
              image: imageUrl,
              name: watch.tenDH,
              price: watch.giaBan,
              category: watch.danhMuc || "unknown",
            };
          })
        );

        setWatches(formattedData);
      } catch (error) {
        console.error("Failed to fetch watches:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />
      <PopularWatches watches={watches} title="ĐỒNG HỒ NAM BÁN CHẠY" />
      {/* <PopularWatches watches={watchesWomen} title="ĐỒNG HỒ NỮ BÁN CHẠY" />
      <PopularWatches watches={watchesCouple} title="ĐỒNG HỒ CẶP ĐÔI BÁN CHẠY" /> */}
    </div>
  );
};

export default HomePage;
