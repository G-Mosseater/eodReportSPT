"use client";
import { useRef, useEffect } from "react";

export default function WhaleAnimation() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  return (
    <div className="w-full items-center justify-center pointer-events-none -z-10">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-auto max-w-full object-contain"
      >
        <source src="/mobyLogo.webm" type="video/webm" />
      </video>
    </div>
  );
}
