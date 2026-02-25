"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "الرئيسية", href: "#" },
  { name: "خدماتنا", href: "#services" },
  { name: "نتائجنا", href: "#results" },
  { name: "أطبائنا", href: "#book" },
];

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900" dir="rtl">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <span className="sr-only">EVIDENCE Clinic</span>
                <Image
                  src="/logo.png"
                  alt="EVIDENCE Clinic Logo"
                  width={120}
                  height={40}
                  className="h-20 w-auto object-contain"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">فتح القائمة الرئيسية</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-semibold text-white hover:text-blue-400 transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href="#book"
                className="text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-full hover:bg-blue-500 transition"
              >
                احجز الآن
              </a>
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel
              dir="rtl"
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10"
            >
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <span className="sr-only">EVIDENCE Clinic</span>
                  <Image
                    src="/logo.png"
                    alt="EVIDENCE Clinic Logo"
                    width={100}
                    height={32}
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-200"
                >
                  <span className="sr-only">إغلاق القائمة</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#book"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-blue-600 text-center hover:bg-blue-500 transition mt-4"
                    >
                      احجز الآن
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#2dd4bf] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20 transition cursor-pointer bg-white/5 backdrop-blur-sm">
                افضل عيادة اسنان بشهادة عملائنا.{" "}
                <a href="#results" className="font-semibold text-blue-400">
                  <span aria-hidden="true" className="absolute inset-0" />
                  شاهد النتائج <span aria-hidden="true">&larr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl drop-shadow-lg">
                عيادة <span className="text-blue-500">EVIDENCE</span> لطب
                الأسنان
              </h1>
              <p className="mt-8 text-pretty text-lg sm:text-xl font-medium text-gray-300 leading-relaxed">
                ابتسامتك تستحق الأفضل. نقدم لك رعاية متكاملة لأسنانك بأحدث
                التقنيات الطبية وعلى يد نخبة من الخبراء لضمان صحة وجمال أسنانك.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#book"
                  className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-blue-500 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  احجز موعدك الآن
                </a>
                <a
                  href="#results"
                  className="text-base font-semibold text-white group flex items-center gap-2"
                >
                  تعرف على خدماتنا
                  <span
                    aria-hidden="true"
                    className="group-hover:-translate-x-1 transition-transform"
                  >
                    &larr;
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3b82f6] to-[#2dd4bf] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
