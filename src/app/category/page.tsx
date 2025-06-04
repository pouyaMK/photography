

// "use client";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// import { Suspense } from "react";
// import { fetchFolderTree } from "../../components/utils/api";

// type FileNode = {
//   type: "file";
//   name: string;
//   url: string;
//   name_fa : string ;
// };

// type FolderNode = {
//   type: "folder";
//   name: string;
//   name_fa : string;
//   path: string;
//   children: (FolderNode | FileNode)[];
//   icon : string
// };

// function ImageWithLoader({ src, alt }: { src: string; alt: string }) {
//   const [isLoaded, setIsLoaded] = useState(false);

//   return (
//     <div className="relative  w-full mb-4 break-inside-avoid">
//       {!isLoaded && (
//         <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
//       )}
//       <Image
//         src={src}
//         alt={alt}
//         width={600}
//         height={800}
//         onLoad={() => setIsLoaded(true)}
//         className={`rounded-2xl shadow-[0px_0px_30px_10px_#f7fafc] w-full h-auto inline-block transition-opacity duration-500 ${
//           isLoaded ? "opacity-100" : "opacity-0"
//         }`}
//         unoptimized={true}
//       />
//     </div>
//   );
// }


// function CategorySection() {
//   const [data, setData] = useState<FolderNode[]>([]);
//   const [activeSubSubCategory, setActiveSubSubCategory] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
//     null,
//   );
//   const searchParams = useSearchParams();
// const categoryFromQuery = searchParams.get("category");


//   useEffect(() => {
//     fetchFolderTree().then((res) => {
//       setData(res.data);
//       setIsLoading(false);
  
//       const defaultCategory = categoryFromQuery || res.data[0]?.name;
//       setActiveCategory(defaultCategory);
  
//       const foundCategory = res.data.find((c: FolderNode) => c.name === defaultCategory);
//       const firstSub = foundCategory?.children?.find(
//         (ch: FolderNode | FileNode): ch is FolderNode => ch.type === "folder"
//       );
  
//       if (firstSub) {
//         setActiveSubCategory(firstSub.name);
  
//         const firstSubSub = firstSub.children?.find(
//           (ch: FolderNode | FileNode): ch is FolderNode => ch.type === "folder"
//         );
  
//         if (firstSubSub) {
//           setActiveSubSubCategory(firstSubSub.name);
//         }
//       }
//     });
//   }, [categoryFromQuery]);
  
  

//   const getSubCategories = () => {
//     const cat = data.find((c) => c.name === activeCategory);
//     return (
//       (cat?.children?.filter((ch) => ch.type === "folder") as FolderNode[]) ||
//       []
//     );
//   };

//   const getSubSubCategories = () => {
//     const sub = getSubCategories().find((sc) => sc.name === activeSubCategory);
//     return (
//       (sub?.children?.filter((ch) => ch.type === "folder") as FolderNode[]) || []
//     );
//   };
  

  
//   const getImages = () => {
//     if (activeSubSubCategory) {
//       const sub = getSubCategories().find((sc) => sc.name === activeSubCategory);
//       const subSub = (sub?.children as FolderNode[]).find(
//         (ssc) => ssc.name === activeSubSubCategory
//       );
//       return (
//         (subSub?.children?.filter((ch) => ch.type === "file") as FileNode[]) || []
//       );
//     }
  
//     if (activeSubCategory) {
//       const sub = getSubCategories().find((sc) => sc.name === activeSubCategory);
//       return (
//         (sub?.children?.filter((ch) => ch.type === "file") as FileNode[]) || []
//       );
//     }
  
//     const cat = data.find((c) => c.name === activeCategory);
//     return (
//       (cat?.children?.filter((ch) => ch.type === "file") as FileNode[]) || []
//     );
//   };
  
  

