

import Portfolio from "@/components/Portfolio"
import Video from "@/components/Video"
export default function Home() {
  return (
    <div>

      <Portfolio />
      <main className="pb-24 flex items-center justify-center bg-gray-100 p-4">
      <Video
        src="/video/intro.mp4"
        // poster="/images/video-poster.jpg" 
      />
    </main>
    </div>
 
  );
}
