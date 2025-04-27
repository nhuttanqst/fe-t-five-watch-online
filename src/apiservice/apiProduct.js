import { useEffect, useState } from 'react';

const useWatches = (initialPage = 1, initialLimit = 10, category = '') => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5004/api/product?page=${page}&limit=${limit}${
          category ? `&danhMuc=${category}` : ''
        }`;
        const response = await fetch(url);
        const result = await response.json();
        const products = result.productDatas || [];
        setTotalCount(result.totalCount || 0);
        setTotalPages(result.totalPages || 0);

        const formattedData = products.map((watch) => ({
          id: watch._id,
          images: watch.hinhAnh.map((img) => img.duLieuAnh || 'default-image-url'),
          image: watch.hinhAnh[0]?.duLieuAnh || 'default-image-url',
          name: watch.tenDH,
          price: watch.giaBan,
          category: watch.danhMuc,
          moTa: watch.moTa,
        }));

        setWatches(formattedData);
      } catch (error) {
        console.error('Lỗi khi lấy đồng hồ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, category]);

  return { watches, loading, page, setPage, limit, setLimit, totalCount, totalPages };
};

export default useWatches;