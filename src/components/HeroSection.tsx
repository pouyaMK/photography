// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import clsx from 'clsx';

// const images = [
//   '/img/portraite/_MG_2784 copy.jpg',
//   '/img/portraite/_MG_1362 copy.jpg',
//   '/img/portraite/_MG_1379 copy 2.jpg',
//   '/img/portraite/_MG_27941 copy.jpg',
// ];

// export default function HeroSection() {
//   const [hovered, setHovered] = useState<number | null>(null);

//   return (
//     <section className="bg-gray-100 min-h-screen ">
//       <div className="w-[80%] mx-auto py-28">
//         <div className="text-sm text-gray-500 mb-2 ">خانه / پرتفولیو</div>

//         <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-4">
//           عکس های گرفته شده
//           <br />
//           با دنیای مدرن
//         </h1>

//         <div className="flex items-center gap-4 mb-10">
//           <div className="flex -space-x-3">
//             <Image
//               src="/img/portraite/IMG_5821_20241119170044.JPG"
//               width={40}
//               height={40}
//               className="rounded-full border-2 border-white"
//               alt="Person 1"
//             />
//             <Image
//               src="/img/portraite/IMG_5820_20241119170044.JPG"
//               width={40}
//               height={40}
//               className="rounded-full border-2 border-white"
//               alt="Person 2"
//             />
//             <Image
//               src="/img/portraite/IMG_5783_20241119165529.PNG"
//               width={40}
//               height={40}
//               className="rounded-full border-2 border-white"
//               alt="Person 3"
//             />
//           </div>
//           <div className="text-sm">
//             <div className="font-bold">★★★★★</div>
//             <div className="text-[#29A6DB]">۳۰۰+ رضایت مشتریان</div>
//           </div>
//         </div>

//         <div className="flex gap-4 overflow-hidden">
//           {images.map((src, i) => (
//             <div
//               key={i}
//               className={clsx(
//                 "transition-all duration-500 cursor-pointer overflow-hidden rounded-xl",
//                 hovered === i ? "w-[25%]" : "w-[20%] hover:w-[30%]",
//               )}
//               onMouseEnter={() => setHovered(i)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               <Image
//                 src={src}
//                 alt={`Image ${i + 1}`}
//                 width={500}
//                 height={700}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  '/img/portraite/_MG_2784 copy.jpg',
  '/img/portraite/_MG_1362 copy.jpg',
  '/img/portraite/_MG_1379 copy 2.jpg',
  '/img/portraite/_MG_27941 copy.jpg',
];

export default function HeroSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="w-[85%] md:w-[80%] mx-auto py-28">
        <div className="text-sm text-gray-500 mb-2">خانه / پرتفولیو</div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
          عکس های گرفته شده
          <br />
          با دنیای مدرن
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex -space-x-3">
            <Image
              src="/img/portraite/IMG_5821_20241119170044.JPG"
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
              alt="Person 1"
            />
            <Image
              src="/img/portraite/IMG_5820_20241119170044.JPG"
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
              alt="Person 2"
            />
            <Image
              src="/img/portraite/IMG_5783_20241119165529.PNG"
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
              alt="Person 3"
            />
          </div>
          <div className="text-sm">
            <div className="font-bold">★★★★★</div>
            <div className="text-[#29A6DB]">۳۰۰+ رضایت مشتریان</div>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:flex gap-4 overflow-hidden">
          {images.map((src, i) => (
            <div
              key={i}
              className={`transition-all duration-500 cursor-pointer overflow-hidden rounded-xl ${
                hovered === i ? 'w-[25%]' : 'w-[20%] hover:w-[30%]'
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={src}
                alt={`Image ${i + 1}`}
                width={500}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet view - Swiper Slider */}
        <div className="md:hidden">
        <Swiper
  spaceBetween={16}
  slidesPerView={1.2}
  pagination={{ clickable: true }}
  modules={[Pagination]}
  className="custom-swiper"
>

            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`Image ${i + 1}`}
                    width={500}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
