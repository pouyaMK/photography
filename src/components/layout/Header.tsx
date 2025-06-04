'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ButtonLink from "../common/buttonLink";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteTokenCookie } from "@/actions/actions";
import IMG from "../../../public/camera.png"
import toast from "react-hot-toast";
import { useUser } from "@/contexts/userContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // const cleanPathname = pathname.slice(1).trim();
  const router = useRouter();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showMobileCategoryMenu, setShowMobileCategoryMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser()


  const checkAuthStatus = () => {
    const tokenFromCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const tokenFromLocalStorage = localStorage.getItem('token');

    const loggedIn = !!(tokenFromCookie || tokenFromLocalStorage);
    setIsLoggedIn(loggedIn);
    return loggedIn;
  };

  useEffect(() => {
    checkAuthStatus();

    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('authStatusChanged', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStatusChanged', handleAuthChange);
    };
  }, []);

  
  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);



  const handleLogout = async () => {
    try {
      await deleteTokenCookie();
      localStorage.removeItem('token');
      setIsLoggedIn(false);

      window.dispatchEvent(new Event('authStatusChanged'))
      router.push('/');
      router.refresh(); 

      toast.success('خروج با موفقیت انجام شد');
    } catch (error) {
      console.error('خطا در خروج:', error);
      toast.error('خطا در خروج از حساب کاربری');
    }
  };

  // const smoothScrollTo = (target: HTMLElement) => {
  //   const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  //   const startPosition = window.scrollY;
  //   const distance = targetPosition - startPosition;
  //   const duration = 800;
  //   let startTime: number | null = null;

  //   const animation = (currentTime: number) => {
  //     if (!startTime) startTime = currentTime;
  //     const timeElapsed = currentTime - startTime;
  //     const progress = Math.min(timeElapsed / duration, 1);

  //     const easeInOutQuad = (t: number) =>
  //       t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  //     window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

  //     if (timeElapsed < duration) {
  //       requestAnimationFrame(animation);
  //     }
  //   };

  //   requestAnimationFrame(animation);
  // };

  // const handleNavigation = (item: { label: string; href: string }) => {
  //   router.push(item.href);
  // };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const [navItems] = useState([
    { label: "خانه", href: "/" },
    { label: "ارتباط با ما", href: "/contactUs" },
    { label: "رزرو", href: "/reservation" },
    { label: "دسته بندی", href: "/category" },
  ]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <section className="w-full mx-auto flex items-center justify-center center">
      <nav
        className="
          fixed top-6 w-[90%] md:w-auto mx-auto
          flex items-center justify-between md:justify-center
          pl-4 pr-4 py-1 md:py-2
          backdrop
          bg-white/70 backdrop-blur-md shadow-[0px_0px_30px_0px_#bee3f8]
          rounded-full border border-white/40 z-40
        "
      >
        <div
          className="md:hidden flex"
          onClick={() => setIsOpen(!isOpen)}
          id="hamberger-menu"
        >
          <Icon
            icon={isOpen ? "eva:close-outline" : "eva:menu-2-outline"}
            className="text-[#7AC4E3] text-3xl"
          />
        </div>

        <Link href={"/"} className="flex items-center space-x-2">
          <Image src={IMG} alt="Logo" className="md:h-10 md:w-10 h-8 w-8" />
        </Link>

        <ul className="hidden md:flex space-x-6 mx-10 relative">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => {
                if (item.label === "دسته بندی") setShowCategoryMenu(true);
              }}
              onMouseLeave={() => {
                if (item.label === "دسته بندی") setShowCategoryMenu(false);
              }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 text-gray-900 font-medium transition hover:text-[#29A6DB] ${(item.href === "/" && pathname === "/") ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                  ? "!text-[#29A6DB]"
                  : ""
                  }`}
              >
                {item.label}
                {item.label === "دسته بندی" && (
                  <motion.span
                    animate={{ rotate: showCategoryMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    <Icon icon="mingcute:down-line" className="w-4 h-4 text-gray-500" />
                  </motion.span>
                )}
              </Link>

              {/* Desktop Dropdown modal */}
              {item.label === "دسته بندی" && showCategoryMenu && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-5 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-xl shadow-lg py-2 px-3 w-32 space-y-2 z-50"
                >
                  <li>
                    <Link
                      href="/category?category=portrait"
                      className="block text-xs sm:text-sm text-gray-700 hover:text-[#29A6DB] transition border-b border-slate-200 pb-1"
                    >
                      پرتره
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category?category=product-photography"
                      className="block text-xs sm:text-sm text-gray-700 hover:text-[#29A6DB] transition border-b border-slate-200 pb-1"
                    >
                      محصولات
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category?category=food-and-drinks"
                      className="block text-xs sm:text-sm text-gray-700 hover:text-[#29A6DB] transition"
                    >
                      غذا و نوشیدنی
                    </Link>
                  </li>
                </motion.ul>
              )}
            </li>
          ))}
        </ul>

     
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="flex justify-between items-center bg-gradient-to-r from-[#A9D0FF] to-[#28A6DB] text-white pr-4 py-1 rounded-full">
                <span className="text-sm">
                  {user?.name || 'کاربر'}
                </span>
                <div className="p-2 bg-white mx-1 rounded-full">
                  <Icon
                    icon="mingcute:user-3-line"
                    className="h-4 w-4 text-[#28A6DB]"
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex cursor-pointer justify-between items-center bg-gradient-to-r from-red-500 to-red-600 text-white pr-4 py-1 rounded-full hover:opacity-90 transition-all"
              >
                خروج
                <div className="p-2 bg-white mx-1 rounded-full">
                  <Icon
                    icon="mingcute:exit-line"
                    className="h-4 w-4 text-red-500"
                  />
                </div>
              </button>
            </>
          ) : (
            <ButtonLink text="ورود / ثبت نام" href="/login" />
          )}
        </div>

      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed md:hidden top-0 left-0 min-h-screen w-full bg-white shadow-lg z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-900 hover:text-red-600 transition"
            >
              <Icon icon="eva:close-outline" className="text-3xl" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center flex-col space-y-4"
            >
              <ul className="space-y-6 text-center mx-10">
                {navItems.map((item, index) => (
                  <li key={index} className="relative">
                    {item.label !== "دسته بندی" ? (
                      <Link
                        href={item.href}
                        className={`text-gray-900 font-medium transition hover:text-[#29A6DB] ${pathname === item.href || pathname.includes(item.href) ? "!text-[#29A6DB]" : ""
                          }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => setShowMobileCategoryMenu(!showMobileCategoryMenu)}
                          className={`flex items-center gap-1 text-gray-900 font-medium transition hover:text-[#29A6DB] ${(item.href === "/" && pathname === "/") ||
                            (item.href !== "/" && pathname.startsWith(item.href))
                            ? "!text-[#29A6DB]"
                            : ""
                            }`}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: showMobileCategoryMenu ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                          >
                            <Icon icon="mingcute:down-line" className="w-4 h-4 text-gray-500" />
                          </motion.span>
                        </button>

                        {/* Mobile Category Submenu */}
                        <AnimatePresence>
                          {showMobileCategoryMenu && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 space-y-2 overflow-hidden"
                            >
                              <li>
                                <Link
                                  href="/category?category=portrait"
                                  className="block text-sm text-gray-700 hover:text-[#29A6DB] transition py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  پرتره
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/category?category=product"
                                  className="block text-sm text-gray-700 hover:text-[#29A6DB] transition py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  محصولات
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/category?category=food"
                                  className="block text-sm text-gray-700 hover:text-[#29A6DB] transition py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  غذا و نوشیدنی
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {isLoggedIn ? (
                <>
                  <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white pr-4 py-1 rounded-full">
                    <span className="text-sm">
                      {user?.name || 'کاربر'}
                    </span>
                    <div className="p-2 bg-white mx-1 rounded-full">
                      <Icon
                        icon="mingcute:user-3-line"
                        className="h-4 w-4 text-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex justify-between items-center bg-gradient-to-r from-red-500 to-red-600 text-white pr-4 py-1 rounded-full hover:opacity-90 transition-all"
                  >
                    خروج
                    <div className="p-2 bg-white mx-1 rounded-full">
                      <Icon
                        icon="mingcute:exit-line"
                        className="h-4 w-4 text-red-500"
                      />
                    </div>
                  </button>
                </>
              ) : (

                <Link
                  href="/login"
                  className="flex justify-between items-center bg-gradient-to-r from-[#28A6DB] to-[#A9D0FF] text-white pr-4 py-1 rounded-full hover:opacity-90 transition-all mt-6"
                >
                  ثبت نام / لاگین
                  <div className="p-2 bg-white mx-1 rounded-full">
                    <Icon
                      icon="mingcute:arrow-up-line"
                      className="h-4 w-4 rotate-270 text-[#28A6DB]"
                    />
                  </div>
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Navbar;
