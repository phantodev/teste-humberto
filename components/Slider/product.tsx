import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function SliderProduct({ foto }: any) {
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
      className="SliderProduct"
    >
      {foto.map((foto:any, idx:number) => {
        return (
          <SwiperSlide key={foto.urli + idx}>
            <img
              src={`${foto.urli}`}
              alt={"produto imagem"}
              className="object-center object-cover"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
