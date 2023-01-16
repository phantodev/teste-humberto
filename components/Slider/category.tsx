import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/router";

interface SliderBanner {
  categoryDetails: [
    {
      idCategoria: string;
      imagem: string;
      nome: string;
    }
  ];
}

export function SliderCategory({ categoryDetails }: SliderBanner) {
  const router = useRouter();

  function FromCategoryPage(id: string) {
    router.push({
      pathname: "/produtos/",
      query: { category: id },
    });
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={5}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        500: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        750: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {categoryDetails.map((category, idx) => {
        return (
          <SwiperSlide key={category.idCategoria + idx}>
            <div
              key={category.nome}
              onClick={() => {
                FromCategoryPage(category.idCategoria);
              }}
              className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75"
            >
              <span aria-hidden="true" className="absolute inset-0">
                <img
                  src={category.imagem}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
              />
              <span className="relative mt-auto text-center text-xl font-bold text-white">
                {category.nome}
              </span>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
