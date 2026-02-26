"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

function Imgs() {
  const defaultImages = [
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598256989417-6dbfff3a4441?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572983177812-32a2f961e6f4?q=80&w=800&auto=format&fit=crop",
  ];

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        setImages(data.map((img) => img.image_url));
      } else {
        setImages(defaultImages);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (isHovered || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  return (
    <div
      className="flex flex-col items-center py-24 bg-gray-50"
      id="results"
      dir="rtl"
    >
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-sm">
          نتائجنا تـتـحـدث عنـا
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
          شاهد بعض الحالات التي قمنا بعلاجها في عيادة EVIDENCE وكيف أعدنا لهم
          الابتسامة المشرقة.
        </p>
      </div>

      <div
        className="w-full max-w-5xl overflow-hidden relative rounded-3xl shadow-2xl px-4 md:px-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={
                img || "https://placehold.co/800x600/e2e8f0/1e293b?text=Image"
              }
              className="w-full h-[300px] md:h-[600px] object-cover flex-shrink-0"
              alt={`نتيجة ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1,
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <div
        className="flex items-center mt-8 space-x-3 space-x-reverse"
        id="dot-indicators"
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? "w-8 h-3 bg-blue-600"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`الذهاب إلى الصورة ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Imgs;
