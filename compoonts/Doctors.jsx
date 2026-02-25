"use client";
import React, { useEffect, useState } from "react";

const initialDoctors = [
  {
    id: 1,
    name: "د. أحمد محمد",
    title: "استشاري جراحة وتجميل الأسنان",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    experience: "15",
    whatsapp: "201000000000",
    description1:
      "دكتور أحمد يمتلك خبرة واسعة تمتد لأكثر من 15 عاماً في مجال طب وجراحة الأسنان. تخرج من أعرق الجامعات ويحمل شهادات عليا في تجميل وزراعة الأسنان.",
    description2:
      "يهدف دائماً إلى توفير بيئة علاجية مريحة وخالية من الألم، مع استخدام أحدث التقنيات الطبية لضمان أفضل النتائج للمرضى في عيادة EVIDENCE.",
  },
];

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const storedDoctors = localStorage.getItem("evidence_doctors");
    if (storedDoctors) {
      try {
        setDoctors(JSON.parse(storedDoctors));
      } catch (e) {
        setDoctors(initialDoctors);
      }
    } else {
      setDoctors(initialDoctors);
      localStorage.setItem("evidence_doctors", JSON.stringify(initialDoctors));
    }
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
                  src={doctor.image}
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
