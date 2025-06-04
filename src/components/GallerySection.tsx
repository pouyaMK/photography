'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

type Category = 'portrait' | 'product' | 'food';
type SubcategoryChild = {
  key: string;
  label: string;
  images: string[];
};
type Subcategory = {
  key: string;
  label: string;
  images?: string[];
  children?: SubcategoryChild[];
};
type CategoryData = {
  key: Category;
  label: string;
  image: string;
  icon: string;
  subcategories: Subcategory[];
};

const galleryData: CategoryData[] = [
  {
    key: "portrait",
    icon: "solar:camera-linear",
    label: "عکاسی پرتره",
    image: "/img/portraite/IMG_5779_20241119165434.PNG",
    subcategories: [
      {
        key: "general",
        label: "پرتره عمومی",
        images: [
          "/img/portraite/7048.jpg",
          "/img/portraite/_MG_1362 copy.jpg",
          "/img/portraite/_MG_1379 copy 2.jpg",
          "/img/portraite/_MG_2671 copy.jpg",
          "/img/portraite/_MG_2784 copy.jpg",
          "/img/portraite/_MG_27941 copy.jpg",
          "/img/portraite/_MG_9227 copy.jpg",
          "/img/portraite/_MG_9642 copy.jpg",
          "/img/portraite/_MG_9670 copy.jpg",
          "/img/portraite/IMG_3775.jpg",
          "/img/portraite/IMG_3795 copy.jpg",
          "/img/portraite/IMG_5779_20241119165434.PNG",
          "/img/portraite/IMG_5783_20241119165529.PNG",
          "/img/portraite/IMG_5820_20241119170044.JPG",
          "/img/portraite/IMG_5821_20241119170044.JPG",
          "/img/portraite/IMG_8619 copy.jpg",
        ],
      },
    ],
  },
  {
    key: "product",
    icon: "fluent-mdl2:product",
    label: "عکاسی محصولات",
    image: "/img/product/محصول/_MG_5767 copy.jpg",
    subcategories: [
      {
        key: "leather",
        label: "چرم",
        children: [
          {
            key: "bag",
            label: "کیف",
            images: [
              "/img/product/چرم/کیف/11.jpg",
              "/img/product/چرم/کیف/12.jpg",
              "/img/product/چرم/کیف/13.jpg",
              "/img/product/چرم/کیف/14.jpg",
              "/img/product/چرم/کیف/15.jpg",
              "/img/product/چرم/کیف/16.jpg",
              "/img/product/چرم/کیف/17.jpg",
              "/img/product/چرم/کیف/18.jpg",
              "/img/product/چرم/کیف/19.jpg",
            ],
          },
          {
            key: "shoes",
            label: "کفش",
            images: [
              "/img/product/چرم/کفش/ 1.jpg",
              "/img/product/چرم/کفش/ 2.jpg",
              "/img/product/چرم/کفش/ 3.jpg",
              "/img/product/چرم/کفش/ 4.jpg",
              "/img/product/چرم/کفش/ 5.jpg",
            ],
          },
        ],
      },
      {
        key: "perfume",
        label: "عطر",
        images: [
          "/img/product/عطر/11.jpg",
          "/img/product/عطر/12.jpg",
          "/img/product/عطر/13.jpg",
          "/img/product/عطر/14.jpg",
          "/img/product/عطر/15.jpg",
        ],
      },
      {
        key: "cosmetic",
        label: "لوازم آرایشی",
        images: [
          "/img/product/لوازم آرایشی/11.jpg",
          "/img/product/لوازم آرایشی/12.jpg",
          "/img/product/لوازم آرایشی/13.jpg",
          "/img/product/لوازم آرایشی/14.jpg",
          "/img/product/لوازم آرایشی/15.jpg",
        ],
      },
      {
        key: "macro",
        label: "ماکرو",
        images: [
          "/img/product/ماکرو/IMG_0044 copy.jpg",
          "/img/product/ماکرو/IMG_0094 copy.jpg",
          "/img/product/ماکرو/IMG_0106 copy.jpg",
          "/img/product/ماکرو/IMG_0122 copy.jpg",
          "/img/product/ماکرو/IMG_0154 copy.jpg",
          "/img/product/ماکرو/IMG_0347 copy.jpg",
          "/img/product/ماکرو/IMG_9825 copy.jpg",
          "/img/product/ماکرو/IMG_9846 copy.jpg",
          "/img/product/ماکرو/IMG_9875 copy.jpg",
          "/img/product/ماکرو/IMG_9893 copy.jpg",
          "/img/product/ماکرو/IMG_9906 copy.jpg",
          "/img/product/ماکرو/IMG_9957 copy.jpg",
          "/img/product/ماکرو/IMG_9980 copy.jpg",
        ],
      },
      {
        key: "product",
        label: "محصول",
        images: [
          "/img/product/محصول/11.jpg",
          "/img/product/محصول/110.jpg",
          "/img/product/محصول/111.jpg",
          "/img/product/محصول/12.jpg",
          "/img/product/محصول/13.jpg",
          "/img/product/محصول/14.jpg",
          "/img/product/محصول/15.jpg",
          "/img/product/محصول/16.jpg",
          "/img/product/محصول/17.jpg",
          "/img/product/محصول/18.jpg",
          "/img/product/محصول/19.jpg",
        ],
      },
    ],
  },
  {
    key: "food",
    icon: "material-symbols:fastfood-outline-rounded",
    label: "عکاسی غذا و نوشیدنی",
    image: "/img/food&drink/غذا رستورانی/IMG_0071 copy.jpg",
    subcategories: [
      {
        key: "cake",
        label: "کیک",
        images: [
          "/img/food&drink/کیک/11.jpg",
          "/img/food&drink/کیک/12.jpg",
          "/img/food&drink/کیک/13.jpg",
          "/img/food&drink/کیک/14.jpg",
          "/img/food&drink/کیک/15.jpg",
          "/img/food&drink/کیک/16.jpg",
          "/img/food&drink/کیک/17.jpg",
        ],
      },
      {
        key: "cafe",
        label: "کافه",
        images: [
          "/img/food&drink/کافه/11.jpg", 
          "/img/food&drink/کافه/110.jpg", 
          "/img/food&drink/کافه/111.jpg", 
          "/img/food&drink/کافه/112.jpg", 
          "/img/food&drink/کافه/113.jpg", 
          "/img/food&drink/کافه/114.jpg", 
          "/img/food&drink/کافه/115.jpg", 
          "/img/food&drink/کافه/116.jpg", 
          "/img/food&drink/کافه/117.jpg", 
          "/img/food&drink/کافه/118.jpg", 
          "/img/food&drink/کافه/119.jpg", 
          "/img/food&drink/کافه/12.jpg", 
          "/img/food&drink/کافه/13.jpg", 
          "/img/food&drink/کافه/14.jpg", 
          "/img/food&drink/کافه/16.jpg", 
          "/img/food&drink/کافه/15.jpg", 
          "/img/food&drink/کافه/17.jpg", 
          "/img/food&drink/کافه/18.jpg", 
          "/img/food&drink/کافه/19.jpg", 
        ],
      },
      {
        key: "restaurant",
        label: "رستوران",
        images: [
          "/img/food&drink/غذا رستورانی/11.jpg",
          "/img/food&drink/غذا رستورانی/12.JPG",
          "/img/food&drink/غذا رستورانی/13.jpg",
          "/img/food&drink/غذا رستورانی/14.jpg",
          "/img/food&drink/غذا رستورانی/15.jpg",
          "/img/food&drink/غذا رستورانی/16.jpg",
          "/img/food&drink/غذا رستورانی/17.jpg",
          "/img/food&drink/غذا رستورانی/18.jpg",
          "/img/food&drink/غذا رستورانی/19.jpg",
          "/img/food&drink/غذا رستورانی/110.jpg",
          "/img/food&drink/غذا رستورانی/111.jpg",
          "/img/food&drink/غذا رستورانی/112.jpg",
          "/img/food&drink/غذا رستورانی/113.jpg",
          "/img/food&drink/غذا رستورانی/114.jpg",
        ],
      },
      {
        key: "chocolate",
        label: "شکلات",
        images: [
          "/img/food&drink/شکلات/11.jpg",
          "/img/food&drink/شکلات/12.jpg",
          "/img/food&drink/شکلات/13.jpg",
          "/img/food&drink/شکلات/14.jpg",
          "/img/food&drink/شکلات/15.jpg",
        ],
      },
      {
        key: "breakfast",
        label: "صبحانه",
        images: [
          "/img/food&drink/صبحانه/110.jpg",
          "/img/food&drink/صبحانه/11.jpg",
          "/img/food&drink/صبحانه/12.jpg",
          "/img/food&drink/صبحانه/13.jpg",
          "/img/food&drink/صبحانه/14.jpg",
          "/img/food&drink/صبحانه/15.jpg",
          "/img/food&drink/صبحانه/16.jpg",
          "/img/food&drink/صبحانه/17.jpg",
          "/img/food&drink/صبحانه/18.jpg",
          "/img/food&drink/صبحانه/19.jpg",
        ],
      },
      {
        key: "drink",
        label: "نوشیدنی",
        images: [
          "/img/food&drink/نوشیدنی/11.jpg",
          "/img/food&drink/نوشیدنی/12.jpg",
          "/img/food&drink/نوشیدنی/13.jpg",
          "/img/food&drink/نوشیدنی/14.jpg",
          "/img/food&drink/نوشیدنی/15.jpg",
          "/img/food&drink/نوشیدنی/16.jpg",
          "/img/food&drink/نوشیدنی/17.jpg",
          "/img/food&drink/نوشیدنی/18.jpg",
          "/img/food&drink/نوشیدنی/19.jpg",
      ],
      },
    ],
  },
];


