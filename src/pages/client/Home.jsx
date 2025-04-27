
import { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import FeaturedCategory from '../../components/FeaturedCategory';
import PopularWatches from '../../components/PopularWatches';
import ProductCategories from '../../components/ProductCategory';
import useWatches from '../../apiservice/apiProduct';


const SkeletonLoader = () => (
  <div className="grid gap-6 mx-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="flex flex-col items-center text-center">
        <div className="w-48 h-48 bg-gray-200 animate-pulse" />
        <div className="w-40 h-4 bg-gray-200 mt-2 animate-pulse" />
        <div className="w-20 h-4 bg-gray-200 mt-2 animate-pulse" />
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const maleWatchesHook = useWatches(1, 4, 'Nam');
  const femaleWatchesHook = useWatches(1, 4, 'Nữ');
  const coupleWatchesHook = useWatches(1, 4, 'Couple');


  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />

      {maleWatchesHook.loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={maleWatchesHook.watches} title="ĐỒNG HỒ NAM MỚI NHẤT" />
          
        </>
      )}
      {femaleWatchesHook.loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={femaleWatchesHook.watches} title="ĐỒNG HỒ NỮ MỚI NHẤT" />
          
        </>
      )}
      {coupleWatchesHook.loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={coupleWatchesHook.watches} title="ĐỒNG HỒ CẶP ĐÔI MỚI NHẤT" />
          
        </>
      )}

    </div>
  );
};

export default HomePage;