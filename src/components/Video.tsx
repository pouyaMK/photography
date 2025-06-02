'use client'
import React from "react";

type ResponsiveVideoProps = {
  src: string;
  type?: string;
  poster?: string;
};

const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({
  src,
  type = "video/mp4",
  poster,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] md:w-[80%] aspect-video relative">
        <video
          className="w-full h-full object-cover rounded-xl sm:rounded-4xl shadow-lg"
          controls
          preload="metadata"
          poster={poster}
        >
          <source src={src} type={type} />
          مرورگر شما از ویدیو پشتیبانی نمی‌کند.
        </video>
      </div>
    </div>
  );
};

export default ResponsiveVideo;
