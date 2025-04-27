import { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import FeaturedCategory from '../../components/FeaturedCategory';
import PopularWatches from '../../components/PopularWatches';
import ProductCategories from '../../components/ProductCategory';
import useWatches from '../../apiservice/apiProduct';

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination mt-5 flex justify-center">
      {totalPages > 1 &&
        [...Array(totalPages).keys()].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p + 1)}
            className={`px-3 py-2 mx-1 ${page === p + 1 ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          >
            {p + 1}
          </button>
        ))}
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="grid gap-6 mx-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="flex flex-col items-center text-center">
        <div className="w-48 h-48 bg-gray-200 animate-pulse" />
        <div className="w-40 h-4 bg-gray-200 mt-2 animate-pulse" />
        <div className="w-20 h-4 bg-gray-200 mt-2 animate-pulse" />
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const maleWatchesHook = useWatches(1, 10, 'Nam');
  const femaleWatchesHook = useWatches(1, 10, 'Nữ');
  const coupleWatchesHook = useWatches(1, 10, 'Couple');

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />
      {maleWatchesHook.loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={maleWatchesHook.watches} title="ĐỒNG HỒ NAM BÁN CHẠY" />
          <Pagination
            page={maleWatchesHook.page}
            setPage={maleWatchesHook.setPage}
            totalPages={maleWatchesHook.totalPages}
          />
        </>
      )}
      {femaleWatchesHook.loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={femaleWatchesHook.watches} title="ĐỒNG HỒ NỮ BÁN CHẠY" />
          <Pagination
            page={femaleWatchesHook.page}
            setPage={femaleWatchesHook.setPage}
            totalPages={femaleWatchesHook.totalPages}
          />
        </>
      )}
      {coupleWatchesHook.loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={coupleWatchesHook.watches} title="ĐỒNG HỒ CẶP ĐÔI BÁN CHẠY" />
          <Pagination
            page={coupleWatchesHook.page}
            setPage={coupleWatchesHook.setPage}
            totalPages={coupleWatchesHook.totalPages}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;