//   return (
//     <section className="px-4 py-32">
//       <div className="w-full overflow-x-auto">
//         <div className="flex justify-center text-center items-center gap-3 sm:px-4 py-1 min-w-max w-full mx-auto">
//           {isLoading
//             ? Array.from({ length: 4 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"
//                 />
//               ))
//             : data.map((category) => (
//                 <button
//                   key={category.name}
//                   className={`flex cursor-pointer justify-center items-center gap-2 px-4 py-2 rounded-full sm:min-w-48 text-xs sm:text-sm whitespace-nowrap ${
//                     activeCategory === category.name
//                       ? "border border-[#28A6DB] bg-[#DFF2FA] text-[#28A6DB]"
//                       : "border bg-gray-100 border-slate-300 text-black"
//                   }`}
//                   onClick={() => {
//                     setActiveCategory(category.name);
                  
//                     const subCategories = category.children?.filter(
//                       (ch) => ch.type === "folder"
//                     ) as FolderNode[];
                  
//                     if (subCategories?.length > 0) {
//                       const firstSub = subCategories[0];
//                       setActiveSubCategory(firstSub.name);
                  
//                       const subSubCategories = firstSub.children?.filter(
//                         (ch) => ch.type === "folder"
//                       ) as FolderNode[];
                  
//                       if (subSubCategories?.length > 0) {
//                         setActiveSubSubCategory(subSubCategories[0].name);
//                       } else {
//                         setActiveSubSubCategory(null);
//                       }
//                     } else {
//                       setActiveSubCategory(null);
//                       setActiveSubSubCategory(null);
//                     }
//                   }}
                  
//                 >
//                   {category.icon && (
//                     <Icon
//                       icon={category.icon}
//                       className="w-5 h-5 object-contain"
//                     />
//                   )}
//                   {/* {category.name} */}
//                   {category.name_fa}
//                 </button>
//               ))}
//         </div>
//       </div>

//       {activeCategory && (
//         <div className="w-full overflow-x-auto">
//           <div className="flex items-center justify-center flex-nowrap gap-3  px-4 py-1 min-w-max">
//             {isLoading
//               ? Array.from({ length: 3 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-16 h-6 bg-gray-300 rounded animate-pulse"
//                   />
//                 ))
//               : getSubCategories().map((sub) => (
//                   <button
//                     key={sub.name}
//                     className={`px-4 py-1.5 rounded-full whitespace-nowrap min-w-16 sm:min-w-28 cursor-pointer text-xs sm:text-sm border transition ${
//                       activeSubCategory === sub.name
//                         ? "bg-[#28A6DB] text-white border-[#28A6DB]"
//                         : "border border-slate-300 text-black"
//                     }`}
//                     onClick={() => {
//                       setActiveSubCategory(sub.name);
//                       setActiveSubSubCategory(null);
//                     }}
//                   >
//                     {/* {sub.name} */}
//                     {sub.name_fa}
//                   </button>
//                 ))}
//           </div>
//         </div>
//       )}
//       {activeSubCategory && getSubSubCategories().length > 0 && (
//         <div className="w-full overflow-x-auto mt-2">
//           <div className="flex items-center justify-center flex-nowrap gap-3 px-4 py-1 min-w-max">
//             {getSubSubCategories().map((subSub) => (
//               <button
//                 key={subSub.name}
//                 className={`px-4 cursor-pointer py-1.5 rounded-full whitespace-nowrap min-w-28 text-xs sm:text-sm border transition ${
//                   activeSubSubCategory === subSub.name
//                     ? "bg-[#28A6DB] text-white border-[#28A6DB]"
//                     : "border border-slate-300 text-black bg-gray-50"
//                 }`}
//                 onClick={() => setActiveSubSubCategory(subSub.name)}
//               >
//                 {subSub.name_fa}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="columns-1 mt-4 md:columns-2 w-[98%] md:w-[80%] mx-auto gap-4 space-y-4">
//         {isLoading
//           ? Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"
//               />
//             ))
//           : getImages().map((file) => (
//               <ImageWithLoader key={file.url} src={file.url} alt={file.name} />
//             ))}
//       </div>
//     </section>
//   );
// }

// export default CategorySection;





// app/category/page.tsx
import { Suspense } from "react";
import CategoryContent from "./CategoryContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-8">در حال بارگذاری...</div>}>
      <CategoryContent />
    </Suspense>
  );
}