export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<Category>('product');
  const [activeSubcategory, setActiveSubcategory] = useState<string>("leather");
  const [activeChildKey, setActiveChildKey] = useState<string | null>("bag");
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // خواندن پارامتر category از URL
    const categoryParam = searchParams.get('category') as Category | null;
    
    if (categoryParam && galleryData.some(cat => cat.key === categoryParam)) {
      setActiveCategory(categoryParam);
      
      // تنظیم زیر دسته‌بندی پیش‌فرض برای دسته‌بندی انتخاب شده
      const selectedCat = galleryData.find(cat => cat.key === categoryParam);
      if (selectedCat && selectedCat.subcategories.length > 0) {
        setActiveSubcategory(selectedCat.subcategories[0].key);
        
        // اگر دسته‌بندی محصولات است و زیردسته‌بندی اول دارای children است
        if (categoryParam === 'product' && selectedCat.subcategories[0].children) {
          setActiveChildKey(selectedCat.subcategories[0].children[0].key);
        } else {
          setActiveChildKey(null);
        }
      }
    }
  }, [searchParams]);
  
  const selectedCategory = galleryData.find(c => c.key === activeCategory)!;
  const selectedSub = selectedCategory.subcategories.find(sub => sub.key === activeSubcategory);
  const imagesToShow =
    selectedSub?.children && activeChildKey
      ? selectedSub.children.find(child => child.key === activeChildKey)?.images || []
      : selectedSub?.images || [];

  return (
    <div className="w-full px-4 py-32 flex flex-col items-center space-y-8">
      <div className="flex justify-center gap-2 sm:gap-4 w-full max-w-2xl overflow-x-auto flex-nowrap px-2 scrollbar-hide">
        {galleryData.map((cat) => (
          <button
            id={cat.key}
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setActiveSubcategory(cat.subcategories[0].key);
              if (cat.key === 'product') {
                const leatherSub = cat.subcategories.find((sub) => sub.key === 'leather');
                if (leatherSub && leatherSub.children) {
                  setActiveChildKey(leatherSub.children[0].key);
                } else {
                  setActiveChildKey(null);
                }
              } else {
                setActiveChildKey(null);
              }
            }}
            className={`relative cursor-pointer shrink-0 w-fit sm:w-full sm:flex-1 sm:min-w-0 sm:px-3 py-2 transition-all duration-300 rounded-full flex items-center justify-center text-center
            ${activeCategory === cat.key ? "border-2 border-[#28A6DB] bg-[#DFF2FA]" : "border border-gray-300 bg-gray-200"}`}
          >
            <Icon icon={cat.icon} className="w-5 h-5 mx-1 hidden sm:flex" />
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap px-2">{cat.label}</span>
          </button>
        ))}
      </div>
      
      {/* Subcategory Tabs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {selectedCategory.subcategories.map((sub) => {
            const isActive = activeSubcategory === sub.key;
            return (
              <div key={sub.key} className="flex flex-col items-center ">
                <button
                  onClick={() => {
                    setActiveSubcategory(sub.key);
                    setActiveChildKey(null);
                  }}
                  className={`px-3 py-1 rounded-full cursor-pointer min-w-28 text-xs sm:text-sm border transition mb-1
                    ${isActive ? "bg-[#28A6DB] text-white border-[#28A6DB]" : "bg-white text-black border-gray-300"}`}
                >
                  {sub.label}
                </button>
                {isActive && 'children' in sub && sub.children && (
                  <div className="flex gap-2 mt-1">
                    {sub.children.map(child => (
                      <button
                        key={child.key}
                        onClick={() => setActiveChildKey(child.key)}
                        className={`px-2 py-1 rounded-full text-xs border transition
                          ${activeChildKey === child.key
                            ? "bg-[#28A6DB] text-white border-[#28A6DB]"
                            : "bg-white text-black border-gray-300"}`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      
      <div className="columns-1 md:columns-2 gap-4 w-full max-w-[90%] space-y-4">
        {imagesToShow.map((img, index) => (
          <motion.div
            key={index}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full mb-4 break-inside-avoid"
          >
            <Image
              src={img}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-auto object-contain rounded-2xl shadow-[0px_0px_30px_10px_#edf2f7]"
              width={200}
              height={300}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
