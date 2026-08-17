"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function VideoPlayer() {
  const thumbRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleOpen = () => {
    setOverlayOpen(true);
  };

  const handleClose = () => {
    overlayRef.current?.pause();
    setOverlayOpen(false);
  };

  return (
    <>
      {/* 1:1 Thumbnail */}
      <button
        onClick={handleOpen}
        className="relative w-full aspect-square bg-brand-black rounded-lg overflow-hidden group cursor-pointer"
        aria-label="Play video"
      >
        <video
          ref={thumbRef}
          src="/reel.mp4"
          poster="/video-cover.webp"
          preload="none"
          className="w-full h-full object-cover"
          muted
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-red/90 flex items-center justify-center shadow-lg animate-pulse-glow">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
        </div>
        </button>
      {overlayOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          >
            <div
              className="relative w-[90vw] max-w-[350px] md:max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={overlayRef}
                src="/reel.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
