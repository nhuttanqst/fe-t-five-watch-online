import { useEffect, useState } from "react";

const useWatches = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5004/api/product");
        const result = await response.json();
        const products = result.productDatas || [];

        const formattedData = await Promise.all(
          products.map(async (watch) => {
            const allImages = await Promise.all(
              watch.hinhAnh?.map((imageId) =>
                fetch(`http://localhost:5004/api/product/getOneAnh/${imageId}`)
                  .then((res) => res.json())
                  .then((data) => data.productData?.duLieuAnh || "default-image-url")
                  .catch(() => "default-image-url")
              ) || []
            );

            return {
              id: watch._id,
              images: allImages, // Lưu tất cả ảnh
              image: allImages[0] || "default-image-url", // Ảnh chính
              name: watch.tenDH,
              price: watch.giaBan.toLocaleString("vi-VN", { style: "currency", currency: "VND" }), // Định dạng giá bán
              category: watch.danhMuc,
              moTa:watch.moTa
            };
          })
        );

        setWatches(formattedData);
      } catch (error) {
        console.error("Failed to fetch watches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { watches, loading };
};

export default useWatches;

