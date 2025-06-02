import localFont from 'next/font/local';
import { Open_Sans } from "next/font/google";

export const yekanBakh = localFont({
  src: [
    {
      path: '../../fonts/YekanBakh-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../fonts/YekanBakh-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/YekanBakh-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-yekan-bakh',
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});