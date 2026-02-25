export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 space-x-reverse md:order-2">
          {/* Add social links here if any */}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} عيادة EVIDENCE لطب الأسنان. جميع
            الحقوق محفوظة.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="text-center text-sm leading-5 text-gray-400">
              Cody By Eng.Mohamed Hanafy
            </p>
            <a
              href="https://wa.me/201280062903"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition"
              aria-label="تواصل عبر الواتساب"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
