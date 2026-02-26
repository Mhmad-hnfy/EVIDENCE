"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        setDoctors(data);
      } else {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  if (doctors.length === 0) return null;

  return (
    <div
      className="py-24 bg-white overflow-hidden relative"
      id="book"
      dir="rtl"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
    
        * {
            font-family: 'Cairo', sans-serif;
        }
      `}</style>

      <div className="text-center px-4 mb-20 relative z-10">
        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
          خبرائنا
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          تعرف على أطبائنا
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-24">
        {doctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            {/* Image Side */}
            <div className="relative w-full lg:w-5/12 flex justify-center">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-[100px] opacity-60 -z-10 transform scale-110"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
                <img
                  className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                  src={
                    doctor.image ||
                    "https://placehold.co/600x800/e2e8f0/1e293b?text=Image"
                  }
                  alt={doctor.name}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-900/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-200 mt-1">EVIDENCE عيادة</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-bold text-xl mt-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                {doctor.title}
              </p>

              <div className="mt-6 space-y-5 text-gray-600 text-lg leading-relaxed border-r-4 border-blue-600 pr-4 bg-gray-50/50 p-4 rounded-l-xl">
                <p>{doctor.description1}</p>
                {doctor.description2 && <p>{doctor.description2}</p>}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${doctor.whatsapp ? doctor.whatsapp.replace(/[^0-9]/g, "") : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 text-lg w-full sm:w-auto text-center flex justify-center items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  احجز موعدك الآن
                </a>
                <a
                  href={`https://wa.me/${doctor.whatsapp ? doctor.whatsapp.replace(/[^0-9]/g, "") : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-green-100 transition-all duration-300 text-lg w-full sm:w-auto text-center flex justify-center items-center gap-2 ring-1 ring-green-600/20"
                >
                  تواصل عبر الواتساب
                </a>
              </div>

              {(doctor.facebook || doctor.instagram) && (
                <div className="mt-6 flex gap-4">
                  {doctor.facebook && (
                    <a
                      href={doctor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                      aria-label="فيسبوك"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  )}
                  {doctor.instagram && (
                    <a
                      href={doctor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm"
                      aria-label="انستجرام"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                  <div className="text-3xl font-black text-blue-600">
                    +{doctor.experience}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">
                    سنوات خبرة
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                  <div className="text-3xl font-black text-blue-600">+5000</div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">
                    ابتسامة سعيدة
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                  <div className="text-3xl font-black text-blue-600">
                    ★ 4.9/5
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">
                    تقييم العملاء
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
