// components/PhotoTestimonialSlider.tsx
'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    name: 'علی رضایی',
    title: 'عکاس پرتره',
    image: '/img/portraite/IMG_3775.jpg',
    testimonial:
      'عکاسی برای من فقط یک هنر نیست، بلکه راهی برای ثبت احساسات انسانی است. هر عکس داستانی دارد که منتظر شنیده شدن است.',
  },
  {
    name: 'مهدیه کریمی',
    title: 'عکاس طبیعت',
    image: '/img/portraite/IMG_5783_20241119165529.PNG',
    testimonial:
      'در دل طبیعت، آرامشی پیدا می‌کنم که در هیچ جای دیگر نیست. دوربینم دوست وفادار من برای ثبت این لحظات ناب است.',
  },
  {
    name: 'محمد تیموری',
    title: 'عکاس خیابانی',
    image: '/img/portraite/_MG_9642 copy.jpg',
    testimonial:
      'خیابان‌ها پر از اتفاقات لحظه‌ای‌اند. هدفم ثبت لحظاتی‌ست که شاید هیچ‌گاه تکرار نشوند.',
  },
  {
    name: 'سارا نیک‌فر',
    title: 'عکاس فشن',
    image: '/img/portraite/IMG_5821_20241119170044.JPG',
    testimonial:
      'فشن برای من یعنی جسارت در بیان. از طریق لنز دوربینم زیبایی و خلاقیت را به تصویر می‌کشم.',
  },
];

export default function PhotoTestimonialSlider() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div dir="rtl" className="flex bg-gray-100 flex-col md:flex-row items-center justify-center w-full mx-auto py-12 px-4 gap-8 ">
      <section className=' w-[90%]  md:w-[80%] mx-auto flex flex-col md:flex-row md:items-center items-start gap-10 '>
        {/* تصویر */}
      <div className="flex flex-col items-start font-semibold space-y-4">
        <p className="text-2xl text-gray-900">صدای تجربه‌ی عکاسان ما را بشنوید</p>
        <div className="relative sm:w-72 w-56 h-56 sm:h-72 rounded-xl overflow-hidden shadow-lgbjk">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[index].image}
                alt={slides[index].name}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* دکمه‌های اسلایدر */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="w-8 h-8 cursor-pointer rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#DFF2FA] transition"
          >
            <Icon icon="iconamoon:arrow-up-2-light" className=' rotate-90' />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 cursor-pointer rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#DFF2FA] transition"
          >
              <Icon icon="iconamoon:arrow-up-2-light" className=' -rotate-90' />
          </button>
        </div>
      </div>

      {/* متن و مشخصات */}
      <div className="max-w-xl text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm sm:text-lg md:text-xl  text-gray-600 leading-relaxed">
              “{slides[index].testimonial}”
            </p>
            <div className="mt-4">
              <p className="font-bold">{slides[index].name}</p>
              <p className="text-sm text-gray-500">{slides[index].title}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </section>
    </div>
  );
}
