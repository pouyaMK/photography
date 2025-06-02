

'use client';
import Image from 'next/image';
import ButtonLink from "@/components/common/buttonLink";

export default function PortfolioIntro() {
  return (
    <div className="bg-gray-100 w-full h-auto">
      <section className="w-[90%]  mx-auto px-4 md:w-[80%] py-28 flex flex-col md:flex-row md:items-start items-center gap-12 md:gap-24">
        
        <div className="w-full md:w-1/2 text-right">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            مریم میرمحمد
          </h2>
          <p className="text-gray-600  text-xs sm:text-sm md:text-lg text-justify leading-5 sm:leading-7 mb-6">
          من مریم هستم، عکاس برند "لایتسو". 
دنیای عکاسی همیشه برای من یک دنیای بی‌پایان از زیبایی و جزئیات بوده. من در ابتدا در دنیای معماری آموزش دیدم و سال‌ها در این حوزه کار کردم، اما همیشه در جستجوی راهی بودم تا هنر و خلاقیت رو در قالب تصاویر به نمایش بذارم. به همین دلیل تصمیم گرفتم که وارد دنیای عکاسی بشم. 
تخصص من در عکاسی صنعتی، پرتره و عکاسی از فضاهای تجاری است. برای من هر پروژه فرصتی است تا با دقت به جزئیات، عکسی خلق کنم که فراتر از یک تصویر ساده باشد. از عکاسی از رستوران‌ها و کافه‌ها گرفته تا عکاسی محصولات، فرش، و حتی پرتره‌های خاص، هدف من این است که هر تصویر، نه فقط یک اثر بصری، بلکه تجربه‌ای منحصر به فرد برای شما باشد. 
عکاسی برای من تنها ثبت لحظات نیست، بلکه تبدیل به یک زبان هنری می‌شود که می‌تواند احساسات، شخصیت‌ها و برندها را با دقت و خلاقیت به تصویر بکشد. 
اگر به دنبال تصاویری با کیفیت و خلاقانه برای برند خود یا پروژه‌های شخصی هستید، خوشحال می‌شم که با هم همکاری کنیم. از طریق فرم تماس در سایت می‌تونید با من ارتباط برقرار کنید.
          </p>
          <div className="flex flex-col w-fit sm:flex-row gap-4">
            <ButtonLink text="ارتباط با عکاس" href="/contactUs" />
            <button className="border border-[#29A6DB] text-[#29A6DB] px-6 py-2 rounded-full cursor-pointer hover:bg-[#f0faff] transition">
              رزرو وقت
            </button>
          </div>
        </div>

        {/* تصویر سمت چپ */}
        <div className="relative w-full md:w-1/2 aspect-[4/5] bg-black rounded-xl sm:rounded-4xl md:overflow-visible overflow-hidden">
          <Image
            src="/img/maryam.jpg"
            alt="عکس پرتره"
            fill
            className="object-contain rounded-xl sm:rounded-4xl"
          />

          <div className="absolute hidden sm:flex top-28 md:text-2xl -left-16 z-50 backdrop-blur-md bg-white/30 text-black text-xs font-medium px-6 py-2 rounded-full shadow">
            عکاس محصولات
          </div>

        
          <div className="absolute hidden sm:flex md:text-2xl top-1/2 -right-16 -translate-y-1/2 z-50 backdrop-blur-md bg-white/30 text-black text-xs font-medium px-6 py-2 rounded-full shadow">
            عکاس پرتره
          </div>
        </div>
      </section>
    </div>
  );
}
