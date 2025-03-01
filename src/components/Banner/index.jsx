import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";

const Banner = () => {
  return (
    <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
      <div>
        <img src={banner1} alt="banner 1" />
      </div>
      <div>
        <img src={banner2} alt="banner 2" />
      </div>
      <div>
        <img src={banner1} alt="banner 3" />
      </div>
    </Carousel>
  );
};

export default Banner;
