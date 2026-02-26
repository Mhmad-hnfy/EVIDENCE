"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const initialServices = [
  
  {
    id: 2,
    title: "تبييض الأسنان",
    description:
      "احصل على ابتسامة ناصعة البياض في جلسة واحدة فقط بفضل أجهزة الليزر الحديثة.",
    icon: "✨",
  },
  {
    id: 3,
    title: "تقويم الأسنان",
    description:
      "خيارات متعددة لتقويم الأسنان بما فيها التقويم الشفاف للحصول على أسنان متراصة.",
    icon: "😁",
  },
  {
    id: 4,
    title: "طب أسنان الأطفال",
    description:
      "عناية خاصة بأسنان أطفالك في بيئة مريحة وممتعة لكسر حاجز الخوف.",
    icon: "🧸",
  },
  {
    id: 5,
    title: "علاج العصب",
    description:
      "علاج جذور الأسنان بدون ألم باستخدام أدوات دقيقة للحفاظ على الأسنان الطبيعية.",
    icon: "⚡",
  },
  {
    id: 6,
    title: "ابتسامة هوليوود",
    description:
      "تصميم ابتسامة متكاملة تناسب ملامح وجهك باستخدام قشور الفينير أو اللومينير.",
    icon: "🌟",
  },
];

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        setServices(data);
      } else {
        setServices(initialServices);
      }
    };

    fetchServices();
  }, []);

  return (
    <div
      className="py-24 bg-gray-50 relative overflow-hidden"
      id="services"
      dir="rtl"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-100 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-100 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            رعايتنا الفائقة
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            خدماتنا المتميزة
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            نقدم مجموعة متكاملة من خدمات طب الفم والأسنان بأعلى معايير الجودة
            والتعقيم لضمان راحتك وصحتك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>

              

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              <a
                href="#book"
                className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:text-blue-700 transition-colors"
              >
                احجز الخدمة
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
