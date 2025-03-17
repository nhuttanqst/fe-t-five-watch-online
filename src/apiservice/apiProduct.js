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
            const imageId = watch.hinhAnh?.[0];
            const imageUrl = imageId
              ? await fetch(`http://localhost:5004/api/product/getOneAnh/${imageId}`)
                  .then((res) => res.json())
                  .then((data) => data.productData?.duLieuAnh || "default-image-url")
                  .catch(() => "default-image-url")
              : "default-image-url";

            return {
              id: watch._id,
              image: imageUrl,
              name: watch.tenDH,
              price: watch.giaBan,
              category: watch.danhMuc,
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
