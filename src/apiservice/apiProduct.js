import { useEffect, useState } from "react";

const useWatches = (initialPage = 1, initialLimit = 20) => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage); // Trạng thái cho trang hiện tại
  const [limit, setLimit] = useState(initialLimit); // Trạng thái cho số sản phẩm mỗi trang
  const [totalCount, setTotalCount] = useState(0); // Tổng số sản phẩm

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Include `page` and `limit` in the API request URL
        const response = await fetch(
          `http://localhost:5004/api/product?page=${page}&limit=${limit}`
        );
        const result = await response.json();
        const products = result.productDatas || [];
        setTotalCount(result.totalCount || 0); // Lưu tổng số sản phẩm từ API

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
              price: watch.giaBan.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }), // Định dạng giá bán
              category: watch.danhMuc,
              moTa: watch.moTa,
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
  }, [page, limit]); // Gọi lại khi `page` hoặc `limit` thay đổi

  return { watches, loading, page, setPage, limit, setLimit, totalCount };
};

export default useWatches;
