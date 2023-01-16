import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


interface SliderBanner {
  bannerDetails: [
    {
      idBanner: string;
      imagem: string;
      urli: string;
    }
  ];
}

export function SliderBanner({ bannerDetails }: SliderBanner) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {bannerDetails.map((banner, idx) => {
        return (
          <SwiperSlide key={banner.idBanner + idx}>
            <Image src={banner.imagem} layout={"fill"} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
