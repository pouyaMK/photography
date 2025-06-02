
'use client';
import { Icon } from "@iconify/react";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface DownloadButtonProps {
  text: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
}

const DownloadButton = ({
  text,
  href,
  type = "button",
  onClick,
  disabled = false,
}: DownloadButtonProps) => {
  const baseStyle = `group relative flex justify-between items-center overflow-hidden 
    bg-gradient-to-r from-[#29A6DB] to-[#7AC4E3] text-white pr-4 py-1 rounded-full 
    hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed`;

  const innerContent = (
    <>
      <span className="relative ml-2.5 z-10 transition-colors duration-300 group-hover:text-[#29A6DB]">
        {text}
      </span>
      <div className="relative z-20 p-2 bg-white mx-1 rounded-full transition-all duration-300">
        <Icon
          icon="mingcute:arrow-up-line"
          className="h-4 w-4 rotate-270 transition-all duration-300 group-hover:text-white !text-[#29A6DB]"
        />
      </div>
      <div className="absolute inset-0 !left-[11px] bg-white scale-x-0 m-1 ml-2 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-r-full"></div>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseStyle}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyle}
    >
      {innerContent}
    </button>
  );
};

export default DownloadButton;
